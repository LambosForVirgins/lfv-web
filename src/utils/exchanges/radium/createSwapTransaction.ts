import { PublicKey } from "@solana/web3.js";

import { RadiumQuoteResponse } from "./types";
import { InputToken, OutputToken } from "./types";
import { LFVTokenMint, SolanaTokenMint } from "../tokens";

const BASE_URL = new URL("https://api-v3.raydium.io");

interface SwapInput<InputToken, OutputToken> {
  computeUnitPriceMicroLamports: string;
  swapResponse: RadiumQuoteResponse<InputToken, OutputToken>;
  txVersion: string;
  wallet: string;
  wrapSol: boolean;
  unwrapSol: boolean; // true means output mint receive sol, false means output mint received wsol
  inputAccount: InputToken;
  outputAccount: OutputToken;
}

export const createSwapTransaction = async (
  quoteResponse: RadiumQuoteResponse<InputToken, OutputToken>,
  publicKey: PublicKey
): Promise<string> => {
  const url = new URL("/transaction", BASE_URL);

  const { swapTransaction } = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      swapResponse: quoteResponse,
      txVersion: "V0",
      wallet: publicKey.toBase58(),
      wrapSol: false,
      unwrapSol: false,
      inputAccount: SolanaTokenMint,
      outputAccount: LFVTokenMint,
    } as SwapInput<InputToken, OutputToken>),
  }).then((res) => res.json());

  console.log(swapTransaction);
  return swapTransaction;
};
