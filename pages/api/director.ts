import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const { prompt = "" } = req.body || {};
  const p = String(prompt).toLowerCase();

  // Tiny heuristic to tailor the stubbed plan
  let mood = "balanced";
  if (p.includes("moody") || p.includes("noir")) mood = "moody";
  if (p.includes("upbeat") || p.includes("energetic")) mood = "upbeat";
  if (p.includes("corporate")) mood = "corporate";

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
        : ["Studio cyc", "Hallway", "Close-up station"],
    shots:
      mood === "moody"
        ? ["Silhouette intro", "Slow push-in", "Neon reflections close-ups"]
        : ["Open wide", "Push-in on subject", "Cut to product close-ups"]
  };

  const reply =
    `Here’s a ${mood} plan based on your prompt. You can ask me to adjust lighting, camera movement, or pacing.`;

  return res.status(200).json({ ok: true, reply, plan });
}