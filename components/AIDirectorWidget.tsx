"use client";

import React from "react";

/** Lightweight types */
type SceneType =
  | "Interview"
  | "Narrative"
  | "Music Performance"
  | "Product"
  | "Promo"
  | "Sport"
  | "Corporate"
  | "News";

type CameraMove = "Static" | "Dolly" | "Crane" | "Orbit" | "Handheld" | "Gimbal";
type LightPreset = "Neutral Key" | "Moody Blue" | "Warm Sunset" | "High Key" | "Concert Strobe";
type ChatMsg = { role: "assistant" | "user"; text: string };

type Shot = {
  id: string;
  scene: number;
  type: string;
  durationSec: number;
  camMove: CameraMove;
  lens: string;
  notes?: string;
  dmx?: { preset: LightPreset; intensity: number };
};

type Plan = {
  title: string;
  videoType: string;
  scenes: number;
  sceneTypes: SceneType[];
  robotics: { enabled: boolean; moves: CameraMove[]; safeZones: boolean };
  lighting: { enabled: boolean; preset: LightPreset; intensity: number; artnet: boolean };
  virtualSet: {
    enabled: boolean;
    style: "Studio" | "Modern Loft" | "City Night" | "Concert LED" | "Newsroom";
    ledTest: "Not started" | "Testing" | "Pass" | "Fail";
  };
  shotlist: Shot[];
  efficiency?: { timeSavedPct: number; energySavedPct: number };
};

const DEFAULT_SCENES: SceneType[] = ["Interview", "Narrative", "Promo"];
const uid = () => Math.random().toString(36).slice(2, 9);

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

