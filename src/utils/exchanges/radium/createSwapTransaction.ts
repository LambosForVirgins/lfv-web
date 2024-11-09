import { PublicKey } from "@solana/web3.js";

import {
  RadiumQuoteResponse,
  RadiumSwapRequest,
  RadiumSwapResponse,
  RadiumTxVersion,
} from "./types";
import { InputToken, OutputToken } from "./types";

export const createSwapTransaction = async (
  quoteResponse: RadiumQuoteResponse<InputToken, OutputToken>,
  publicKey: PublicKey
): Promise<string> => {
  const url = new URL(
    "https://transaction-v1.raydium.io/transaction/swap-base-in"
  );

  const response = (await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      computeUnitPriceMicroLamports: "1722351",
      swapResponse: quoteResponse,
      txVersion: RadiumTxVersion.Version0,
      wallet: publicKey.toBase58(),
      wrapSol: true,
      unwrapSol: false,
    } as RadiumSwapRequest<InputToken, OutputToken>),
  }).then((res) => res.json())) as RadiumSwapResponse;

  return response.data[0].transaction;
};
