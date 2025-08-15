"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function VPStudioPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl"
        >
          AI-Powered Virtual Production Studios
        </motion.h1>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto text-base sm:text-lg">
          Cost-efficient virtual stages with AI Director: automated shot lists, lighting presets, and on-set continuity.
        </p>
      </section>

      {/* Studio visual + pipeline */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="/media/vp-studio-mockup.jpg"
                alt="VP Studio stage"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>

// pages/ai-powered-vp-studio.tsx // Next.js (Pages Router) single-file replacement for the "AI Powered VP Studio" page. // - Futuristic "Speak To Our Director" section // - 3D android head (Three.js) with mouth animation + blinks // - Mic input (Web Speech API) + text fallback // - LLM replies via /api/director (OpenAI Responses API) // - Optional HQ TTS via /api/tts (OpenAI Audio TTS) with analyzer-driven lipsync // - Watermark overlay + ambient audio theme // // Setup: // 1) Add environment variable OPENAI_API_KEY on the server. // 2) Create the API routes included below in your project: //    - /pages/api/director.ts //    - /pages/api/tts.ts // 3) Put your logo at /public/logo/msai-logo.svg (or update the path below). // 4) Add an ambient audio file at /public/audio/ai-director-theme.mp3. // 5) Ensure TailwindCSS is installed. This page uses utility classes for styling.

import { useEffect, useRef, useState } from "react"; import Head from "next/head"; import * as THREE from "three";

export default function AIPoweredVPStudioPage() { return ( <> <Head> <title>Media Stream AI — AI Powered VP Studios</title> <meta name="description" content="Speak to our AI Director and prototype your virtual production shoot." /> </Head> <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-black text-slate-100"> {/* Hero /} <section className="relative overflow-hidden"> <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden> {/ Futuristic grid */} <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"> <defs> <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"> <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="0.4" /> </pattern> </defs> <rect width="100" height="100" fill="url(#grid)" /> </svg> </div> <div className="max-w-6xl mx-auto px-6 pt-16 pb-6"> <h1 className="text-3xl md:text-5xl font-semibold tracking-tight"> AI Powered VP Studios </h1> <p className="mt-4 text-slate-300 max-w-3xl"> Prototype your production with our Virtual Director. Speak naturally and explore Unreal Engine sets, LED wall looks, robotic camera moves and more. </p> </div> </section>

{/* Speak To Our Director */}
    <section id="speak-to-our-director" className="relative">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Speak To Our Director</h2>
          <img src="/logo/msai-logo.svg" alt="Media Stream AI" className="h-8 opacity-60" />
        </div>

        <div className="rounded-2xl bg-slate-900/50 ring-1 ring-slate-700/50 shadow-2xl p-4 md:p-6 relative overflow-hidden">
          <Watermark />
          <AIDirectorWidget />
        </div>
      </div>
    </section>
  </main>
</>

); }

function Watermark() { return ( <div className="pointer-events-none select-none absolute top-3 right-3 opacity-20"> <div className="text-xs uppercase tracking-widest">Media Stream AI</div> </div> ); }

function AIDirectorWidget() { // --- UI State --- const [listening, setListening] = useState(false); const [recognition, setRecognition] = useState<any>(null); const [log, setLog] = useState<{ who: "AI" | "You"; text: string }[]>([]); const [textInput, setTextInput] = useState(""); const [speaking, setSpeaking] = useState(false); const [useHQVoice, setUseHQVoice] = useState(true);

// --- 3D Refs --- const mountRef = useRef<HTMLDivElement | null>(null); const sceneRef = useRef<THREE.Scene | null>(null); const rendererRef = useRef<THREE.WebGLRenderer | null>(null); const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); const jawRef = useRef<THREE.Group | null>(null); const headGroupRef = useRef<THREE.Group | null>(null); const eyelidsRef = useRef<{ upper: THREE.Mesh[]; lower: THREE.Mesh[] } | any>({ upper: null, lower: null }); const rafRef = useRef<number | null>(null);

// --- Lipsync via Web Audio (for HQ TTS) --- const audioCtxRef = useRef<AudioContext | null>(null); const analyserRef = useRef<AnalyserNode | null>(null); const themeAudioRef = useRef<HTMLAudioElement | null>(null); const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

// --- Mouth / Blink Timing --- const talkingRef = useRef(false); const talkTargetOpenRef = useRef(0); const currentOpenRef = useRef(0); const blinkTimerRef = useRef(0); const lastTimeRef = useRef(0);

// --- Conversation Context --- const ctxRef = useRef<any>({ history: [] as { who: string; text: string }[], });

// --- Helpers --- const pushLog = (who: "AI" | "You", text: string) => setLog((prev) => [...prev.slice(-18), { who, text }]);

// Initialize Web Speech Recognition useEffect(() => { const SR: any = (globalThis as any).SpeechRecognition || (globalThis as any).webkitSpeechRecognition; if (!SR) return; const recog = new SR(); recog.continuous = true; recog.interimResults = false; recog.lang = "en-GB"; recog.onresult = (event: any) => { const transcript = event.results[event.results.length - 1][0].transcript.trim(); handleUserInput(transcript); }; setRecognition(recog); return () => { try { recog.stop(); } catch {} }; }, []);

// Autoplay ambient theme after first interaction useEffect(() => { const el = document.getElementById("ai-theme-audio") as HTMLAudioElement | null; if (el) themeAudioRef.current = el; }, []);

// Three.js scene setup useEffect(() => { const scene = new THREE.Scene(); scene.background = new THREE.Color(0x070a0f); const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100); camera.position.set(0, 0.15, 3.2);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(440, 440);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
mountRef.current?.appendChild(renderer.domElement);

// Lights
const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(2, 2, 3); scene.add(key);
const rim = new THREE.DirectionalLight(0x99bbff, 0.8); rim.position.set(-2, 1.5, -2); scene.add(rim);
const fill = new THREE.AmbientLight(0x334466, 0.6); scene.add(fill);

// Head group
const headGroup = new THREE.Group(); scene.add(headGroup);

// Head
const headGeo = new THREE.SphereGeometry(1, 48, 48);
const headMat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff, metalness: 0.2, roughness: 0.35 });
const head = new THREE.Mesh(headGeo, headMat); head.scale.set(1.0, 1.15, 1.0); headGroup.add(head);

// Eyes
const eyeGeo = new THREE.SphereGeometry(0.08, 24, 24);
const eyeMat = new THREE.MeshStandardMaterial({ emissive: 0xe6ff66, color: 0x222222, emissiveIntensity: 1.2 });
const leftEye = new THREE.Mesh(eyeGeo, eyeMat); leftEye.position.set(-0.32, 0.18, 0.82);
const rightEye = new THREE.Mesh(eyeGeo, eyeMat); rightEye.position.set(0.32, 0.18, 0.82);
headGroup.add(leftEye, rightEye);

// Eyelids
const lidGeo = new THREE.PlaneGeometry(0.22, 0.12);
const lidMat = new THREE.MeshStandardMaterial({ color: 0x070a0f, metalness: 0.0, roughness: 1.0 });
const UL = new THREE.Mesh(lidGeo, lidMat); UL.position.set(-0.32, 0.24, 0.79);
const UR = new THREE.Mesh(lidGeo, lidMat); UR.position.set(0.32, 0.24, 0.79);
const LL = new THREE.Mesh(lidGeo, lidMat); LL.position.set(-0.32, 0.12, 0.79);
const LR = new THREE.Mesh(lidGeo, lidMat); LR.position.set(0.32, 0.12, 0.79);
headGroup.add(UL, UR, LL, LR);
eyelidsRef.current = { upper: [UL, UR], lower: [LL, LR] };

// Jaw
const jawGroup = new THREE.Group(); jawGroup.position.set(0, -0.22, 0.76); headGroup.add(jawGroup);
const jawGeo = new THREE.BoxGeometry(0.9, 0.4, 0.5);
const jawMat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff, metalness: 0.25, roughness: 0.4 });
const jaw = new THREE.Mesh(jawGeo, jawMat); jaw.position.set(0, -0.2, 0); jawGroup.add(jaw);
jawRef.current = jawGroup;

