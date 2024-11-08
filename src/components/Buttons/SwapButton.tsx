"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { calculateExchangeRate } from "@/src/utils/pricing/calculateExchangeRate";

import { LFVTokenMint, SolanaTokenMint } from "@/src/utils/exchanges/tokens";
import { executeTransaction } from "@/src/utils/exchanges/transactions";
import { createSwapTransaction } from "@/src/utils/exchanges/radium/createSwapTransaction";
import { getSwapQuote } from "@/src/utils/exchanges/radium/getSwapQuote";
import { getMarketQuotes } from "@/src/utils/exchanges/jupiter/getMarketQuotes";

export const SwapButton = ({ testID }: Common.ComponentProps) => {
  const [balance, setBalance] = useState(0);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [inputAmount, setInputAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const { connection } = useConnection();
  const { publicKey, wallet } = useWallet();

  const swapToken = async () => {
    if (!publicKey || !wallet?.adapter) return;
    const latestQuote = await getSwapQuote(inputAmount);
    const transaction = await createSwapTransaction(latestQuote, publicKey);

    executeTransaction(transaction, wallet?.adapter, connection);
  };

  useEffect(() => {
    getMarketQuotes([SolanaTokenMint, LFVTokenMint]).then((prices) => {
      console.log(prices);
      const rate = calculateExchangeRate(
        prices.data.getTokenPrices[0].priceUsd,
        prices.data.getTokenPrices[1].priceUsd
      );
      setExchangeRate(rate);
    });
  }, []);

  useEffect(() => {
    if (inputAmount > 0 && exchangeRate !== null) {
      getSwapQuote(inputAmount).then((quote) =>
        setAmount(parseInt(quote.data.outputAmount) / 1_000_000)
      );
    }
  }, [inputAmount, exchangeRate]);

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
    <div
      data-testid={testID}
      className="grid grid-cols-3 rounded-lg overflow-hidden"
    >
      <input
        name="inputAmount"
        placeholder="0.0"
        defaultValue={balance}
        className="border-none"
        onChange={(event) => setInputAmount(parseFloat(event.target.value))}
      />
      <Button
        testID={`${testID}.native`}
        disabled={inputAmount > balance}
        onClick={swapToken}
      >
        Buy $LFV
      </Button>
      <input
        name="outputAmount"
        value={amount}
        placeholder="0.0"
        className="text-right border-none"
      />
    </div>
  );
};
