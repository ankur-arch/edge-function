import { Redis } from "@upstash/redis";
import { database } from "../../../utils/database";

export const config = {
  runtime: "edge",
};

export default async function handler(req, res) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const cachedCount = await redis.get("count");

  const count = !cachedCount ? await database.quote.count() : +cachedCount;

  if (!cachedCount) {
    await redis.set("count", count);
  }

  const randomIndex = Math.floor(Math.random() * count);

  const cachedQuote = await redis.get(`item-${randomIndex}`);

  if (cachedQuote) {
    return new Response(JSON.stringify({ quote: cachedQuote }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const randomQuote = await database.quote.findFirst({
    skip: randomIndex,
  });

  await redis.set(`item-${randomIndex}`, randomQuote.quote);

  return new Response(JSON.stringify({ quote: randomQuote.quote }), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
