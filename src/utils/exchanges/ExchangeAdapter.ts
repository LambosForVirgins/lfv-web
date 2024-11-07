import { Brand } from "../config/Brand";

type ExchangeName<T extends string = string> = T;

const JupiterExchangeName = "Jupiter" as ExchangeName<"Jupiter">;
const RaydiumExchangeName = "Raydium" as ExchangeName<"Raydium">;

abstract class ExchangeAdapter {
  abstract readonly name: ExchangeName;
  abstract readonly url: string;
  abstract readonly icon: string;
}

class JupiterExchangeAdapter extends ExchangeAdapter {
  name = JupiterExchangeName;
  url = `https://jup.ag/swap/SOL-${Brand.contractAddress}`;
  icon = "/images/jupiter.png";
}

class RaydiumExchangeAdapter extends ExchangeAdapter {
  name = RaydiumExchangeName;
  url = `https://raydium.io/swap/?inputMint=sol&outputMint=${Brand.contractAddress}`;
  icon = "/images/raydium.png";
}

export const createRaydiumAdapter = () => new RaydiumExchangeAdapter();
export const createJupiterAdapter = () => new JupiterExchangeAdapter();
