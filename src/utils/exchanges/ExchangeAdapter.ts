const MARKETS = [
  {
    key: "jupiter",
    src: "/images/jupiter.png",
    label: "Jupiter Marketplace",
    href: "https://jup.ag/",
  },
  {
    key: "raydium",
    src: "/images/raydium.png",
    label: "Raydium Marketplace",
    href: "https://raydium.io/swap/",
  },
];

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
  url = "https://jup.ag/";
  icon = "/images/jupiter.png";
}

class RaydiumExchangeAdapter extends ExchangeAdapter {
  name = RaydiumExchangeName;
  url = "https://raydium.io/swap/";
  icon = "/images/raydium.png";
}

export const createRaydiumAdapter = () => new RaydiumExchangeAdapter();
export const createJupiterAdapter = () => new JupiterExchangeAdapter();