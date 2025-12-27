let cachedPrice: number | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 300000; // 5 minutes

export const fetchBitcoinPrice = async (): Promise<number | null> => {
  const now = Date.now();
  if (cachedPrice && (now - lastFetchTime < CACHE_TTL)) {
    return cachedPrice;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error("Price fetch failed");
    
    const data = await response.json();
    cachedPrice = data.bitcoin.usd;
    lastFetchTime = now;
    return cachedPrice;
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    return cachedPrice; // Return stale cache on error
  }
};
