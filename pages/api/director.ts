import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  if (!process.env.OPENAI_API_KEY) return res.status(501).json({ error: "Server missing OPENAI_API_KEY" });

  try {
    const { message, history = [] } = req.body || {};
    const system = `
You are Media Stream AI’s Virtual Director for an AI-powered virtual production studio.
Goal: help users shape creative shoots (music video, corporate, commercial) using Unreal Engine sets, LED wall looks, and robotic camera moves.
Style: concise, upbeat, highly practical. Max ~55 words per turn. Always end with ONE clear question that moves the plan forward.
Safety: do NOT claim to actually render/build assets or control hardware in this prototype—only propose options and next steps.
If the user chooses a direction, summarize choices in 1 crisp sentence, then ask a next decision-making question.
`;
    const prior = history.map((h: any) => `${h.who}: ${h.text}`).join("\n");
    const userInput = `${prior ? prior + "\n" : ""}You: ${message}`;

    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: [{ type: "input_text", text: system }] },
        { role: "user", content: [{ type: "input_text", text: userInput }] },
      ],
    });

    // @ts-ignore – output_text is helper on Responses SDK
    const reply = resp.output_text?.trim?.() || "Let’s pick a direction. Music video, corporate, or commercial?";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(200).json({ reply: "I’ll keep it simple—start with Unreal Engine sets or LED wall looks?" });
  }
}