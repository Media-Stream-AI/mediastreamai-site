import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export const config = { api: { responseLimit: false } };

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  if (!process.env.OPENAI_API_KEY) return res.status(501).json({ error: "Server missing OPENAI_API_KEY" });

  try {
    const { text, voice = "alloy" } = req.body || {};
    if (!text || typeof text !== "string") return res.status(400).json({ error: "Missing text" });

    const audio = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
      format: "mp3",
    });

    const buffer = Buffer.from(await audio.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    res.status(200).send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "TTS error" });
  }
}