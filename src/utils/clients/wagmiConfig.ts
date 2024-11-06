"use client";

import { createConfig, http, createStorage, cookieStorage } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const wagmiConfig = createConfig({
  ssr: true,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
