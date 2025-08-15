"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// --- Add missing SpeechRecognition typings ---
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
type SpeechRecognition = any;
type SpeechRecognitionEvent = any;

type ChatTurn = { who: "AI" | "You"; text: string };

export default function AIDirectorWidget() {
  // --- UI State ---
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [log, setLog] = useState<ChatTurn[]>([]);
  const [textInput, setTextInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [useHQVoice, setUseHQVoice] = useState(true);

  // --- 3D Refs ---
  const mountRef = useRef<HTMLDivElement | null>(null);
  const jawRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const eyelidsRef = useRef<{ upper: THREE.Mesh[]; lower: THREE.Mesh[] } | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rafRef = useRef<number | null>(null);

  // --- Lipsync (Web Audio) ---
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const themeAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- Mouth / Blink Timing ---
  const talkingRef = useRef(false);
  const talkTargetOpenRef = useRef(0);
  const currentOpenRef = useRef(0);
  const blinkTimerRef = useRef(0);
  const lastTimeRef = useRef(0);

  // --- Conversation history for LLM ---
  const historyRef = useRef<ChatTurn[]>([]);

  const pushLog = (who: "AI" | "You", text: string) =>
    setLog((prev) => [...prev.slice(-18), { who, text }]);

  // --- Speech Recognition init ---
  useEffect(() => {
    const SR: any = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const recog: SpeechRecognition = new SR();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-GB";
    recog.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      handleUserInput(transcript);
    };
    setRecognition(recog);
    return () => {
      try {
        recog.stop();
      } catch {}
    };
  }, []);

  // --- Ambient theme element ref ---
  useEffect(() => {
    const el = document.getElementById("ai-theme-audio") as HTMLAudioElement | null;
    if (el) themeAudioRef.current = el;
  }, []);

  // --- Three.js scene setup ---
  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a0f);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 3.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(440, 440);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current?.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.DirectionalLight(0xffffff, 1.0).position.set(2, 2, 3));
    scene.add(new THREE.DirectionalLight(0x99bbff, 0.8).position.set(-2, 1.5, -2));
    scene.add(new THREE.AmbientLight(0x334466, 0.6));

    // Head group
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    headGroupRef.current = headGroup;

    // Head (ellipsoid)
    const headGeo = new THREE.SphereGeometry(1, 48, 48);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xd6d9ff,
      metalness: 0.2,
      roughness: 0.35,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.scale.set(1.0, 1.15, 1.0);
    headGroup.add(head);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.08, 24, 24);
    const eyeMat = new THREE.MeshStandardMaterial({
      emissive: 0xe6ff66,
      color: 0x222222,
      emissiveIntensity: 1.2,
    });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.32, 0.18, 0.82);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.32, 0.18, 0.82);
    headGroup.add(leftEye, rightEye);

    // Eyelids
    const lidGeo = new THREE.PlaneGeometry(0.22, 0.12);
    const lidMat = new THREE.MeshStandardMaterial({ color: 0x070a0f });
    const UL = new THREE.Mesh(lidGeo, lidMat);
    UL.position.set(-0.32, 0.24, 0.79);
    const UR = new THREE.Mesh(lidGeo, lidMat);
    UR.position.set(0.32, 0.24, 0.79);
    const LL = new THREE.Mesh(lidGeo, lidMat);
    LL.position.set(-0.32, 0.12, 0.79);
    const LR = new THREE.Mesh(lidGeo, lidMat);
    LR.position.set(0.32, 0.12, 0.79);
    headGroup.add(UL, UR, LL, LR);
    eyelidsRef.current = { upper: [UL, UR], lower: [LL, LR] };

    // Jaw
    const jawGroup = new THREE.Group();
    jawGroup.position.set(0, -0.22, 0.76);
    headGroup.add(jawGroup);
    const jawGeo = new THREE.BoxGeometry(0.9, 0.4, 0.5);
    const jawMat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff });
    const jaw = new THREE.Mesh(jawGeo, jawMat);
    jaw.position.set(0, -0.2, 0);
    jawGroup.add(jaw);
    jawRef.current = jawGroup;

    headGroup.position.y = 0.1;

    const tick = (t: number) => {
      const now = t * 0.001;
      const dt = lastTimeRef.current ? now - lastTimeRef.current : 0.016;
      lastTimeRef.current = now;

      // Idle motion
      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = Math.sin(now * 0.3) * 0.15;
        headGroupRef.current.position.y = 0.1 + Math.sin(now * 0.8) * 0.03;
      }

      // Blink
      blinkTimerRef.current -= dt;
      if (blinkTimerRef.current <= 0) {
        blinkTimerRef.current = 3 + Math.random() * 3;
        triggerBlink();
      }

      // Mouth movement
      let openTarget = talkTargetOpenRef.current;
      const analyser = analyserRef.current;
      if (analyser && talkingRef.current) {
        const arr = new Uint8Array(analyser.fftSize);
        analyser.getByteFrequencyData(arr);
        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
        openTarget = Math.min(1, avg / 160);
      }
      currentOpenRef.current +=
        (openTarget - currentOpenRef.current) * Math.min(1, 8.0 * dt);
      if (jawRef.current) jawRef.current.rotation.x = -currentOpenRef.current * 0.55;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      if (renderer.domElement && mountRef.current)
        mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // --- Helpers ---
  function triggerBlink() {
    const lids = eyelidsRef.current;
    if (!lids) return;
    lids.upper.forEach((m) => (m.scale.y = 3));
    lids.lower.forEach((m) => (m.scale.y = 2));
    setTimeout(() => {
      lids.upper?.forEach((m) => (m.scale.y = 1));
      lids.lower?.forEach((m) => (m.scale.y = 1));
    }, 150);
  }

  async function speak(text: string) {
    pushLog("AI", text);
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }

  async function handleUserInput(text: string) {
    if (!text) return;
    pushLog("You", text);
    await speak("I received: " + text);
  }

  const toggleListen = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
      <div className="relative place-self-center">
        <div
          ref={mountRef}
          className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700/50"
        />
        <audio id="ai-theme-audio" src="/audio/ai-director-theme.mp3" loop preload="auto" />
        <div className="absolute top-2 right-2 text-xs opacity-30">
          Media Stream AI
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleListen}
            disabled={!recognition}
            className={`px-4 py-2 rounded-xl text-white ${
              listening ? "bg-red-600" : "bg-blue-600"
            }`}
          >
            {recognition
              ? listening
                ? "Stop Listening"
                : "Talk via Microphone"
              : "Mic not supported — use text"}
          </button>
          <span className="text-xs opacity-70">{speaking ? "Speaking…" : ""}</span>
        </div>

        <input
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUserInput(textInput)}
          placeholder="Type here if mic isn’t supported…"
          className="w-full border border-slate-700 bg-slate-900/50 rounded-xl px-3 py-2"
        />

        <div className="bg-slate-900/60 rounded-xl p-3 text-sm max-h-60 overflow-auto ring-1 ring-slate-700/50">
          {log.map((l, i) => (
            <div key={i}>
              <strong>{l.who}:</strong> {l.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
