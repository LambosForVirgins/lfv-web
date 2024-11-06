"use client";

import {
  type Adapter,
  type WalletReadyState,
} from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { createElement, useMemo } from "react";
import clsx from "classnames";

const isInstalled = ({ readyState }: Adapter) => readyState === "Installed";

export const ConnectionButton = ({ testID }: Common.ComponentProps) => {
  const { connected, wallets } = useWallet();

  const shouldInstall = useMemo(
    () => !wallets.some((wallet) => wallet.readyState === "Installed"),
    [wallets]
  );

  const connectAdapter = (adapter: Adapter) => async () => {
    await adapter.connect();
  };

  return (
    <span data-testid={testID} className="flex flex-col gap-2">
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
            <img src={adapter.icon} alt={adapter.name} width={64} height={64} />
          )
        )}
      </span>
    </span>
  );
};
