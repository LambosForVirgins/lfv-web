"use client";

import * as web3 from "@solana/web3.js";
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import * as walletAdapterReact from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// TODO: This should be dynamic based on the network
const endpoint = web3.clusterApiUrl("devnet");

const wallets = [
  new walletAdapterWallets.PhantomWalletAdapter(),
  new walletAdapterWallets.SolflareWalletAdapter(),
  new walletAdapterWallets.TrustWalletAdapter(),
];

export const Web3Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <walletAdapterReact.ConnectionProvider endpoint={endpoint}>
      <walletAdapterReact.WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </walletAdapterReact.WalletProvider>
    </walletAdapterReact.ConnectionProvider>
  );
};
