import { TokenMint } from "../types";
import { RadiumPricingResponse } from "./types";

enum RadiumTokenTag {
  Listed = "lst",
  Community = "community",
}

export const getMarketQuotes = async (
  tokens: TokenMint[]
): Promise<RadiumPricingResponse> => {
  const tags = [RadiumTokenTag.Listed, RadiumTokenTag.Community];
  const url = new URL("https://tokens.jup.ag/tokens");
  url.searchParams.set("tags", tags.join(","));

  return (await fetch(url).then((res) => res.json())) as RadiumPricingResponse;
};
