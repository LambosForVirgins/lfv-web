"use client";

import { createElement, useEffect, useMemo, useState } from "react";
import { type Adapter } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import clsx from "classnames";
import { useExchange } from "@/src/utils/exchanges/useExchange";
import { VIRGINTokenMint } from "@/src/utils/exchanges/tokens";

const MINIMUM_TOKEN_PRICE = 1;

const ALLOWED_WALLETS = ["Phantom", "Trust", "Solflare"];

const isInstalled = ({ readyState }: Adapter) => readyState === "Installed";

export const PurchaseSteps = ({ testID }: Common.ComponentProps) => {
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);

  const { connection } = useConnection();
  const { publicKey, connected, wallets } = useWallet();
  const { exchanges } = useExchange();

  const shouldInstall = useMemo(
    () => !wallets.some((wallet) => wallet.readyState === "Installed"),
    [wallets]
  );

  const connectAdapter = (adapter: Adapter) => async () => {
    await adapter.connect();
  };

  useEffect(() => {
    const mintPublicKey = new PublicKey(VIRGINTokenMint);
    const getTokenBalance = async () => {
      if (!publicKey) {
        setTokenBalance(0);
        return;
      }
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        {
          mint: mintPublicKey,
        }
      );

      if (tokenAccounts.value.length > 0) {
        setTokenBalance(
          tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount
        );
      } else {
        setTokenBalance(0);
      }
    };
    const getWalletBalance = async () => {
      if (!publicKey) {
        setBalance(0);
        return;
      }

      const balance = await connection.getBalance(publicKey);
      setBalance(balance);
    };

    getWalletBalance();
    getTokenBalance();
  }, [publicKey, connection]);

  return (
    <ol className="instruct text-2xl">
      <li>
        <span className={clsx(balance > MINIMUM_TOKEN_PRICE && "line-through")}>
          {"Buy Solana through your exchange of choice (e.g. Coinspot)"}
        </span>
      </li>
      <li>
        <span data-testid={testID} className="flex flex-col gap-4">
          <span className={clsx(connected && "line-through")}>
            {"Transfer to Phantom or wallet of your choice"}
          </span>
          <span className="col-span-2 flex gap-4 items-center">
            {wallets
              .filter((client) => ALLOWED_WALLETS.includes(client.adapter.name))
              .map(({ adapter }) =>
                createElement(
                  isInstalled(adapter) ? "button" : "a",
                  {
                    key: adapter.name,
                    target: "_blank",
                    onClick: isInstalled(adapter)
                      ? connectAdapter(adapter)
                      : undefined,
                    href: !isInstalled(adapter) ? adapter.url : undefined,
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
        <span className="flex flex-col gap-4">
          <span className={clsx(tokenBalance > 0 && "line-through")}>
            {"Copy address above and swap Solana for $VIRGIN"}
          </span>
          {/* <span className="col-span-2 flex gap-4 items-center">
            {exchanges.map((market) => (
              <a key={market.name} target={"_blank"} href={market.url}>
                <img src={market.icon} width={62} height={62} />
              </a>
            ))}
          </span> */}
        </span>
      </li>
      {tokenBalance > 0 && (
        <li>
          <span>Submit your application</span>
        </li>
      )}
    </ol>
  );
};
