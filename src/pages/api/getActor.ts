import TmdbApi from "../../structures/handler";

// Types
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req;

  const id = query.id as string;

  res.status(200).json(await TmdbApi.getActor(id));
}
