import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type HistoryItem = { who: "You" | "Assistant"; text: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Allow only JSON POST
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });
  if (!process.env.OPENAI_API_KEY) return res.status(501).json({ error: "Server missing OPENAI_API_KEY" });

  try {
    // Accept JSON body: { message: string, history?: { who: "You"|"Assistant", text: string }[] }
    const { message, history = [] } = (req.body ?? {}) as {
      message?: string;
      history?: HistoryItem[];
    };

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Missing 'message' string in body" });
    }

    const system = `
You are Media Stream AI’s Virtual Director for an AI-powered virtual production studio.
Goal: help users shape creative shoots (music video, corporate, commercial) using Unreal Engine sets, LED wall looks, and robotic camera moves.
Style: concise, upbeat, highly practical. Max ~55 words per turn. Always end with ONE clear question that moves the plan forward.
Safety: do NOT claim to actually render/build assets or control hardware in this prototype—only propose options and next steps.
If the user chooses a direction, summarize choices in 1 crisp sentence, then ask a next decision-making question.
`.trim();

    const prior = Array.isArray(history)
      ? history
          .map((h) => `${h?.who ?? "You"}: ${typeof h?.text === "string" ? h.text : ""}`.trim())
          .filter(Boolean)
          .join("\n")
      : "";

    const userInput = `${prior ? prior + "\n" : ""}You: ${message}`.trim();

    // For maximum compatibility, send a single string "input" (the Responses API supports this),
    // then use the `output_text` helper to extract the text.
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: `SYSTEM:\n${system}\n\nDIALOGUE:\n${userInput}`
    });

    // The SDK exposes a convenience getter for plain text
    // If unavailable for any reason, provide a safe fallback.
    // @ts-ignore - output_text is an SDK helper
    const reply: string =
      (resp as any).output_text?.trim?.() ||
      "Let’s pick a direction. Music video, corporate, or commercial?";

    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error("director API error:", err?.message || err);
    // Keep a friendly fallback response
    return res
      .status(200)
      .json({ reply: "I’ll keep it simple—start with Unreal Engine sets or LED wall looks?" });
  }
}

// (Optional) If you ever need larger payloads, uncomment and adjust:
// export const config = { api: { bodyParser: { sizeLimit: "1mb" } } };