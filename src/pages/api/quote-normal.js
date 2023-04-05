import { database } from "../../../utils/database";

export default async function handler(req, res) {
  const count = await database.quote.count();

  const randomIndex = Math.floor(Math.random() * count);

  const randomQuote = await database.quote.findFirst({
    skip: randomIndex,
  });

  return res.status(200).json({ quote: randomQuote.quote });
}
