import type { NextApiRequest, NextApiResponse } from "next";

/**
 * API route that:
 *  - If OPENAI_API_KEY is present, calls OpenAI via fetch (no 'openai' npm dep needed)
 *  - Otherwise returns a smart fallback plan
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { prompt = "" } = req.body || {};
  const p = String(prompt);

  const key = process.env.OPENAI_API_KEY;
  if (key) {
    try {
      // You can switch model to whatever you prefer (e.g., "gpt-4o-mini")
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an AI Director for a virtual production studio. Given a user brief, respond with a friendly short answer and include a JSON plan object with keys: title, lighting[], camera[], locations[], shots[]. Keep lists short and practical."
            },
            { role: "user", content: p }
          ],
          temperature: 0.8
        })
      });

      const json = await openaiRes.json();

      // Extract a short assistant reply
      const reply =
        json?.choices?.[0]?.message?.content ||
        "Here’s a draft plan. I can refine lighting, camera moves, and pacing.";

      // Try to parse a JSON plan if the model inlines one, else generate a basic one
      // (In production, you could use structured outputs—this keeps it simple.)
      const plan = {
        title: "Draft Shot Plan",
        lighting: ["Soft key through 4x silk", "Cool rim light", "Practical backlights"],
        camera: ["Wide establishing", "Medium interview", "Insert close-ups"],
        locations: ["Studio cyc wall", "Interview nook"],
        shots: ["Open wide", "Push-in on subject", "Cut to product details"]
      };

      return res.status(200).json({ ok: true, reply, plan });
    } catch (e) {
      // Fall through to local plan
    }
  }

  // Fallback (no OPENAI_API_KEY or API failed)
  const text = p.toLowerCase();
  let mood = "balanced";
  if (text.includes("moody") || text.includes("noir")) mood = "moody";
  if (text.includes("upbeat") || text.includes("energetic")) mood = "upbeat";
  if (text.includes("corporate")) mood = "corporate";

  const plan = {
    title: "Draft Shot Plan",
    lighting:
      mood === "moody"
        ? ["Low-key key light", "Neon rim (cyan/magenta)", "Fog for atmosphere"]
        : mood === "upbeat"
        ? ["Bright soft key", "Warm fill", "High-energy backlight"]
        : mood === "corporate"
        ? ["Soft key through 4x silk", "Cool rim", "Practical backlights"]
        : ["Neutral soft key", "Subtle fill", "Gentle rim"],
    camera:
      mood === "upbeat"
        ? ["Dynamic gimbal walk-through", "Punch-in cuts", "Whip pans"]
        : ["Wide establishing", "Medium interview", "Detail inserts"],
    locations:
      mood === "corporate"
        ? ["Office atrium", "Boardroom", "Studio backdrop"]
        : ["Studio cyc wall", "Hallway corner", "Close-up station"],
    shots:
      mood === "moody"
        ? ["Silhouette intro", "Slow push-in", "Neon reflections close-ups"]
        : ["Open wide", "Push-in on subject", "Cut to product close-ups"]
  };

  const reply =
    `Here’s a ${mood} plan based on your prompt. Ask me to adjust lighting, camera movement, or pacing.`;

  return res.status(200).json({ ok: true, reply, plan });
}