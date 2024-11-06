import { createRaydiumAdapter, createJupiterAdapter } from "./ExchangeAdapter";

const exchanges = [createRaydiumAdapter(), createJupiterAdapter()];

export const useExchange = () => {
  return {
    exchanges,
  };
};