headGroup.position.y = 0.1;

sceneRef.current = scene; cameraRef.current = camera; rendererRef.current = renderer; headGroupRef.current = headGroup;

const tick = (t: number) => {
  const now = t * 0.001; const dt = lastTimeRef.current ? now - lastTimeRef.current : 0.016; lastTimeRef.current = now;

  // Idle sway
  if (headGroupRef.current) {
    headGroupRef.current.rotation.y = Math.sin(now * 0.3) * 0.15;
    headGroupRef.current.position.y = 0.1 + Math.sin(now * 0.8) * 0.03;
  }

  // Blink timing
  blinkTimerRef.current -= dt;
  if (blinkTimerRef.current <= 0) { blinkTimerRef.current = 3 + Math.random() * 3; triggerBlink(); }

  // Mouth animation: either text-to-speech driver (analyser) or fallback easing
  let openTarget = talkTargetOpenRef.current;
  const analyser = analyserRef.current;
  if (analyser && talkingRef.current) {
    // Use audio energy from analyser
    const arr = new Uint8Array(analyser.fftSize);
    analyser.getByteFrequencyData(arr);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    openTarget = Math.min(1, avg / 160); // tweakable
  }
  // Ease to target
  const speed = 8.0;
  currentOpenRef.current += (openTarget - currentOpenRef.current) * Math.min(1, speed * dt);
  if (jawRef.current) { jawRef.current.rotation.x = -currentOpenRef.current * 0.55; }

  renderer.render(scene, camera);
  rafRef.current = requestAnimationFrame(tick);
};
rafRef.current = requestAnimationFrame(tick);

