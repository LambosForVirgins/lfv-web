"use client";

import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { getEnvironmentEndpoint } from "@/src/utils/config/getEnvironmentEndpoint";

const buildEnvironment = process.env.VERCEL_ENV || "development";

const endpoint = getEnvironmentEndpoint(buildEnvironment);

const wallets = [
  new walletAdapterWallets.PhantomWalletAdapter(),
  new walletAdapterWallets.SolflareWalletAdapter(),
  new walletAdapterWallets.TrustWalletAdapter(),
];

export const SolanaProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
