"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Lazy-load loaders on the client (avoid SSR/TS headaches)
let GLTFLoader: any = null;
let DRACOLoaderMod: any = null;

type ChatTurn = { who: "AI" | "You"; text: string };

// SSR-safe aliases (don’t declare in global scope to avoid collisions)
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

  // --- Conversation history / nudges ---
  const historyRef = useRef<ChatTurn[]>([]);
  const turnCountRef = useRef(0);
  const lastNudgeIndexRef = useRef(-1);

  const pushLog = (who: "AI" | "You", text: string) =>
    setLog((prev) => [...prev.slice(-18), { who, text }]);

  // Lazy-import loaders (client only)
  useEffect(() => {
    (async () => {
      if (typeof window === "undefined") return;
      const gltf = await import("three/examples/jsm/loaders/GLTFLoader.js");
      GLTFLoader = gltf.GLTFLoader;
      try {
        DRACOLoaderMod = await import("three/examples/jsm/loaders/DRACOLoader.js");
      } catch {
        DRACOLoaderMod = null;
      }
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
      if (transcript) handleUserInput(transcript);
    };

    // Keep alive while "listening" and not speaking (auto-restart)
    recog.onend = () => {
      if (listening && !speaking) {
        try { recog.start(); } catch {}
      }
    };
    recog.onerror = () => {
      if (listening && !speaking) {
        setTimeout(() => { try { recog.start(); } catch {} }, 350);
      }
    };

    setRecognition(recog);
    return () => {
      try { recog.stop(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, speaking]);

  // --- Ambient theme element ref ---
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("ai-theme-audio") as HTMLAudioElement | null;
    if (el) themeAudioRef.current = el;
  }, []);

  // --- Three.js scene setup ---
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a0f);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.15, 3.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.outputColorSpace = (THREE as any).SRGBColorSpace ?? THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Responsive sizing (square canvas that scales)
    const resize = () => {
      const w = mountRef.current?.clientWidth ?? 440;
      const size = Math.max(260, Math.min(w, 560)); // cap sizes for mobile/desktop
      renderer.setSize(size, size);
      camera.aspect = 1;
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

    // Fallback head (if GLB missing / fails)
    const addFallbackSphere = () => {
      const headGeo = new THREE.SphereGeometry(1, 48, 48);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff, metalness: 0.2, roughness: 0.35 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.scale.set(1.0, 1.15, 1.0);
      headGroup.add(head);
    };

    // Camera fitting helper
    const fitCameraToObject = (obj: THREE.Object3D) => {
      const box = new THREE.Box3().setFromObject(obj);
      if (!isFinite(box.max.x)) return; // guard if nothing in group yet
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      // Recenter model about origin
      obj.position.sub(center);

      // Frame object
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = (camera.fov * Math.PI) / 180;
      const dist = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.3;
      camera.position.set(0, 0.15 * maxDim, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };

    // Load the GLB head (visual shell)
    (async () => {
      try {
        // wait for loaders
        let tries = 0;
        while (!GLTFLoader && tries < 50) {
          await new Promise((r) => setTimeout(r, 40));
          tries++;
        }
        if (!GLTFLoader) throw new Error("GLTFLoader not ready");

        const loader = new GLTFLoader();

        // If your asset is Draco-compressed, wire DRACO
        if (DRACOLoaderMod?.DRACOLoader) {
          const draco = new DRACOLoaderMod.DRACOLoader();
          draco.setDecoderPath("/draco/"); // put decoder files in /public/draco/
          loader.setDRACOLoader(draco);
        }

        loader.load(
          "/models/android_female_head.glb",
          (gltf: any) => {
            const model = gltf.scene || gltf.scenes?.[0];
            if (!model) {
              addFallbackSphere();
              return;
            }

            model.traverse((o: any) => {
              if (o.isMesh) {
                o.castShadow = false;
                o.receiveShadow = false;
                if (!o.material || !("metalness" in o.material)) {
                  o.material = new THREE.MeshStandardMaterial({ color: 0xd6d9ff });
                }
                o.material.metalness = 0.35;
                o.material.roughness = 0.45;
                if (o.material.color) o.material.color = new THREE.Color(0xd6d9ff);
                o.geometry?.computeVertexNormals?.();
              }
            });

            model.scale.set(1, 1, 1);
            headGroup.add(model);
            fitCameraToObject(headGroup);
          },
          undefined,
          (err: any) => {
            console.error("GLB load error:", err);
            addFallbackSphere();
          }
        );
      } catch (e) {
        console.error(e);
        addFallbackSphere();
      }

      // Eyes
      const eyeGeo = new THREE.SphereGeometry(0.08, 24, 24);
      const eyeMat = new THREE.MeshStandardMaterial({ emissive: 0xe6ff66, color: 0x222222, emissiveIntensity: 1.2 });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat); leftEye.position.set(-0.32, 0.18, 0.82);
      const rightEye = new THREE.Mesh(eyeGeo, eyeMat); rightEye.position.set(0.32, 0.18, 0.82);
      headGroup.add(leftEye, rightEye);

      // Eyelids for blinks
      const lidGeo = new THREE.PlaneGeometry(0.22, 0.12);
      const lidMat = new THREE.MeshStandardMaterial({ color: 0x070a0f, metalness: 0, roughness: 1 });
      const UL = new THREE.Mesh(lidGeo, lidMat); UL.position.set(-0.32, 0.24, 0.79);
      const UR = new THREE.Mesh(lidGeo, lidMat); UR.position.set(0.32, 0.24, 0.79);
      const LL = new THREE.Mesh(lidGeo, lidMat); LL.position.set(-0.32, 0.12, 0.79);
      const LR = new THREE.Mesh(lidGeo, lidMat); LR.position.set(0.32, 0.12, 0.79);
      headGroup.add(UL, UR, LL, LR);
      eyelidsRef.current = { upper: [UL, UR], lower: [LL, LR] };

      // Procedural jaw (speaking demo even without blendshapes)
      const jawGroup = new THREE.Group(); jawGroup.position.set(0, -0.22, 0.76); headGroup.add(jawGroup);
      const jawGeo = new THREE.BoxGeometry(0.9, 0.4, 0.5);
      const jawMat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff, metalness: 0.25, roughness: 0.4 });
      const jaw = new THREE.Mesh(jawGeo, jawMat); jaw.position.set(0, -0.2, 0); jawGroup.add(jaw);
      jawRef.current = jawGroup;

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

        // Blinks
        blinkTimerRef.current -= dt;
        if (blinkTimerRef.current <= 0) {
          blinkTimerRef.current = 3 + Math.random() * 3;
          triggerBlink();
        }

        // Mouth movement (driven by analyser when speaking)
        let openTarget = talkTargetOpenRef.current;
        const analyser = analyserRef.current;
        if (analyser && talkingRef.current) {
          const arr = new Uint8Array(analyser.fftSize);
          analyser.getByteFrequencyData(arr);
          const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
          openTarget = Math.min(1, avg / 160);
        }
        const speed = 8.0;
        currentOpenRef.current += (openTarget - currentOpenRef.current) * Math.min(1, speed * dt);
        if (jawRef.current) jawRef.current.rotation.x = -currentOpenRef.current * 0.55;

        renderer.render(scene, camera);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    })();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (renderer.domElement && mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((obj: any) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose?.());
          else obj.material?.dispose?.();
        }
      });
    };
  }, []);

  function triggerBlink() {
    const lids = eyelidsRef.current;
    if (!lids) return;
    const duration = 0.12;
    let t = 0;
    const start = performance.now();
    const up = () => {
      t = (performance.now() - start) / (duration * 1000);
      const k = t < 0.5 ? t * 2 : (1 - (t - 0.5) * 2);
      const amt = Math.max(0, Math.min(1, k));
      lids.upper.forEach((m) => (m.scale.y = 1 + amt * 3));
      lids.lower.forEach((m) => (m.scale.y = 1 + amt * 2.5));
      if (t < 1) requestAnimationFrame(up);
      else {
        lids.upper.forEach((m) => (m.scale.y = 1));
        lids.lower.forEach((m) => (m.scale.y = 1));
      }
    };
    requestAnimationFrame(up);
  }

  // --- Speaking helpers ---
  function ensureAudioGraphFor(el: HTMLAudioElement) {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current!;
    const source = ctx.createMediaElementSource(el);
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);
    analyser.connect(ctx.destination);
    analyserRef.current = analyser;
  }

  function startSpeaking() {
    talkingRef.current = true;
    setSpeaking(true);
    // Pause mic while speaking to avoid echo; resume on end
    try { recognition?.stop(); } catch {}
    if (themeAudioRef.current) themeAudioRef.current.volume = 0.04; // duck theme
  }

  function stopSpeaking() {
    talkingRef.current = false;
    setSpeaking(false);
    talkTargetOpenRef.current = 0;
    if (themeAudioRef.current) themeAudioRef.current.volume = 0.12; // restore theme
    // Resume mic if user had it on
    if (listening && recognition) {
      try { recognition.start(); } catch {}
    }
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
          ensureAudioGraphFor(el); // lipsync drive
        };
        await el.play();
        return;
      } catch {
        // Fall back to browser TTS
      }
    }

    // Fallback: browser SpeechSynthesis
    try { (window as any).speechSynthesis.cancel(); } catch {}
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 1.05;
    utter.rate = 1.0;
    utter.lang = "en-GB";
    utter.onstart = () => { startSpeaking(); };
    utter.onboundary = () => { talkTargetOpenRef.current = 0.6 + Math.random() * 0.3; };
    utter.onend = () => { stopSpeaking(); };
    (window as any).speechSynthesis.speak(utter);
  }

  // --- Persona nudges (auto-explain capabilities across turns) ---
  const personaNudges = [
    "I can generate cinematic 3D worlds in Unreal Engine — urban neon, desert dunes, you name it.",
    "I can coordinate the robotic camera system — dolly, crane, or precise motion paths.",
    "I manage lighting cues and looks — soft keys, dramatic rims, and synced effects.",
    "I handle sound recording and live mix — dialogue clarity and music balance.",
    "With a wearable locator, I can guide your movement and marks during takes.",
  ];

  async function maybeAutoNudge() {
    if (turnCountRef.current % 2 !== 0) return; // nudge every 2 user turns
    const nextIndex = (lastNudgeIndexRef.current + 1) % personaNudges.length;
    lastNudgeIndexRef.current = nextIndex;
    await speak(personaNudges[nextIndex]);
  }

  // --- Handle User Input ---
  async function handleUserInput(text: string) {
    if (!text) return;
    pushLog("You", text);
    turnCountRef.current += 1;

    // Start ambient on first interaction
    if (themeAudioRef.current && themeAudioRef.current.paused) {
      themeAudioRef.current.volume = 0.12;
      themeAudioRef.current.play().catch(() => {});
    }

    // LLM backend (or fallback)
    try {
      const res = await fetch("/api/director", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: historyRef.current })
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

    // After answering, occasionally add a capability nudge
    maybeAutoNudge();
  }

  // --- Smarter Default Persona ---
  function defaultReply(text: string) {
    const lower = text.toLowerCase();
    if (lower.includes("unreal"))
      return "Absolutely — I can generate entire 3D worlds in Unreal Engine for your production.";
    if (lower.includes("camera"))
      return "I’ll coordinate the robotic camera moves — arcs, speed ramps, and repeatable paths.";
    if (lower.includes("light"))
      return "I’ll set a lighting look — key, fill, rim — then animate it to match the mood.";
    if (lower.includes("sound"))
      return "I’ll manage sound capture and live mixing to keep dialogue crisp.";
    if (lower.includes("wearable") || lower.includes("locator"))
      return "With your wearable locator, I’ll guide your movement and marks during takes.";
    if (lower.includes("music"))
      return "Great — music video it is. Start with LED wall performance, or build a 3D Unreal set first?";
    if (lower.includes("corporate"))
      return "Understood. Prefer a sleek office environment or a branded digital stage with motion graphics?";
    if (lower.includes("commercial") || lower.includes("advert"))
      return "Nice. What’s the core message in 6–10 words? I’ll shape scenes and robotic camera moves around it.";
    return "I can control 3D worlds, robotic cameras, lights, and sound. What shall we create first?";
  }

  // --- Toggle mic ---
  const toggleListen = () => {
    if (!recognition) return;
    if (listening) {
      try { recognition.stop(); } catch {}
      setListening(false);
    } else {
      try { recognition.start(); } catch {}
      setListening(true);
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

  // Initial welcome
  useEffect(() => {
    const opener =
      "Hello, I’m your AI Director. I can build Unreal Engine worlds, coordinate robotic cameras, control lighting and sound, and guide movement via wearable locator. What shall we create together?";
    pushLog("AI", opener);
    speak(opener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center">
      {/* Visual */}
      <div className="relative place-self-center w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div
          ref={mountRef}
          className="w-full h-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700/50"
        />
        {/* Ambient theme */}
        <audio id="ai-theme-audio" src="/audio/ai-director-theme.mp3" loop preload="auto" />
        {/* Watermark */}
        <div className="pointer-events-none select-none absolute top-2 right-2 text-[10px] sm:text-xs opacity-30 tracking-widest">
          Media Stream AI
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggleListen}
            disabled={!recognition}
            className={`px-4 py-2 rounded-xl text-white ${listening ? "bg-red-600" : "bg-blue-600"}`}
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