return () => {
  if (rafRef.current) cancelAnimationFrame(rafRef.current);
  renderer.dispose();
  mountRef.current?.removeChild(renderer.domElement);
  scene.traverse((obj: any) => { if (obj.isMesh) { obj.geometry?.dispose?.(); if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose?.()); else obj.material?.dispose?.(); } });
};

}, []);

function triggerBlink() { const lids = eyelidsRef.current; if (!lids.upper) return; const duration = 0.12; let t = 0; const start = performance.now(); const up = () => { t = (performance.now() - start) / (duration * 1000); const k = t < 0.5 ? t * 2 : (1 - (t - 0.5) * 2); const amt = Math.max(0, Math.min(1, k)); lids.upper.forEach((m: any) => (m.scale.y = 1 + amt * 3)); lids.lower.forEach((m: any) => (m.scale.y = 1 + amt * 2.5)); if (t < 1) requestAnimationFrame(up); else { lids.upper.forEach((m: any) => (m.scale.y = 1)); lids.lower.forEach((m: any) => (m.scale.y = 1)); } }; requestAnimationFrame(up); }

// --- Speaking helpers --- function ensureAudioGraphFor(el: HTMLAudioElement) { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(); const ctx = audioCtxRef.current!; if (!analyserRef.current) { const source = ctx.createMediaElementSource(el); const analyser = ctx.createAnalyser(); analyser.fftSize = 1024; analyser.smoothingTimeConstant = 0.8; source.connect(analyser); analyser.connect(ctx.destination); // analyser also feeds speakers analyserRef.current = analyser; } }

function startSpeaking() { talkingRef.current = true; setSpeaking(true); // duck theme audio if (themeAudioRef.current) themeAudioRef.current.volume = 0.04; } function stopSpeaking() { talkingRef.current = false; setSpeaking(false); talkTargetOpenRef.current = 0; if (themeAudioRef.current) themeAudioRef.current.volume = 0.12; }

async function speak(text: string) { pushLog("AI", text); // Prefer HQ voice using TTS endpoint; fallback to SpeechSynthesis if disabled or errors if (useHQVoice) { try { const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, voice: "alloy" }) }); if (!res.ok) throw new Error("TTS failed"); const blob = await res.blob(); const url = URL.createObjectURL(blob); if (!voiceAudioRef.current) voiceAudioRef.current = new Audio(); const el = voiceAudioRef.current!; el.src = url; el.onended = () => { stopSpeaking(); URL.revokeObjectURL(url); }; el.onplay = () => { startSpeaking(); ensureAudioGraphFor(el); }; await el.play(); return; } catch (e) { console.warn("HQ TTS failed, falling back to SpeechSynthesis", e); } }

// Fallback: browser TTS
try { (window as any).speechSynthesis.cancel(); } catch {}
const utter = new SpeechSynthesisUtterance(text);
utter.pitch = 1.05; utter.rate = 1.0; utter.lang = "en-GB";
utter.onstart = () => { startSpeaking(); };
utter.onboundary = () => { talkTargetOpenRef.current = 0.6 + Math.random() * 0.3; };
utter.onend = () => { stopSpeaking(); };
(window as any).speechSynthesis.speak(utter);

}

async function handleUserInput(text: string) { if (!text) return; pushLog("You", text); // Kick ambient audio on first interaction if (themeAudioRef.current && themeAudioRef.current.paused) { themeAudioRef.current.volume = 0.12; themeAudioRef.current.play().catch(() => {}); }

// Ask backend LLM for a reply with context
try {
  const res = await fetch("/api/director", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history: ctxRef.current.history }) });
  const data = await res.json();
  const reply = data?.reply || defaultReply(text);
  ctxRef.current.history.push({ who: "You", text });
  ctxRef.current.history.push({ who: "AI", text: reply });
  await speak(reply);
} catch (e) {
  const reply = defaultReply(text);
  ctxRef.current.history.push({ who: "You", text });
  ctxRef.current.history.push({ who: "AI", text: reply });
  await speak(reply);
}

}

