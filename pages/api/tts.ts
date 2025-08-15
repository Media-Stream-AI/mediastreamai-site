import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: { sizeLimit: "1mb" },
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { text, voice = "verse" } = req.body || {};
  const apiKey = process.env.OPENAI_API_KEY;

  // If no key, signal widget to fall back to browser TTS
  if (!apiKey) return res.status(204).end();

  try {
    // Lazy import to avoid type issues if SDK changes
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const OpenAI = require("openai");
    const client = new OpenAI({ apiKey });

    // Newer SDKs: audio.speech.create({ model, voice, input })
    const audio = await client.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
    });

    const buffer = Buffer.from(await audio.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(buffer);
  } catch (e) {
    // Any error → let widget fall back gracefully
    return res.status(204).end();
  }
}