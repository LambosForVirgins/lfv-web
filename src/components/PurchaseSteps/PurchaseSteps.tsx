"use client";

import { useEffect, useState } from "react";
import { ConnectionButton } from "../Buttons/ConnectionButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import clsx from "classnames";

const MINIMUM_TOKEN_PRICE = 0;

export const PurchaseSteps = ({ testID }: Common.ComponentProps) => {
  const [balance, setBalance] = useState(0);

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    const getWalletBalance = async () => {
      if (!publicKey) return;

      const balance = await connection.getBalance(publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    };

    getWalletBalance();
  }, [publicKey, connection]);

  return (
    <ol className="instruct text-2xl">
      <li>
        <ConnectionButton testID={`${testID}.connection`} />
      </li>
      <li>
        <span className={clsx(balance > MINIMUM_TOKEN_PRICE && "line-through")}>
          {balance > MINIMUM_TOKEN_PRICE
            ? "Buy some Solana"
            : `Buy ${MINIMUM_TOKEN_PRICE - balance} more Solana`}
        </span>
      </li>
      <li>Buy $LFV and get Lambo</li>
    </ol>
  );
};
