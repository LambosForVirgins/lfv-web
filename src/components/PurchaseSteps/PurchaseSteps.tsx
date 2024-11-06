"use client";

import { createElement, useEffect, useMemo, useState } from "react";
import { type Adapter } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import clsx from "classnames";

const MINIMUM_TOKEN_PRICE = 0;

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

const isInstalled = ({ readyState }: Adapter) => readyState === "Installed";

export const PurchaseSteps = ({ testID }: Common.ComponentProps) => {
  const [balance, setBalance] = useState(0);

  const { connection } = useConnection();
  const { publicKey, connected, wallets } = useWallet();

  const shouldInstall = useMemo(
    () => !wallets.some((wallet) => wallet.readyState === "Installed"),
    [wallets]
  );

  const connectAdapter = (adapter: Adapter) => async () => {
    await adapter.connect();
  };

  useEffect(() => {
    const getWalletBalance = async () => {
      if (!publicKey) {
        setBalance(0);
        return;
      }

      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    };

    getWalletBalance();
  }, [publicKey, connection]);

  return (
    <ol className="instruct text-2xl">
      <li>
        <span data-testid={testID} className="flex flex-col gap-4">
          <span className={clsx(connected && "line-through")}>
            {shouldInstall
              ? "Get one of the wallets below"
              : "Choose your wallet below"}
          </span>
          <span className="col-span-2 flex gap-4 items-center">
            {wallets.map(({ adapter }) =>
              createElement(
                isInstalled(adapter) ? "button" : "a",
                {
                  key: adapter.name,
                  target: "_blank",
                  onClick: isInstalled(adapter) && connectAdapter(adapter),
                  href: !isInstalled(adapter) && adapter.url,
                },
                <img
                  src={adapter.icon}
                  alt={adapter.name}
                  width={64}
                  height={64}
                />
              )
            )}
          </span>
        </span>
      </li>
      <li>
        <span className={clsx(balance > MINIMUM_TOKEN_PRICE && "line-through")}>
          {balance >= MINIMUM_TOKEN_PRICE
            ? "Buy some Solana"
            : `Buy ${MINIMUM_TOKEN_PRICE - balance} more Solana`}
        </span>
      </li>
      <li>
        {balance > 0 && connected ? (
          <span className="flex flex-col gap-4">
            <span>Buy $LFV and get Lambo</span>
            <span className="col-span-2 flex gap-4 items-center">
              {MARKETS.map((market) => (
                <a key={market.key} href={market.href}>
                  <img src={market.src} width={62} height={62} />
                </a>
              ))}
            </span>
          </span>
        ) : (
          <span>Buy $LFV and get Lambo</span>
        )}
      </li>
    </ol>
  );
};
