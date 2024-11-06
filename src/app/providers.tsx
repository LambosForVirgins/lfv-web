"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { queryClient } from "../utils/clients/queryClient";
import { wagmiConfig } from "../utils/clients/wagmiConfig";

export const Web3Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
