import { createJupiterAdapter } from "./jupiter/JupiterExchangeAdapter";
import { createRaydiumAdapter } from "./raydium/RaydiumExchangeAdapter";

const exchanges = [createRaydiumAdapter(), createJupiterAdapter()];

export const useExchange = () => {
  return {
    exchanges,
  };
};
