import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { LFVTokenMint, SolanaTokenMint } from "../tokens";
import { InputToken, OutputToken } from "./types";
import { JupiterQuoteResponse } from "../types";

/**
 *
 * @param inputAmount The amount of Solana (SOL) to swap for LFV
 * @returns
 */
export const getSwapQuote = async (
  inputAmount: number
): Promise<JupiterQuoteResponse<InputToken, OutputToken>> => {
  const url = new URL("/quote", "https://public.jupiterapi.com");
  url.searchParams.set("inputMint", SolanaTokenMint);
  url.searchParams.set("outputMint", LFVTokenMint);
  url.searchParams.set(
    "amount",
    Math.round(inputAmount * LAMPORTS_PER_SOL).toString()
  );
  url.searchParams.set("slippageBps", "50");

  const quoteResponse = (await fetch(url).then((res) =>
    res.json()
  )) as JupiterQuoteResponse<InputToken, OutputToken>;

  return quoteResponse;
};