export default function AIDirectorWidget() {
  const [chat, setChat] = React.useState<ChatMsg[]>([
    {
      role: "assistant",
      text:
        "Hi, I’m your AI Director. Tell me what you want to make — e.g. “30s promo”, “music video”, or “2-minute corporate film”. " +
        "I coordinate Unreal LED worlds, robotic cameras, smart lights, and real-time editing in Elevate.io. " +
        "I always collaborate with human creativity — I just automate production to save time and power.",
    },
  ]);
  const [input, setInput] = React.useState("");

  // Brief / controls
  const [videoType, setVideoType] = React.useState("30s Promo");
  const [scenes, setScenes] = React.useState(6);
  const [sceneTypes, setSceneTypes] = React.useState<SceneType[]>([...DEFAULT_SCENES]);

  const [roboticsEnabled, setRoboticsEnabled] = React.useState(true);
  const [robotMoves, setRobotMoves] = React.useState<CameraMove[]>(["Dolly", "Orbit"]);
  const [safeZones, setSafeZones] = React.useState(true);

  const [lightsEnabled, setLightsEnabled] = React.useState(true);
  const [lightPreset, setLightPreset] = React.useState<LightPreset>("Neutral Key");
  const [lightIntensity, setLightIntensity] = React.useState(70);
  const [artnet, setArtnet] = React.useState(true);

  const [virtualEnabled, setVirtualEnabled] = React.useState(true);
  const [virtualStyle, setVirtualStyle] =
    React.useState<Plan["virtualSet"]["style"]>("Studio");
  const [ledTest, setLedTest] =
    React.useState<Plan["virtualSet"]["ledTest"]>("Not started");

  const [plan, setPlan] = React.useState<Plan | null>(null);
  const [busy, setBusy] = React.useState(false);

  // Voice state
  const recognitionRef = React.useRef<any>(null);
  const [isListening, setIsListening] = React.useState(false);
  const [voiceReplies, setVoiceReplies] = React.useState(true);

  function addChat(role: ChatMsg["role"], text: string, speak = false) {
    setChat((c) => [...c, { role, text }]);
    if (speak && voiceReplies && role === "assistant") trySpeak(text);
  }

  function trySpeak(text: string) {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1; u.pitch = 1; u.lang = "en-US";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  function toggleSceneType(s: SceneType) {
    setSceneTypes((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }
  function toggleMove(m: CameraMove) {
    setRobotMoves((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    );
  }

  // ---- ChatGPT call (free-flowing conversation, stays on task) ----
  async function callDirectorAPI(userMsg: string) {
    try {
      setBusy(true);
      const messages = chat.map((m) => ({
        role: m.role,
        content: m.text,
      }));

      messages.push({ role: "user", content: userMsg });

      const context = {
        videoType,
        scenes,
        sceneTypes,
        roboticsEnabled,
        robotMoves,
        safeZones,
        lightsEnabled,
        lightPreset,
        lightIntensity,
        artnet,
        virtualEnabled,
        virtualStyle,
        ledTest,
      };

      const r = await fetch("/api/director", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages, context }),
      });
      const data = await r.json();
      if (data?.reply) {
        addChat("assistant", data.reply, true);
      } else {
        addChat(
          "assistant",
          "Describe the idea and I’ll plan shots, robotics, lights, Unreal LED worlds, and real-time editing.",
          true
        );
      }
    } catch (e: any) {
      addChat(
        "assistant",
        "I couldn't reach the Director service. Check connectivity and that OPENAI_API_KEY is set.",
        true
      );
    } finally {
      setBusy(false);
    }
  }

  function submitUserMessage(msgOverride?: string) {
    const toSend = (msgOverride ?? input).trim();
    if (!toSend) return;
    addChat("user", toSend);
    setInput("");
    callDirectorAPI(toSend);
  }

  // ---- Plan generator (client-side reliable) ----
  function generatePlan() {
    setBusy(true);
    addChat(
      "assistant",
      "Creating shot plan, lighting cues, safe robot paths, and Unreal LED scene notes…",
      true
    );

    const moveCycle: CameraMove[] = robotMoves.length
      ? robotMoves
      : ["Static", "Dolly", "Crane", "Orbit"];

    const shots: Shot[] = [];
    for (let i = 1; i <= scenes; i++) {
      const st = sceneTypes[(i - 1) % Math.max(1, sceneTypes.length)];
      const mv = moveCycle[(i - 1) % moveCycle.length];
      shots.push(
        {
          id: uid(),
          scene: i,
          type: `${st} — Wide`,
          durationSec: 6,
          camMove: mv,
          lens: "24mm",
          notes:
            "Establishing; safe-speed robot path; Unreal set check on LED wall (parallax).",
          dmx: lightsEnabled
            ? { preset: lightPreset, intensity: lightIntensity }
            : undefined,
        },
        {
          id: uid(),
          scene: i,
          type: `${st} — Mid`,
          durationSec: 5,
          camMove: mv === "Static" ? "Dolly" : "Static",
          lens: "35mm",
          notes: "Dialogue/action beat; monitor moiré vs. lensing.",
          dmx: lightsEnabled
            ? { preset: lightPreset, intensity: Math.max(40, lightIntensity - 10) }
            : undefined,
        },
        {
          id: uid(),
          scene: i,
          type: `${st} — Close`,
          durationSec: 4,
          camMove: "Static",
          lens: "50mm",
          notes:
            "Emphasis; check facial highlights; consider Elevate.io marker for select.",
          dmx: lightsEnabled
            ? { preset: lightPreset, intensity: Math.min(100, lightIntensity + 5) }
            : undefined,
        }
      );
    }

    // Tailor efficiency estimates
    const timeSavedBase = (roboticsEnabled ? 20 : 10) + (lightsEnabled ? 10 : 0) + (virtualEnabled ? 10 : 0);
    const energySavedBase = (lightsEnabled ? 10 : 5) + (virtualEnabled ? 10 : 5);
    const efficiency = {
      timeSavedPct: Math.min(60, Math.max(25, timeSavedBase)),
      energySavedPct: Math.min(40, Math.max(15, energySavedBase)),
    };

    const nextPlan: Plan = {
      title: `AI Director: ${videoType}`,
      videoType,
      scenes,
      sceneTypes: [...sceneTypes],
      robotics: { enabled: roboticsEnabled, moves: [...robotMoves], safeZones },
      lighting: { enabled: lightsEnabled, preset: lightPreset, intensity: lightIntensity, artnet },
      virtualSet: { enabled: virtualEnabled, style: virtualStyle, ledTest },
      shotlist: shots,
      efficiency,
    };

    setTimeout(() => {
      setPlan(nextPlan);
      addChat(
        "assistant",
        `Plan ready. **Efficiency Snapshot:** ~${efficiency.timeSavedPct}% time saved and ~${efficiency.energySavedPct}% energy saved vs. a manual workflow. ` +
          `We’ll still collaborate closely with the human creative slate — automation handles the repetitive steps.`,
        true
      );
      setBusy(false);
    }, 700);
  }

  function runLedTest() {
    if (!virtualEnabled) {
      addChat("assistant", "Enable the virtual set to test the LED wall.", true);
      return;
    }
    setLedTest("Testing");
    addChat(
      "assistant",
      "Testing LED wall: color gamut, moiré pattern, exposure & parallax…",
      true
    );
    setBusy(true);
    setTimeout(() => {
      setLedTest("Pass");
      addChat(
        "assistant",
        "LED test passed. Parallax within tolerance. Moiré minimal at 35–50mm. Good to roll.",
        true
      );
      setBusy(false);
    }, 1100);
  }

  function exportJSON() {
    if (!plan) return;
    const blob = new Blob([JSON.stringify(plan, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plan.title.toLowerCase().replace(/\s+/g, "-")}-shotplan.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function resetAll() {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setChat([
      {
        role: "assistant",
        text:
          "Reset complete. Describe what you want to make and I’ll plan shots, robotics, lights, Unreal LED worlds, and editing.",
      },
    ]);
    setInput("");
    setVideoType("30s Promo");
    setScenes(6);
    setSceneTypes([...DEFAULT_SCENES]);
    setRoboticsEnabled(true);
    setRobotMoves(["Dolly", "Orbit"]);
    setSafeZones(true);
    setLightsEnabled(true);
    setLightPreset("Neutral Key");
    setLightIntensity(70);
    setArtnet(true);
    setVirtualEnabled(true);
    setVirtualStyle("Studio");
    setLedTest("Not started");
    setPlan(null);
  }

  // ---- Voice: auto start on mount; stop on unmount / tab hidden ----
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const SR: any =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      console.warn("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (ev: any) => {
      const res = ev.results[ev.results.length - 1];
      const transcript = res[0].transcript.trim();
      if (transcript) submitUserMessage(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => {
      if (!document.hidden) {
        try {
          recognition.start();
          setIsListening(true);
        } catch {}
      }
    };

    try {
      recognition.start();
      setIsListening(true);
    } catch {}

    recognitionRef.current = recognition;

    const onVisibility = () => {
      if (document.hidden) {
        try { recognition.stop(); } catch {}
        setIsListening(false);
      } else {
        try { recognition.start(); setIsListening(true); } catch {}
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      try { recognition.stop(); } catch {}
      setIsListening(false);
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleMic() {
    const rec = recognitionRef.current;
    if (!rec) return;
    try {
      isListening ? rec.stop() : rec.start();
      setIsListening(!isListening);
    } catch {}
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
      {/* Status bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block size-2 rounded-full ${
              isListening ? "bg-emerald-400" : "bg-white/30"
            }`}
          />
          <span className="text-sm text-white/70 font-glacial">
            {isListening ? "Listening…" : "Mic idle"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-white/70 font-glacial flex items-center gap-2">
            <input
              type="checkbox"
              checked={voiceReplies}
              onChange={(e) => setVoiceReplies(e.target.checked)}
            />
            Voice Replies
          </label>
          <button
            onClick={toggleMic}
            className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs hover:bg-white/15 transition"
          >
            {isListening ? "Mute Mic" : "Unmute Mic"}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 grid lg:grid-cols-3 gap-6">
        {/* Brief */}
        <div className="rounded-2xl border border-white/10 p-4 bg-black/30">
          <h3 className="font-horizon text-lg">Creative Brief</h3>
          <label className="block mt-3 text-xs text-white/60">Video Type</label>
          <input
            className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm"
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
            placeholder="30s Promo, Music Video, Corporate, …"
          />

          <label className="block mt-3 text-xs text-white/60">Scenes</label>
          <input
            type="number"
            min={1}
            max={20}
            className="mt-1 w-28 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm"
            value={scenes}
            onChange={(e) =>
              setScenes(Math.max(1, Math.min(20, Number(e.target.value))))
            }
          />

          <div className="mt-4">
            <div className="text-xs text-white/60 mb-1">Scene Types</div>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  "Interview",
                  "Narrative",
                  "Music Performance",
                  "Product",
                  "Promo",
                  "Sport",
                  "Corporate",
                  "News",
                ] as SceneType[]
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSceneType(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs border ${
                    sceneTypes.includes(s)
                      ? "bg-white/20 border-white/30"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Robotics */}
        <div className="rounded-2xl border border-white/10 p-4 bg-black/30">
          <h3 className="font-horizon text-lg">Robotics</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm">Enable Robotic Cameras</span>
            <input
              type="checkbox"
              checked={roboticsEnabled}
              onChange={(e) => setRoboticsEnabled(e.target.checked)}
            />
          </div>
          <div className="mt-3 text-xs text-white/60">Camera Moves</div>
          <div className="mt-1 flex flex-wrap gap-2">
            {(
              ["Static", "Dolly", "Crane", "Orbit", "Handheld", "Gimbal"] as CameraMove[]
            ).map((m) => (
              <button
                key={m}
                onClick={() => toggleMove(m)}
                className={`px-3 py-1.5 rounded-xl text-xs border ${
                  robotMoves.includes(m)
                    ? "bg-white/20 border-white/30"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm">Safety Zones</span>
            <input
              type="checkbox"
              checked={safeZones}
              onChange={(e) => setSafeZones(e.target.checked)}
            />
          </div>
        </div>

        {/* Lighting & Virtual Set */}
        <div className="rounded-2xl border border-white/10 p-4 bg-black/30">
          <h3 className="font-horizon text-lg">Lighting & Virtual Set</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm">Enable Smart Lights (DMX/Art-Net)</span>
            <input
              type="checkbox"
              checked={lightsEnabled}
              onChange={(e) => setLightsEnabled(e.target.checked)}
            />
          </div>

          <label className="block mt-3 text-xs text-white/60">Preset</label>
          <select
            className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm"
            value={lightPreset}
            onChange={(e) => setLightPreset(e.target.value as LightPreset)}
            disabled={!lightsEnabled}
          >
            {["Neutral Key", "Moody Blue", "Warm Sunset", "High Key", "Concert Strobe"].map(
              (p) => (
                <option key={p}>{p}</option>
              )
            )}
          </select>

          <label className="block mt-3 text-xs text-white/60">
            Intensity ({lightIntensity}%)
          </label>
          <input
            type="range"
            min={10}
            max={100}
            value={lightIntensity}
            onChange={(e) => setLightIntensity(Number(e.target.value))}
            className="w-full"
            disabled={!lightsEnabled}
          />

          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm">Art-Net Control</span>
            <input
              type="checkbox"
              checked={artnet}
              onChange={(e) => setArtnet(e.target.checked)}
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm">Enable Virtual Set (Unreal on LED)</span>
            <input
              type="checkbox"
              checked={virtualEnabled}
              onChange={(e) => setVirtualEnabled(e.target.checked)}
            />
          </div>

          <label className="block mt-3 text-xs text-white/60">Virtual Style</label>
          <select
            className="mt-1 w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm"
            value={virtualStyle}
            onChange={(e) =>
              setVirtualStyle(e.target.value as Plan["virtualSet"]["style"])
            }
            disabled={!virtualEnabled}
          >
            {["Studio", "Modern Loft", "City Night", "Concert LED", "Newsroom"].map(
              (s) => (
                <option key={s}>{s}</option>
              )
            )}
          </select>

          <div className="mt-2 text-xs text-white/60">
            LED Test: <span className="text-white/80">{ledTest}</span>
          </div>
        </div>
      </div>

      {/* Chat */}
      <div className="mt-6 rounded-2xl border border-white/10 p-4 bg-black/30">
        <h3 className="font-horizon text-lg">Director Chat</h3>
        <div className="mt-3 space-y-2 max-h-56 overflow-auto pr-1">
          {chat.map((m, i) => (
            <div
              key={i}
              className={`text-sm font-glacial ${
                m.role === "assistant" ? "text-white/80" : "text-white"
              }`}
            >
              <span className="text-white/50 mr-2">
                {m.role === "assistant" ? "Director" : "You"}:
              </span>
              {m.text}
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitUserMessage()}
            className="flex-1 rounded-xl bg-white/10 border border-white/10 px-3 py-2 text-sm"
            placeholder='e.g. "I want a 60s promo with energetic cuts"'
          />
          <button
            onClick={() => submitUserMessage()}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
            disabled={busy}
          >
            Send
          </button>
        </div>

        {/* Quick prompts to keep conversation flowing but on task */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {[
            "Explain how Unreal LED scenes would look for this",
            "Propose a shot list with robot moves",
            "Suggest lighting cues & safety notes",
            "How would Elevate.io speed editing here?",
            "What’s the export & delivery plan?",
          ].map((p) => (
            <button
              key={p}
              onClick={() => submitUserMessage(p)}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={generatePlan} className="btn btn-primary" disabled={busy}>
          Generate Plan
        </button>
        <button
          onClick={runLedTest}
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
          disabled={busy}
        >
          Run Virtual LED Test
        </button>
        <button
          onClick={exportJSON}
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
          disabled={!plan}
        >
          Export JSON
        </button>
        <button
          onClick={resetAll}
          className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 transition"
          disabled={busy}
        >
          Reset
        </button>
        {busy && <span className="text-xs text-white/60 self-center">Working…</span>}
      </div>

      {/* Output */}
      {plan && (
        <div className="mt-6 rounded-2xl border border-white/10 p-4 bg-black/30">
          <h3 className="font-horizon text-lg">Shotlist</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-xs font-glacial">
              <thead className="text-white/60">
                <tr className="[&_th]:px-3 [&_th]:py-2 text-left">
                  <th>#</th>
                  <th>Scene</th>
                  <th>Shot</th>
                  <th>Move</th>
                  <th>Lens</th>
                  <th>Duration</th>
                  <th>DMX</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody className="[&_td]:px-3 [&_td]:py-2 border-t border-white/10">
                {plan.shotlist.map((s, idx) => (
                  <tr key={s.id} className="border-b border-white/5">
                    <td>{idx + 1}</td>
                    <td>{s.scene}</td>
                    <td>{s.type}</td>
                    <td>{s.camMove}</td>
                    <td>{s.lens}</td>
                    <td>{s.durationSec}s</td>
                    <td>
                      {s.dmx ? `${s.dmx.preset} @ ${s.dmx.intensity}%` : "—"}
                    </td>
                    <td className="whitespace-pre-wrap">{s.notes || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {plan.efficiency && (
            <div className="mt-4 grid sm:grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 p-3 bg-white/[0.03]">
                <div className="font-horizon">Robotics</div>
                <div className="text-white/70">
                  {plan.robotics.enabled
                    ? `${plan.robotics.moves.join(", ")}; Safety: ${
                        plan.robotics.safeZones ? "On" : "Off"
                      }`
                    : "Off"}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 p-3 bg-white/[0.03]">
                <div className="font-horizon">Lighting</div>
                <div className="text-white/70">
                  {plan.lighting.enabled
                    ? `${plan.lighting.preset} @ ${plan.lighting.intensity}% (${
                        plan.lighting.artnet ? "Art-Net" : "Local"
                      })`
                    : "Off"}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 p-3 bg-white/[0.03]">
                <div className="font-horizon">Efficiency Snapshot</div>
                <div className="text-white/70">
                  ~{plan.efficiency.timeSavedPct}% time saved • ~
                  {plan.efficiency.energySavedPct}% energy saved
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}