import TmdbApi from "../../structures/handler";

// Types
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;

  const id = query.id as string;
  const type = query.type as "movie" | "tv";

  if (!id || !type) {
    res.status(400).json({ error: "No :id or :type provided" });
  }

  res.status(200).json(await TmdbApi.getInfo(id, type));
}
