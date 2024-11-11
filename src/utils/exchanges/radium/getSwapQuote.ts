import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { VIRGINTokenMint, SolanaTokenMint } from "../tokens";
import { InputToken, OutputToken, RadiumTxVersion } from "./types";
import { RadiumQuoteResponse } from "./types";

export const getSwapQuote = async (
  inputAmount: number
): Promise<RadiumQuoteResponse<InputToken, OutputToken>> => {
  const url = new URL("https://transaction-v1.raydium.io/compute/swap-base-in");
  url.searchParams.set("inputMint", SolanaTokenMint);
  url.searchParams.set("outputMint", VIRGINTokenMint);
  url.searchParams.set("amount", (inputAmount * LAMPORTS_PER_SOL).toString());
  url.searchParams.set("slippageBps", "50");
  url.searchParams.set("txVersion", RadiumTxVersion.Version0);

  const quoteResponse = (await fetch(url).then((res) =>
    res.json()
  )) as RadiumQuoteResponse<InputToken, OutputToken>;

  return quoteResponse;
};
