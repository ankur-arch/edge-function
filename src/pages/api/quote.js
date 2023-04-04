import { database } from "../../../utils/database";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  const count = await database.quote.count();

  const randomIndex = Math.floor(Math.random() * count);

  const randomQuote = await database.quote.findFirst({
    skip: randomIndex,
  });

  return new Response(JSON.stringify({ quote: randomQuote.quote }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
