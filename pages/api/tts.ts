// pages/api/tts.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { text, voice = "alloy" } = req.body as { text?: string; voice?: string };
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing 'text' string in body" });
    }

    // No `format` here — the SDK returns audio/mpeg by default.
    const audio = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
    });

    const buffer = Buffer.from(await audio.arrayBuffer());

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", buffer.length.toString());
    res.status(200).send(buffer);
  } catch (err: any) {
    console.error("[/api/tts] error:", err?.message || err);
    res.status(500).json({ error: "TTS failed" });
  }
}