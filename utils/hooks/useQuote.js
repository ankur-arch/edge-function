const { useEffect, useState, useCallback } = require("react");

const getQuote = async (cached) => {
  const result = await fetch(
    cached
      ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/quote-upstash`
      : `https://${process.env.NEXT_PUBLIC_DOMAIN}/api/quote`
  );
  const item = await result.json();

  return item.quote;
};

export const useQuote = (cached) => {
  const [quote, setQuote] = useState(null);

  const changeQuote = useCallback(async () => {
    setQuote(() => null);
    getQuote(cached).then((d) => setQuote(() => d));
  }, [cached]);

  useEffect(() => {
    getQuote(cached).then((d) => setQuote(d));
  }, [cached]);

  return [quote, changeQuote];
};