function defaultReply(text: string) { // Very light fallback when LLM is unavailable const lower = text.toLowerCase(); if (lower.includes("music")) return "Great—music video it is. Shall we start with performance on the LED wall, or build a 3D Unreal set?"; if (lower.includes("corporate")) return "Understood. Do you prefer a sleek office environment or a branded digital stage with motion graphics?"; if (lower.includes("commercial") || lower.includes("advert")) return "Nice. What’s the core message in 6–10 words? I’ll shape scenes and robotic camera moves around it."; return "I can help with sets, cameras, lighting and deliverables. What would you like to decide first?"; }

// UI events const toggleListen = () => { if (!recognition) return; if (listening) { recognition.stop(); setListening(false); } else { recognition.start(); setListening(true); if (themeAudioRef.current && themeAudioRef.current.paused) { themeAudioRef.current.volume = 0.12; themeAudioRef.current.play().catch(() => {}); } } };

const submitText = () => { const t = textInput.trim(); if (!t) return; setTextInput(""); handleUserInput(t); };

// Initial welcome useEffect(() => { const opener = "Hello, I’m your Virtual Director. Say: ‘Let’s create a music video’ or ‘I want a corporate video.’"; pushLog("AI", opener); speak(opener); // eslint-disable-next-line react-hooks/exhaustive-deps }, []);

return ( <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center"> {/* Visual /} <div className="relative place-self-center"> <div ref={mountRef} className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700/50" /> {/ Ambient theme */} <audio id="ai-theme-audio" src="/audio/ai-director-theme.mp3" loop preload="auto" /> </div>

{/* Controls */}
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <button onClick={toggleListen} disabled={!recognition} className={`px-4 py-2 rounded-xl text-white ${listening ? "bg-red-600" : "bg-blue-600"}`}>
        {recognition ? (listening ? "Stop Listening" : "Talk via Microphone") : "Mic not supported — use text"}
      </button>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={useHQVoice} onChange={(e) => setUseHQVoice(e.target.checked)} />
        Use AI Voice (HQ)
      </label>
      <span className="text-xs opacity-70">{speaking ? "Speaking…" : ""}</span>
    </div>

    <div className="flex gap-2">
      <input value={textInput} onChange={(e) => setTextInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitText()} placeholder="Type here if mic isn’t supported…" className="flex-1 border border-slate-700 bg-slate-900/50 rounded-xl px-3 py-2" />
      <button onClick={submitText} className="px-4 py-2 rounded-xl bg-slate-800 text-white">Send</button>
    </div>

    <div className="bg-slate-900/60 rounded-xl p-3 text-sm max-h-60 overflow-auto ring-1 ring-slate-700/50">
      {log.map((l, i) => (<div key={i} className="mb-1"><strong>{l.who}:</strong> {l.text}</div>))}
    </div>

    <p className="text-xs opacity-70">Prototype only — simulates creative collaboration. No actual set generation or hardware control yet.</p>
  </div>
</div>

); } // pages/ai-powered-vp-studio.tsx // Next.js (Pages Router) single-file replacement for the "AI Powered VP Studio" page. // - Futuristic "Speak To Our Director" section // - 3D android head (Three.js) with mouth animation + blinks // - Mic input (Web Speech API) + text fallback // - LLM replies via /api/director (OpenAI Responses API) // - Optional HQ TTS via /api/tts (OpenAI Audio TTS) with analyzer-driven lipsync // - Watermark overlay + ambient audio theme // // Setup: // 1) Add environment variable OPENAI_API_KEY on the server. // 2) Create the API routes included below in your project: //    - /pages/api/director.ts //    - /pages/api/tts.ts // 3) Put your logo at /public/logo/msai-logo.svg (or update the path below). // 4) Add an ambient audio file at /public/audio/ai-director-theme.mp3. // 5) Ensure TailwindCSS is installed. This page uses utility classes for styling.

