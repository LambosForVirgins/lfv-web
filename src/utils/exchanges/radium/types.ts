import { VIRGINTokenMint, SolanaTokenMint } from "../tokens";

export type InputToken = typeof SolanaTokenMint;
export type OutputToken = typeof VIRGINTokenMint;

export enum RadiumTxVersion {
  Version0 = "V0",
  Version1 = "V1",
}

export enum RaydiumQuoteErrorCode {
  RouteNotFound = "ROUTE_NOT_FOUND",
}

interface RadiumTokenPrice {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  tags: Tags[];
  daily_volume: number;
  created_at: string;
  freeze_authority: string | null;
  mint_authority: string | null;
  permanent_delegate: string | null;
  minted_at: string;
  extensions: {
    coingeckoId: string;
  };
}

type Tags = "verified" | "community";

export type RadiumPricingResponse = RadiumTokenPrice[];

type RadiumSwapType = "BaseIn" | "BaseOut";

export interface RadiumQuoteResponse<InputToken, OutputToken> {
  id: string;
  success: boolean;
  version: string;
  data: {
    /**
     * 'BaseOut' swaps will get you a quote for the ExactOut
     * amount of token received. In this mode, slippage is
     * inputted to the base token.
     */
    swapType: RadiumSwapType;
    inputMint: InputToken;
    inputAmount: string;
    outputMint: OutputToken;
    outputAmount: string;
    otherAmountThreshold: string;
    slippageBps: number;
    priceImpactPct: number;
    referrerAmount: string;
    routePlan: [
      {
        poolId: string;
        inputMint: InputToken;
        outputMint: OutputToken;
        feeMint: InputToken;
        feeRate: number;
        feeAmount: string;
        remainingAccounts: string[];
        lastPoolPriceX64: string;
      },
    ];
  };
}

export enum RadiumPricingFee {
  VeryHighPriority = "3000000",
  HighPriority = "2000000",
  MediumPriority = "1000000",
}

export interface RadiumSwapRequest<InputToken, OutputToken> {
  computeUnitPriceMicroLamports: string;
  swapResponse: RadiumQuoteResponse<InputToken, OutputToken>;
  txVersion: string;
  wallet: string;
  wrapSol: boolean;
  unwrapSol: boolean; // true means output mint receive sol, false means output mint received wsol
  inputAccount: InputToken;
  outputAccount: OutputToken;
}

export interface RadiumSwapResponse {
  id: string;
  version: RadiumTxVersion;
  success: boolean;
  data: [
    {
      transaction: string;
    },
  ];
}

export interface RaydiumQuoteError {
  id: string;
  success: boolean;
  version: RadiumTxVersion;
  msg: RaydiumQuoteErrorCode;
}
