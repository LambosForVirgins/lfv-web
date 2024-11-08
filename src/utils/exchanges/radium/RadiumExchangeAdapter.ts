import { ExchangeAdapter, type ExchangeName } from "../ExchangeAdapter";
import { LFVTokenMint } from "../tokens";

const RaydiumExchangeName = "Raydium" as ExchangeName<"Raydium">;

class RaydiumExchangeAdapter extends ExchangeAdapter {
  name = RaydiumExchangeName;
  url = `https://raydium.io/swap/?inputMint=sol&outputMint=${LFVTokenMint}`;
  icon = "/images/raydium.png";
}

export const createRaydiumAdapter = () => new RaydiumExchangeAdapter();
