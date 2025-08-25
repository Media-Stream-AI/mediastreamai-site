// app/api/director/route.ts
export const runtime = "edge";

type ChatMsg = { role: "user" | "assistant"; content: string };
type Context = {
  videoType?: string;
  scenes?: number;
  sceneTypes?: string[];
  roboticsEnabled?: boolean;
  robotMoves?: string[];
  safeZones?: boolean;
  lightsEnabled?: boolean;
  lightPreset?: string;
  lightIntensity?: number;
  artnet?: boolean;
  virtualEnabled?: boolean;
  virtualStyle?: string;
  ledTest?: string;
};

export async function POST(req: Request) {
  try {
    const { messages = [], context = {} as Context } = await req.json();

    // Guard
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY missing on server" }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }

    // Steering prompt keeps the Director on topic but conversational.
    const system = `
You are **AI Director** for an autonomous virtual production studio.
Stay helpful, friendly, and **on task**: planning and explaining productions that use:
- **Unreal Engine** to build LED wall worlds and test them on the volume
- **Robotic camera arm** (precise moves: Static, Dolly, Crane, Orbit, Gimbal)
- **Smart Lights** via DMX/Art-Net (presets: Neutral Key, Moody Blue, Warm Sunset, High Key, Concert Strobe)
- **Real-time editing** with **Elevate.io** (browser NLE) for quick selects & assembly
- **Export & delivery** to a **Human Creative Slate**. Always say you “love working with human creativity—automation saves time + energy.”

Behavior:
- Ask clarifying questions, remember the brief, propose shot lists & lighting cues.
- Teach briefly: how Unreal scenes map to the LED wall, when to run LED tests (moire/parallax), and how robotics & lights coordinate.
- Keep safety top-of-mind (safe zones, speed limits for robot moves).
- Use concise paragraphs and bullet lists.

When appropriate, include a short *“Efficiency Snapshot”*:
- Time saved: 25–60% depending on robotics/lights/virtual enabled.
- Energy saved: 15–40% depending on LED test + optimized lighting.
Tailor numbers to the given context JSON.
`;

    // Build user tail with context snapshot to ground the reply.
    const ctx = (context && Object.keys(context).length)
      ? `\n\nContext:\n${JSON.stringify(context, null, 2)}`
      : "";

    const body = {
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        ...messages as ChatMsg[],
        {
          role: "user",
          content:
            "Continue as AI Director. Keep the conversation free-flowing but on production tasks." + ctx,
        },
      ],
      temperature: 0.7,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!r.ok) {
      const errTxt = await r.text().catch(() => "Unknown error");
      return new Response(JSON.stringify({ error: errTxt }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    const data = (await r.json()) as any;
    const reply =
      data?.choices?.[0]?.message?.content ??
      "I’m here—tell me what you’d like to create and I’ll plan it.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}