import TmdbApi from "../../structures/handler";

// Types
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestQuery = req.query;
  const query = requestQuery.query as string;

  if (!query) res.status(400).json({ error: "No :query provided" });
  res.status(200).json(await TmdbApi.query(query));
}
