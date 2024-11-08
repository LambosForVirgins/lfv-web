import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { LFVTokenMint, SolanaTokenMint } from "../tokens";
import { InputToken, OutputToken } from "./types";
import { RadiumQuoteResponse } from "./types";

const BASE_URL = new URL("https://transaction-v1.raydium.io");

export const getSwapQuote = async (
  inputAmount: number
): Promise<RadiumQuoteResponse<InputToken, OutputToken>> => {
  const url = new URL("/compute/swap-base-in", BASE_URL);
  url.searchParams.set("inputMint", SolanaTokenMint);
  url.searchParams.set("outputMint", LFVTokenMint);
  url.searchParams.set("amount", (inputAmount * LAMPORTS_PER_SOL).toString());
  url.searchParams.set("slippageBps", "50");
  url.searchParams.set("txVersion", "Vo");

  const quoteResponse = (await fetch(url).then((res) =>
    res.json()
  )) as RadiumQuoteResponse<InputToken, OutputToken>;

  return quoteResponse;
};
