import { PublicKey } from "@solana/web3.js";

import { JupiterQuoteResponse } from "../types";
import { InputToken, OutputToken } from "./types";

export const createSwapTransaction = async (
  quoteResponse: JupiterQuoteResponse<InputToken, OutputToken>,
  publicKey: PublicKey
): Promise<string> => {
  const url = new URL("https://quote-api.jup.ag/v6/swap");

  const { swapTransaction } = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quoteResponse,
      userPublicKey: publicKey?.toString(),
      wrapAndUnwrapSol: true,
    }),
  }).then((res) => res.json());

  console.log(swapTransaction);
  return swapTransaction;
};
