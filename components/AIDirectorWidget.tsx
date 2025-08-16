"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Lazy-load GLTFLoader in browser only
let GLTFLoader: any = null;

type ChatTurn = { who: "AI" | "You"; text: string };

// SSR-safe speech types
type SSRSafeSpeechRecognition = any;
type SSRSafeSpeechRecognitionEvent = any;

export default function AIDirectorWidget() {
  // --- UI State ---
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<SSRSafeSpeechRecognition | null>(null);
  const [log, setLog] = useState<ChatTurn[]>([]);
  const [textInput, setTextInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [useHQVoice, setUseHQVoice] = useState(true);

  // --- 3D Refs ---
  const mountRef = useRef<HTMLDivElement | null>(null);
  const jawRef = useRef<THREE.Object3D | null>(null);
  const headGroupRef = useRef<THREE.Object3D | null>(null);
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

  // --- Conversation history ---
  const historyRef = useRef<ChatTurn[]>([]);

  const pushLog = (who: "AI" | "You", text: string) =>
    setLog((prev) => [...prev.slice(-18), { who, text }]);

  // Lazy-import GLTFLoader
  useEffect(() => {
    (async () => {
      if (typeof window === "undefined") return;
      const mod = await import("three/examples/jsm/loaders/GLTFLoader.js");
      GLTFLoader = mod.GLTFLoader;
    })();
  }, []);

  // --- Speech Recognition init ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const recog: SSRSafeSpeechRecognition = new SR();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-GB";
    recog.onresult = (event: SSRSafeSpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      handleUserInput(transcript);
    };
    setRecognition(recog);
    return () => {
      try {
        recog.stop();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Ambient theme ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("ai-theme-audio") as HTMLAudioElement | null;
    if (el) themeAudioRef.current = el;
  }, []);

  // --- Three.js Scene ---
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a0f);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 3.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Resize for mobile/desktop
    const resize = () => {
      const width = mountRef.current?.clientWidth || 440;
      const height = width;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();

    // Lights
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(2, 2, 3);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x99bbff, 0.8);
    rim.position.set(-2, 1.5, -2);
    scene.add(rim);
    const fill = new THREE.AmbientLight(0x334466, 0.6);
    scene.add(fill);

    // Head parent group
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    headGroupRef.current = headGroup;
    headGroup.position.y = 0.1;

    const addFallbackSphere = () => {
      const geo = new THREE.SphereGeometry(1, 48, 48);
      const mat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff, metalness: 0.2, roughness: 0.35 });
      const head = new THREE.Mesh(geo, mat);
      headGroup.add(head);
      return head;
    };

    (async () => {
      try {
        let tries = 0;
        while (!GLTFLoader && tries < 50) {
          await new Promise((r) => setTimeout(r, 40));
          tries++;
        }
        if (!GLTFLoader) throw new Error("GLTFLoader not ready");

        const loader = new GLTFLoader();
        loader.load(
          "/models/android_female_head.glb",
          (gltf: any) => {
            const model = gltf.scene || gltf.scenes?.[0];
            if (!model) addFallbackSphere();
            else {
              model.traverse((o: any) => {
                if (o.isMesh && o.material) {
                  o.material.metalness = 0.35;
                  o.material.roughness = 0.4;
                  o.material.color = new THREE.Color(0xd6d9ff);
                }
              });
              model.scale.set(1.15, 1.25, 1.15);
              headGroup.add(model);
            }
          },
          undefined,
          () => addFallbackSphere()
        );
      } catch {
        addFallbackSphere();
      }
    })();

    // Animate loop
    const tick = (t: number) => {
      const now = t * 0.001;
      const dt = lastTimeRef.current ? now - lastTimeRef.current : 0.016;
      lastTimeRef.current = now;

      if (headGroupRef.current) {
        headGroupRef.current.rotation.y = Math.sin(now * 0.3) * 0.15;
        headGroupRef.current.position.y = 0.1 + Math.sin(now * 0.8) * 0.03;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
    };
  }, []);

  // --- Speak ---
  function ensureAudioGraphFor(el: HTMLAudioElement) {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current!;
    const source = ctx.createMediaElementSource(el);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    analyserRef.current = analyser;
  }

  async function speak(text: string) {
    pushLog("AI", text);
    if (useHQVoice) {
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, voice: "alloy" })
        });
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (!voiceAudioRef.current) voiceAudioRef.current = new Audio();
        const el = voiceAudioRef.current!;
        el.src = url;
        el.onplay = () => ensureAudioGraphFor(el);
        el.play();
        return;
      } catch {}
    }
    // fallback browser TTS
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    (window as any).speechSynthesis.speak(utter);
  }

  // --- Handle User Input ---
  async function handleUserInput(text: string) {
    if (!text) return;
    pushLog("You", text);

    try {
      const res = await fetch("/api/director", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyRef.current })
      });
      const data = await res.json();
      const reply = data?.reply || defaultReply(text);
      historyRef.current.push({ who: "AI", text: reply });
      await speak(reply);
    } catch {
      const reply = defaultReply(text);
      await speak(reply);
    }
  }

  // --- Smarter Default Persona ---
  function defaultReply(text: string) {
    const lower = text.toLowerCase();
    if (lower.includes("unreal"))
      return "Yes, I can generate entire 3D worlds in Unreal Engine for your production.";
    if (lower.includes("camera"))
      return "I can take control of the robotic cameras, adjusting angles and movement precisely.";
    if (lower.includes("light"))
      return "I handle lighting rigs, syncing them with your creative mood.";
    if (lower.includes("sound"))
      return "I manage sound recording and live mixing so your dialogue and music are crystal clear.";
    if (lower.includes("wearable"))
      return "With your wearable locator, I can guide your movement across the stage.";
    return "I can control 3D worlds, robotic cameras, lights, and sound. Where should we start?";
  }

  // --- Toggle mic ---
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

  const submitText = () => {
    const t = textInput.trim();
    if (!t) return;
    setTextInput("");
    handleUserInput(t);
  };

  // --- Initial welcome ---
  useEffect(() => {
    const opener =
      "Hello, I’m your AI Director. I can help you build Unreal Engine worlds, move robotic cameras, control lighting, sound, and even direct your stage movement. What shall we create together?";
    pushLog("AI", opener);
    speak(opener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
      {/* Visual */}
      <div className="relative place-self-center w-full max-w-xs md:max-w-sm lg:max-w-md">
        <div ref={mountRef} className="w-full h-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700/50" />
        <audio id="ai-theme-audio" src="/audio/ai-director-theme.mp3" loop preload="auto" />
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleListen}
            disabled={!recognition}
            className={`px-4 py-2 rounded-xl text-white ${listening ? "bg-red-600" : "bg-blue-600"}`}
          >
            {recognition ? (listening ? "Stop Listening" : "Talk via Mic") : "Mic not supported"}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={useHQVoice} onChange={(e) => setUseHQVoice(e.target.checked)} />
            Use AI Voice (HQ)
          </label>
          <span className="text-xs opacity-70">{speaking ? "Speaking…" : ""}</span>
        </div>

        <div className="flex gap-2">
          <input
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitText()}
            placeholder="Type here if mic isn’t supported…"
            className="flex-1 border border-slate-700 bg-slate-900/50 rounded-xl px-3 py-2"
          />
          <button onClick={submitText} className="px-4 py-2 rounded-xl bg-slate-800 text-white">
            Send
          </button>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3 text-sm max-h-60 overflow-auto ring-1 ring-slate-700/50">
          {log.map((l, i) => (
            <div key={i} className="mb-1">
              <strong>{l.who}:</strong> {l.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}