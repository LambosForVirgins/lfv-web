import { JupiterPricingResponse, TokenMint } from "../types";

export const getMarketQuotes = async (
  tokens: TokenMint[]
): Promise<JupiterPricingResponse> => {
  const url = new URL("https://birdeye-proxy.jup.ag/codex/getTokenPrices");
  url.searchParams.set("list_address", tokens.join(","));

  return (await fetch(url).then((res) => res.json())) as JupiterPricingResponse;
};