import { useEffect, useRef, useState } from "react"; import Head from "next/head"; import * as THREE from "three";

export default function AIPoweredVPStudioPage() { return ( <> <Head> <title>Media Stream AI — AI Powered VP Studios</title> <meta name="description" content="Speak to our AI Director and prototype your virtual production shoot." /> </Head> <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-slate-900 to-black text-slate-100"> {/* Hero /} <section className="relative overflow-hidden"> <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden> {/ Futuristic grid */} <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"> <defs> <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"> <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeOpacity="0.05" strokeWidth="0.4" /> </pattern> </defs> <rect width="100" height="100" fill="url(#grid)" /> </svg> </div> <div className="max-w-6xl mx-auto px-6 pt-16 pb-6"> <h1 className="text-3xl md:text-5xl font-semibold tracking-tight"> AI Powered VP Studios </h1> <p className="mt-4 text-slate-300 max-w-3xl"> Prototype your production with our Virtual Director. Speak naturally and explore Unreal Engine sets, LED wall looks, robotic camera moves and more. </p> </div> </section>

{/* Speak To Our Director */}
    <section id="speak-to-our-director" className="relative">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl md:text-3xl font-semibold">Speak To Our Director</h2>
          <img src="/logo/msai-logo.svg" alt="Media Stream AI" className="h-8 opacity-60" />
        </div>

        <div className="rounded-2xl bg-slate-900/50 ring-1 ring-slate-700/50 shadow-2xl p-4 md:p-6 relative overflow-hidden">
          <Watermark />
          <AIDirectorWidget />
        </div>
      </div>
    </section>
  </main>
</>

); }

function Watermark() { return ( <div className="pointer-events-none select-none absolute top-3 right-3 opacity-20"> <div className="text-xs uppercase tracking-widest">Media Stream AI</div> </div> ); }

function AIDirectorWidget() { // --- UI State --- const [listening, setListening] = useState(false); const [recognition, setRecognition] = useState<any>(null); const [log, setLog] = useState<{ who: "AI" | "You"; text: string }[]>([]); const [textInput, setTextInput] = useState(""); const [speaking, setSpeaking] = useState(false); const [useHQVoice, setUseHQVoice] = useState(true);

// --- 3D Refs --- const mountRef = useRef<HTMLDivElement | null>(null); const sceneRef = useRef<THREE.Scene | null>(null); const rendererRef = useRef<THREE.WebGLRenderer | null>(null); const cameraRef = useRef<THREE.PerspectiveCamera | null>(null); const jawRef = useRef<THREE.Group | null>(null); const headGroupRef = useRef<THREE.Group | null>(null); const eyelidsRef = useRef<{ upper: THREE.Mesh[]; lower: THREE.Mesh[] } | any>({ upper: null, lower: null }); const rafRef = useRef<number | null>(null);

// --- Lipsync via Web Audio (for HQ TTS) --- const audioCtxRef = useRef<AudioContext | null>(null); const analyserRef = useRef<AnalyserNode | null>(null); const themeAudioRef = useRef<HTMLAudioElement | null>(null); const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

// --- Mouth / Blink Timing --- const talkingRef = useRef(false); const talkTargetOpenRef = useRef(0); const currentOpenRef = useRef(0); const blinkTimerRef = useRef(0); const lastTimeRef = useRef(0);

// --- Conversation Context --- const ctxRef = useRef<any>({ history: [] as { who: string; text: string }[], });

// --- Helpers --- const pushLog = (who: "AI" | "You", text: string) => setLog((prev) => [...prev.slice(-18), { who, text }]);

// Initialize Web Speech Recognition useEffect(() => { const SR: any = (globalThis as any).SpeechRecognition || (globalThis as any).webkitSpeechRecognition; if (!SR) return; const recog = new SR(); recog.continuous = true; recog.interimResults = false; recog.lang = "en-GB"; recog.onresult = (event: any) => { const transcript = event.results[event.results.length - 1][0].transcript.trim(); handleUserInput(transcript); }; setRecognition(recog); return () => { try { recog.stop(); } catch {} }; }, []);

// Autoplay ambient theme after first interaction useEffect(() => { const el = document.getElementById("ai-theme-audio") as HTMLAudioElement | null; if (el) themeAudioRef.current = el; }, []);

// Three.js scene setup useEffect(() => { const scene = new THREE.Scene(); scene.background = new THREE.Color(0x070a0f); const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100); camera.position.set(0, 0.15, 3.2);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setSize(440, 440);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
mountRef.current?.appendChild(renderer.domElement);

// Lights
const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(2, 2, 3); scene.add(key);
const rim = new THREE.DirectionalLight(0x99bbff, 0.8); rim.position.set(-2, 1.5, -2); scene.add(rim);
const fill = new THREE.AmbientLight(0x334466, 0.6); scene.add(fill);

// Head group
const headGroup = new THREE.Group(); scene.add(headGroup);

// Head
const headGeo = new THREE.SphereGeometry(1, 48, 48);
const headMat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff, metalness: 0.2, roughness: 0.35 });
const head = new THREE.Mesh(headGeo, headMat); head.scale.set(1.0, 1.15, 1.0); headGroup.add(head);

