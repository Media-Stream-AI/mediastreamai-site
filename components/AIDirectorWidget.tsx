"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type ChatTurn = { who: "AI" | "You"; text: string };

export default function AIDirectorWidget() {
  // ---------- UI STATE ----------
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null); // keep 'any' to avoid DOM typing collisions
  const [log, setLog] = useState<ChatTurn[]>([]);
  const [textInput, setTextInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [useHQVoice, setUseHQVoice] = useState(true);
  const [webglSupported, setWebglSupported] = useState(true);

  // ---------- 3D REFS (untyped to avoid CI type issues) ----------
  const mountRef = useRef<HTMLDivElement | null>(null);
  const jawRef = useRef<any>(null);
  const headGroupRef = useRef<any>(null);
  const eyelidsRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

  // ---------- AUDIO / LIPSYNC ----------
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const themeAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  // ---------- MOUTH / BLINK TIMING ----------
  const talkingRef = useRef(false);
  const talkTargetOpenRef = useRef(0);
  const currentOpenRef = useRef(0);
  const blinkTimerRef = useRef(0);
  const lastTimeRef = useRef(0);

  // ---------- CONVERSATION HISTORY ----------
  const historyRef = useRef<ChatTurn[]>([]);

  const pushLog = (who: "AI" | "You", text: string) =>
    setLog((prev) => [...prev.slice(-18), { who, text }]);

  // ---------- INIT SPEECH RECOGNITION ----------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SR: any =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SR) {
      setRecognition(null);
      return;
    }

    const recog: any = new SR();
    recog.continuous = true;
    recog.interimResults = false;
    recog.lang = "en-GB";
    recog.onresult = (event: any) => {
      try {
        const results = event.results;
        const last = results[results.length - 1];
        const transcript = last[0].transcript.trim();
        handleUserInput(transcript);
      } catch {
        /* ignore malformed events */
      }
    };
    setRecognition(recog);

    return () => {
      try {
        recog.stop();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- THEME AUDIO ELEMENT ----------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("ai-theme-audio") as HTMLAudioElement | null;
    if (el) themeAudioRef.current = el;
  }, []);

  // ---------- THREE.JS SCENE ----------
  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return;

    // WebGL capability guard (prevents crashes on export/headless)
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebglSupported(false);
      // Soft fallback message
      const fallback = document.createElement("div");
      fallback.className = "p-4 text-center text-xs opacity-70";
      fallback.innerText =
        "Your browser doesn’t support WebGL. The director will respond via text/voice only.";
      mountRef.current.appendChild(fallback);
      return;
    }

    setWebglSupported(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a0f);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 3.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    const size = 440; // fixed square canvas looks nice inside card
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Resize observer for responsiveness
    const ro = new ResizeObserver(() => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const dim = Math.min(rect.width, 520); // clamp
      rendererRef.current.setSize(dim, dim);
      cameraRef.current.aspect = 1;
      cameraRef.current.updateProjectionMatrix();
    });
    ro.observe(mountRef.current);

    // Lights (cool key + rim, soft fill)
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(2, 2, 3);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x99bbff, 0.8);
    rim.position.set(-2, 1.5, -2);
    scene.add(rim);

    const fill = new THREE.AmbientLight(0x334466, 0.6);
    scene.add(fill);

    // ------------- ANDROID / DATA-INSPIRED HEAD -------------
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    headGroupRef.current = headGroup;

    /** Palette tuned for “android” look */
    const SKIN = 0xf0f2ff;       // pale porcelain
    const SHEEN = { metalness: 0.18, roughness: 0.3 };
    const HAIR = 0x1a1f2b;       // very dark blue-black
    const AMBER = 0xd8ff72;      // android-amber iris
    const LIP  = 0x9aa4c6;       // subtle cool lip line

    // Head (taller ellipsoid, slightly squared jaw)
    const headGeo = new THREE.SphereGeometry(1, 64, 64);
    const headMat = new THREE.MeshStandardMaterial({
      color: SKIN,
      ...SHEEN,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.scale.set(0.98, 1.2, 1.0);
    head.position.set(0, 0, 0);
    headGroup.add(head);

    // Subtle jaw “square-off”
    const pos = (head.geometry as any).attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y < -0.2) {
        const x = pos.getX(i);
        const z = pos.getZ(i);
        const scale = 1 + (Math.min(0, y + 0.2) * -0.6); // widens lower face
        pos.setX(i, x * scale);
        pos.setZ(i, z * scale * 0.95);
      }
    }
    pos.needsUpdate = true;
    head.geometry.computeVertexNormals();

    // Hair cap (slicked-back cap via clipping plane)
    const hairGeo = new THREE.SphereGeometry(1.01, 64, 64);
    const hairMat = new THREE.MeshStandardMaterial({
      color: HAIR,
      metalness: 0.0,
      roughness: 0.9,
    });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.scale.copy(head.scale);
    hair.position.copy(head.position);
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.05); // keeps above y=0.05
    (hair.material as any).clippingPlanes = [clipPlane];
    (hair.material as any).clipShadows = true;
    scene.add(hair);

    // Eyes (android amber)
    const eyeGeo = new THREE.SphereGeometry(0.085, 24, 24);
    const eyeMat = new THREE.MeshStandardMaterial({
      emissive: AMBER,
      color: 0x222222,
      emissiveIntensity: 1.35,
    });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.32, 0.18, 0.82);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.32, 0.18, 0.82);
    headGroup.add(leftEye, rightEye);

    // Pupils (tiny dark discs)
    const pupilGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.01, 16);
    const pupilMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0, roughness: 1 });
    const pupilL = new THREE.Mesh(pupilGeo, pupilMat);
    const pupilR = new THREE.Mesh(pupilGeo, pupilMat);
    [pupilL, pupilR].forEach((p) => (p.rotation.x = Math.PI / 2));
    pupilL.position.set(-0.32, 0.18, 0.88);
    pupilR.position.set(0.32, 0.18, 0.88);
    headGroup.add(pupilL, pupilR);

    // Eyelids (slightly darker)
    const lidGeo = new THREE.PlaneGeometry(0.23, 0.12);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x0a0e16,
      metalness: 0,
      roughness: 1,
    });
    const UL = new THREE.Mesh(lidGeo, lidMat); UL.position.set(-0.32, 0.24, 0.79);
    const UR = new THREE.Mesh(lidGeo, lidMat); UR.position.set(0.32, 0.24, 0.79);
    const LL = new THREE.Mesh(lidGeo, lidMat); LL.position.set(-0.32, 0.12, 0.79);
    const LR = new THREE.Mesh(lidGeo, lidMat); LR.position.set(0.32, 0.12, 0.79);
    headGroup.add(UL, UR, LL, LR);
    eyelidsRef.current = { upper: [UL, UR], lower: [LL, LR] };

    // Simple nose bridge (thin box)
    const noseGeo = new THREE.BoxGeometry(0.08, 0.22, 0.06);
    const noseMat = new THREE.MeshStandardMaterial({ color: SKIN, ...SHEEN });
    const nose = new THREE.Mesh(noseGeo, noseMat);
    nose.position.set(0, 0.12, 0.85);
    headGroup.add(nose);

    // Eyebrows (thin bars)
    const browGeo = new THREE.BoxGeometry(0.25, 0.02, 0.02);
    const browMat = new THREE.MeshStandardMaterial({ color: 0x2b3344, metalness: 0, roughness: 1 });
    const browL = new THREE.Mesh(browGeo, browMat);
    const browR = new THREE.Mesh(browGeo, browMat);
    browL.position.set(-0.29, 0.28, 0.82);
    browR.position.set(0.29, 0.28, 0.82);
    headGroup.add(browL, browR);

    // Lip line (thin, slightly darker band)
    const lipGeo = new THREE.BoxGeometry(0.36, 0.01, 0.04);
    const lipMat = new THREE.MeshStandardMaterial({ color: LIP, metalness: 0.05, roughness: 0.6 });
    const lip = new THREE.Mesh(lipGeo, lipMat);
    lip.position.set(0, -0.06, 0.86);
    headGroup.add(lip);

    // Ear nubs (small half-spheres)
    const earGeo = new THREE.SphereGeometry(0.12, 24, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI);
    const earMat = new THREE.MeshStandardMaterial({ color: SKIN, ...SHEEN });
    const earL = new THREE.Mesh(earGeo, earMat);
    const earR = new THREE.Mesh(earGeo, earMat);
    earL.position.set(-0.9, 0.06, 0.0);
    earR.position.set(0.9, 0.06, 0.0);
    earL.rotation.z = Math.PI / 2;
    earR.rotation.z = -Math.PI / 2;
    headGroup.add(earL, earR);

    // Jaw (animated)
    const jawGroup = new THREE.Group();
    jawGroup.position.set(0, -0.22, 0.76);
    headGroup.add(jawGroup);
    const jawGeo = new THREE.BoxGeometry(0.9, 0.4, 0.5);
    const jawMat = new THREE.MeshStandardMaterial({ color: SKIN, ...SHEEN });
    const jaw = new THREE.Mesh(jawGeo, jawMat);
    jaw.position.set(0, -0.2, 0);
    jawGroup.add(jaw);
    jawRef.current = jawGroup;

    // subtle overall placement
    headGroup.position.y = 0.1;

    // Animation loop
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

      // Mouth open amount
      let openTarget = talkTargetOpenRef.current;
      const analyser = analyserRef.current;
      if (analyser && talkingRef.current) {
        const arr = new Uint8Array(analyser.frequencyBinCount || analyser.fftSize);
        analyser.getByteFrequencyData(arr);
        const avg = arr.reduce((a, b) => a + b, 0) / Math.max(1, arr.length);
        openTarget = Math.min(1, avg / 160);
      }
      const speed = 8.0;
      currentOpenRef.current +=
        (openTarget - currentOpenRef.current) * Math.min(1, speed * dt);
      if (jawRef.current) jawRef.current.rotation.x = -currentOpenRef.current * 0.55;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      try {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        ro.disconnect();
        if (renderer && renderer.domElement && mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        renderer.dispose();
        scene.traverse((obj: any) => {
          if (obj.isMesh) {
            obj.geometry?.dispose?.();
            if (Array.isArray(obj.material))
              obj.material.forEach((m) => m?.dispose?.());
            else obj.material?.dispose?.();
          }
        });
      } catch {
        /* noop */
      }
    };
  }, []);

  // ---------- HELPERS ----------
  function triggerBlink() {
    const lids = eyelidsRef.current;
    if (!lids) return;
    const duration = 0.12;
    const start = performance.now();
    const step = () => {
      const t = (performance.now() - start) / (duration * 1000);
      const k = t < 0.5 ? t * 2 : 1 - (t - 0.5) * 2;
      const amt = Math.max(0, Math.min(1, k));
      lids.upper.forEach((m: any) => (m.scale.y = 1 + amt * 3));
      lids.lower.forEach((m: any) => (m.scale.y = 1 + amt * 2.5));
      if (t < 1) requestAnimationFrame(step);
      else {
        lids.upper.forEach((m: any) => (m.scale.y = 1));
        lids.lower.forEach((m: any) => (m.scale.y = 1));
      }
    };
    requestAnimationFrame(step);
  }

  function ensureAudioGraphFor(el: HTMLAudioElement) {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current!;
      // Rebuild chain per new audio element
      const source = ctx.createMediaElementSource(el);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;
    } catch {
      // Some browsers restrict audio graph creation before user gesture
      analyserRef.current = null;
    }
  }

  // Small helper to give a “measured android” cadence
  function applyAndroidProsody(s: string) {
    return s
      .replace(/, /g, ", … ")
      .replace(/: /g, ": … ")
      .replace(/; /g, "; … ")
      .replace(/\. /g, ". … ");
  }

  // Optional: short “android chime” at start of speech
  function pingChime() {
    try {
      const ctx =
        audioCtxRef.current ||
        new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 880; // A5
      gain.gain.value = 0.0001;
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      // quick ping envelope
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.03);
      gain.gain.linearRampToValueAtTime(0.0, ctx.currentTime + 0.12);
      osc.stop(ctx.currentTime + 0.14);
    } catch {}
  }

  function startSpeaking() {
    talkingRef.current = true;
    setSpeaking(true);
    pingChime();
    if (themeAudioRef.current) themeAudioRef.current.volume = 0.04; // duck theme
  }
  function stopSpeaking() {
    talkingRef.current = false;
    setSpeaking(false);
    talkTargetOpenRef.current = 0;
    if (themeAudioRef.current) themeAudioRef.current.volume = 0.12; // restore theme
  }

  async function speak(text: string) {
    pushLog("AI", text);

    // Prefer HQ TTS via API if present
    if (useHQVoice) {
      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: applyAndroidProsody(text), voice: "verse" }), // neutral/precise vibe
        });
        if (!res.ok) throw new Error("TTS failed");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        if (!voiceAudioRef.current) voiceAudioRef.current = new Audio();
        const el = voiceAudioRef.current!;
        el.src = url;
        el.onended = () => {
          stopSpeaking();
          URL.revokeObjectURL(url);
        };
        el.onplay = () => {
          startSpeaking();
          ensureAudioGraphFor(el);
        };
        await el.play();
        return;
      } catch {
        // fall through to browser speechSynthesis
      }
    }

    // Fallback: browser SpeechSynthesis (tighter, precise cadence)
    try {
      (window as any).speechSynthesis.cancel();
    } catch {}
    const utter = new SpeechSynthesisUtterance(applyAndroidProsody(text));
    utter.pitch = 0.95;  // slightly lower
    utter.rate = 1.05;   // slightly brisk
    utter.lang = "en-GB";

    // Try to pick a neutral/UK voice if available
    const voices = (window as any).speechSynthesis.getVoices?.() || [];
    const preferred =
      voices.find((v: any) => /en-GB|English.*United Kingdom/i.test(v.lang || v.name)) ||
      voices.find((v: any) => /English/i.test(v.lang || v.name));
    if (preferred) utter.voice = preferred;

    utter.onstart = () => {
      startSpeaking();
    };
    utter.onboundary = () => {
      talkTargetOpenRef.current = 0.55 + Math.random() * 0.25;
    };
    utter.onend = () => {
      stopSpeaking();
    };
    (window as any).speechSynthesis.speak(utter);
  }

  async function handleUserInput(text: string) {
    if (!text) return;
    pushLog("You", text);

    // Start ambient theme on first interaction
    if (themeAudioRef.current && themeAudioRef.current.paused) {
      try {
        themeAudioRef.current.volume = 0.12;
        await themeAudioRef.current.play();
      } catch {
        /* browsers may block autoplay */
      }
    }

    // Call LLM backend (falls back to canned responses)
    try {
      const res = await fetch("/api/director", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyRef.current }),
      });
      const data = await res.json();
      const reply = data?.reply || defaultReply(text);
      historyRef.current.push({ who: "You", text });
      historyRef.current.push({ who: "AI", text: reply });
      await speak(reply);
    } catch {
      const reply = defaultReply(text);
      historyRef.current.push({ who: "You", text });
      historyRef.current.push({ who: "AI", text: reply });
      await speak(reply);
    }
  }

  function defaultReply(text: string) {
    const lower = text.toLowerCase();
    if (lower.includes("music"))
      return "Great—music video it is. Start with LED wall performance, or build a 3D Unreal set first?";
    if (lower.includes("corporate"))
      return "Understood. Prefer a sleek office environment or a branded digital stage with motion graphics?";
    if (lower.includes("commercial") || lower.includes("advert"))
      return "Nice. What’s the core message in 6–10 words? I’ll shape scenes and robotic camera moves around it.";
    if (lower.includes("3d") || lower.includes("unreal"))
      return "We can spin up stylised 3D backgrounds and parallax loops for the LED wall. What mood are you after?";
    if (lower.includes("scene") || lower.includes("shot"))
      return "Tell me your key beats, and I’ll propose camera moves, lenses, and lighting presets.";
    return "I can help with sets, cameras, lighting, and deliverables. What should we decide first?";
  }

  // ---------- CONTROLS ----------
  const toggleListen = () => {
    if (!recognition) return;
    if (listening) {
      try {
        recognition.stop();
      } catch {}
      setListening(false);
    } else {
      try {
        recognition.start();
        setListening(true);
      } catch {}
      if (themeAudioRef.current && themeAudioRef.current.paused) {
        themeAudioRef.current.volume = 0.12;
        themeAudioRef.current.play().catch(() => {});
      }
    }
  };

  const submitText = () => {
    const t = textInput.trim();
    if (!t) return;
    setTextInput("");
    handleUserInput(t);
  };

  // ---------- INITIAL WELCOME ----------
  useEffect(() => {
    const opener =
      "Hello, I am your Virtual Director. Shall we create a music video, or would you prefer a corporate film?";
    pushLog("AI", opener);
    setTimeout(() => speak(opener), 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
      {/* Visual */}
      <div className="relative place-self-center">
        <div
          ref={mountRef}
          className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700/50 min-w-[280px] min-h-[280px] flex items-center justify-center"
        >
          {!webglSupported && (
            <div className="p-4 text-center text-xs opacity-70">
              Your browser doesn’t support WebGL. The director will respond via text/voice only.
            </div>
          )}
        </div>
        {/* Ambient theme (optional asset, safe if missing) */}
        <audio id="ai-theme-audio" src="/audio/ai-director-theme.mp3" loop preload="auto" />
        {/* Watermark */}
        <div className="pointer-events-none select-none absolute top-2 right-2 text-xs opacity-30 tracking-widest">
          Media Stream AI
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={toggleListen}
            disabled={!recognition}
            className={`px-4 py-2 rounded-xl text-white ${listening ? "bg-red-600" : "bg-blue-600"}`}
            title={!recognition ? "Microphone API not supported in this browser" : ""}
          >
            {recognition ? (listening ? "Stop Listening" : "Talk via Microphone") : "Mic not supported — use text"}
          </button>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useHQVoice}
              onChange={(e) => setUseHQVoice(e.target.checked)}
            />
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

        <p className="text-xs opacity-70">
          Prototype only — simulates creative collaboration. No actual set generation or hardware control yet.
        </p>
      </div>
    </div>
  );
}