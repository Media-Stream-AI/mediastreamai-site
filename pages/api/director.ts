// pages/api/director.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Placeholder endpoint to satisfy build
  res.status(200).json({
    ok: true,
    message: "AI Director API is not connected yet."
  });
}