// Eyes
const eyeGeo = new THREE.SphereGeometry(0.08, 24, 24);
const eyeMat = new THREE.MeshStandardMaterial({ emissive: 0xe6ff66, color: 0x222222, emissiveIntensity: 1.2 });
const leftEye = new THREE.Mesh(eyeGeo, eyeMat); leftEye.position.set(-0.32, 0.18, 0.82);
const rightEye = new THREE.Mesh(eyeGeo, eyeMat); rightEye.position.set(0.32, 0.18, 0.82);
headGroup.add(leftEye, rightEye);

// Eyelids
const lidGeo = new THREE.PlaneGeometry(0.22, 0.12);
const lidMat = new THREE.MeshStandardMaterial({ color: 0x070a0f, metalness: 0.0, roughness: 1.0 });
const UL = new THREE.Mesh(lidGeo, lidMat); UL.position.set(-0.32, 0.24, 0.79);
const UR = new THREE.Mesh(lidGeo, lidMat); UR.position.set(0.32, 0.24, 0.79);
const LL = new THREE.Mesh(lidGeo, lidMat); LL.position.set(-0.32, 0.12, 0.79);
const LR = new THREE.Mesh(lidGeo, lidMat); LR.position.set(0.32, 0.12, 0.79);
headGroup.add(UL, UR, LL, LR);
eyelidsRef.current = { upper: [UL, UR], lower: [LL, LR] };

// Jaw
const jawGroup = new THREE.Group(); jawGroup.position.set(0, -0.22, 0.76); headGroup.add(jawGroup);
const jawGeo = new THREE.BoxGeometry(0.9, 0.4, 0.5);
const jawMat = new THREE.MeshStandardMaterial({ color: 0xd6d9ff, metalness: 0.25, roughness: 0.4 });
const jaw = new THREE.Mesh(jawGeo, jawMat); jaw.position.set(0, -0.2, 0); jawGroup.add(jaw);
jawRef.current = jawGroup;

headGroup.position.y = 0.1;

sceneRef.current = scene; cameraRef.current = camera; rendererRef.current = renderer; headGroupRef.current = headGroup;

const tick = (t: number) => {
  const now = t * 0.001; const dt = lastTimeRef.current ? now - lastTimeRef.current : 0.016; lastTimeRef.current = now;

  // Idle sway
  if (headGroupRef.current) {
    headGroupRef.current.rotation.y = Math.sin(now * 0.3) * 0.15;
    headGroupRef.current.position.y = 0.1 + Math.sin(now * 0.8) * 0.03;
  }

  // Blink timing
  blinkTimerRef.current -= dt;
  if (blinkTimerRef.current <= 0) { blinkTimerRef.current = 3 + Math.random() * 3; triggerBlink(); }

  // Mouth animation: either text-to-speech driver (analyser) or fallback easing
  let openTarget = talkTargetOpenRef.current;
  const analyser = analyserRef.current;
  if (analyser && talkingRef.current) {
    // Use audio energy from analyser
    const arr = new Uint8Array(analyser.fftSize);
    analyser.getByteFrequencyData(arr);
    const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    openTarget = Math.min(1, avg / 160); // tweakable
  }
  // Ease to target
  const speed = 8.0;
  currentOpenRef.current += (openTarget - currentOpenRef.current) * Math.min(1, speed * dt);
  if (jawRef.current) { jawRef.current.rotation.x = -currentOpenRef.current * 0.55; }

  renderer.render(scene, camera);
  rafRef.current = requestAnimationFrame(tick);
};
rafRef.current = requestAnimationFrame(tick);

