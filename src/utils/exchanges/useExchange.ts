import { createJupiterAdapter } from "./jupiter/JupiterExchangeAdapter";
import { createRaydiumAdapter } from "./radium/RadiumExchangeAdapter";

const exchanges = [createRaydiumAdapter(), createJupiterAdapter()];

export const useExchange = () => {
  return {
    exchanges,
  };
};