return () => {
  if (rafRef.current) cancelAnimationFrame(rafRef.current);
  renderer.dispose();
  mountRef.current?.removeChild(renderer.domElement);
  scene.traverse((obj: any) => { if (obj.isMesh) { obj.geometry?.dispose?.(); if (Array.isArray(obj.material)) obj.material.forEach((m: any) => m.dispose?.()); else obj.material?.dispose?.(); } });
};

}, []);

function triggerBlink() { const lids = eyelidsRef.current; if (!lids.upper) return; const duration = 0.12; let t = 0; const start = performance.now(); const up = () => { t = (performance.now() - start) / (duration * 1000); const k = t < 0.5 ? t * 2 : (1 - (t - 0.5) * 2); const amt = Math.max(0, Math.min(1, k)); lids.upper.forEach((m: any) => (m.scale.y = 1 + amt * 3)); lids.lower.forEach((m: any) => (m.scale.y = 1 + amt * 2.5)); if (t < 1) requestAnimationFrame(up); else { lids.upper.forEach((m: any) => (m.scale.y = 1)); lids.lower.forEach((m: any) => (m.scale.y = 1)); } }; requestAnimationFrame(up); }

// --- Speaking helpers --- function ensureAudioGraphFor(el: HTMLAudioElement) { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(); const ctx = audioCtxRef.current!; if (!analyserRef.current) { const source = ctx.createMediaElementSource(el); const analyser = ctx.createAnalyser(); analyser.fftSize = 1024; analyser.smoothingTimeConstant = 0.8; source.connect(analyser); analyser.connect(ctx.destination); // analyser also feeds speakers analyserRef.current = analyser; } }

function startSpeaking() { talkingRef.current = true; setSpeaking(true); // duck theme audio if (themeAudioRef.current) themeAudioRef.current.volume = 0.04; } function stopSpeaking() { talkingRef.current = false; setSpeaking(false); talkTargetOpenRef.current = 0; if (themeAudioRef.current) themeAudioRef.current.volume = 0.12; }

async function speak(text: string) { pushLog("AI", text); // Prefer HQ voice using TTS endpoint; fallback to SpeechSynthesis if disabled or errors if (useHQVoice) { try { const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, voice: "alloy" }) }); if (!res.ok) throw new Error("TTS failed"); const blob = await res.blob(); const url = URL.createObjectURL(blob); if (!voiceAudioRef.current) voiceAudioRef.current = new Audio(); const el = voiceAudioRef.current!; el.src = url; el.onended = () => { stopSpeaking(); URL.revokeObjectURL(url); }; el.onplay = () => { startSpeaking(); ensureAudioGraphFor(el); }; await el.play(); return; } catch (e) { console.warn("HQ TTS failed, falling back to SpeechSynthesis", e); } }

// Fallback: browser TTS
try { (window as any).speechSynthesis.cancel(); } catch {}
const utter = new SpeechSynthesisUtterance(text);
utter.pitch = 1.05; utter.rate = 1.0; utter.lang = "en-GB";
utter.onstart = () => { startSpeaking(); };
utter.onboundary = () => { talkTargetOpenRef.current = 0.6 + Math.random() * 0.3; };
utter.onend = () => { stopSpeaking(); };
(window as any).speechSynthesis.speak(utter);

}

async function handleUserInput(text: string) { if (!text) return; pushLog("You", text); // Kick ambient audio on first interaction if (themeAudioRef.current && themeAudioRef.current.paused) { themeAudioRef.current.volume = 0.12; themeAudioRef.current.play().catch(() => {}); }

// Ask backend LLM for a reply with context
try {
  const res = await fetch("/api/director", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history: ctxRef.current.history }) });
  const data = await res.json();
  const reply = data?.reply || defaultReply(text);
  ctxRef.current.history.push({ who: "You", text });
  ctxRef.current.history.push({ who: "AI", text: reply });
  await speak(reply);
} catch (e) {
  const reply = defaultReply(text);
  ctxRef.current.history.push({ who: "You", text });
  ctxRef.current.history.push({ who: "AI", text: reply });
  await speak(reply);
}

}

function defaultReply(text: string) { // Very light fallback when LLM is unavailable const lower = text.toLowerCase(); if (lower.includes("music")) return "Great—music video it is. Shall we start with performance on the LED wall, or build a 3D Unreal set?"; if (lower.includes("corporate")) return "Understood. Do you prefer a sleek office environment or a branded digital stage with motion graphics?"; if (lower.includes("commercial") || lower.includes("advert")) return "Nice. What’s the core message in 6–10 words? I’ll shape scenes and robotic camera moves around it."; return "I can help with sets, cameras, lighting and deliverables. What would you like to decide first?"; }

// UI events const toggleListen = () => { if (!recognition) return; if (listening) { recognition.stop(); setListening(false); } else { recognition.start(); setListening(true); if (themeAudioRef.current && themeAudioRef.current.paused) { themeAudioRef.current.volume = 0.12; themeAudioRef.current.play().catch(() => {}); } } };

const submitText = () => { const t = textInput.trim(); if (!t) return; setTextInput(""); handleUserInput(t); };

// Initial welcome useEffect(() => { const opener = "Hello, I’m your Virtual Director. Say: ‘Let’s create a music video’ or ‘I want a corporate video.’"; pushLog("AI", opener); speak(opener); // eslint-disable-next-line react-hooks/exhaustive-deps }, []);

return ( <div className="grid md:grid-cols-[auto,1fr] gap-6 items-center"> {/* Visual /} <div className="relative place-self-center"> <div ref={mountRef} className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700/50" /> {/ Ambient theme */} <audio id="ai-theme-audio" src="/audio/ai-director-theme.mp3" loop preload="auto" /> </div>

{/* Controls */}
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <button onClick={toggleListen} disabled={!recognition} className={`px-4 py-2 rounded-xl text-white ${listening ? "bg-red-600" : "bg-blue-600"}`}>
        {recognition ? (listening ? "Stop Listening" : "Talk via Microphone") : "Mic not supported — use text"}
      </button>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={useHQVoice} onChange={(e) => setUseHQVoice(e.target.checked)} />
        Use AI Voice (HQ)
      </label>
      <span className="text-xs opacity-70">{speaking ? "Speaking…" : ""}</span>
    </div>

    <div className="flex gap-2">
      <input value={textInput} onChange={(e) => setTextInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && submitText()} placeholder="Type here if mic isn’t supported…" className="flex-1 border border-slate-700 bg-slate-900/50 rounded-xl px-3 py-2" />
      <button onClick={submitText} className="px-4 py-2 rounded-xl bg-slate-800 text-white">Send</button>
    </div>

    <div className="bg-slate-900/60 rounded-xl p-3 text-sm max-h-60 overflow-auto ring-1 ring-slate-700/50">
      {log.map((l, i) => (<div key={i} className="mb-1"><strong>{l.who}:</strong> {l.text}</div>))}
    </div>

    <p className="text-xs opacity-70">Prototype only — simulates creative collaboration. No actual set generation or hardware control yet.</p>
  </div>
</div>

); }



            <p className="mt-3 text-white/70 text-sm">Stage concept</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
          >
            <div className="aspect-video w-full overflow-hidden rounded-xl">
              <Image
                src="/media/ai-powered-vp-diagram.png"
                alt="AI Director pipeline"
                width={1200}
                height={675}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-white/70 text-sm">AI Director pipeline</p>
          </motion.div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="section border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">What’s inside</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: "AI Director", d: "Shot planning, continuity checks, take scoring." },
              { t: "Lighting Presets", d: "Scene-aware LUTs & DMX cue sheets." },
              { t: "Virtual Scenery", d: "Procedural sets and live parallax." },
              { t: "On-set Inference", d: "Object/person tracking and safety flags." },
              { t: "Cloud Rendering", d: "Burst rendering on our GPU clusters." },
              { t: "Editorial Exports", d: "EDL/AAF/OTIO to your NLE." }
            ].map((f, i) => (
              <motion.div
                key={f.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 card-glow"
              >
                <div className="text-lg">{f.t}</div>
                <p className="mt-2 text-white/70 text-sm">{f.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl">See the Studio</h2>
          <p className="mt-4 text-white/70">
            Book a walkthrough and discover how AI cuts cost and time from pre-vis to final pixel.
          </p>
          <a href="/contact" className="btn btn-primary mt-6">Talk to our team</a>
        </div>
      </section>
    </div>
  );
}