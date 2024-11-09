"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./Button";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { LFVTokenMint, SolanaTokenMint } from "@/src/utils/exchanges/tokens";
import { executeTransaction } from "@/src/utils/exchanges/transactions";
import { createSwapTransaction } from "@/src/utils/exchanges/jupiter/createSwapTransaction";
import { getSwapQuote } from "@/src/utils/exchanges/jupiter/getSwapQuote";
import { getExchangeRate } from "@/src/utils/exchanges/jupiter/getMarketQuotes";

interface SwapError {
  code: number;
  message: string;
}

export const SwapButton = ({ testID }: Common.ComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [balance, setBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const { connection } = useConnection();
  const { publicKey, wallet } = useWallet();
  const [error, setError] = useState<SwapError | null>(null);

  const changeOutputAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(event.target.value);
    setOutputAmount(amount);
    setInputAmount(amount * exchangeRate);
  };

  const swapToken = async () => {
    if (!publicKey || !wallet?.adapter) return;
    setLoading(true);
    try {
      const latestQuote = await getSwapQuote(inputAmount);
      const transaction = await createSwapTransaction(latestQuote, publicKey);

      await executeTransaction(transaction, wallet?.adapter, connection);
    } catch (err: Error | any) {
      if (err.code === 100) {
        setError({
          code: err.code,
          message: "Try clicking confirm next time nerd",
        });
      } else {
        setError({ code: err.code ?? 0, message: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExchangeRate(LFVTokenMint).then(setExchangeRate);
  }, []);

  useEffect(() => {
    if (inputAmount > 0 && exchangeRate !== null) {
      getSwapQuote(inputAmount).then((quote) =>
        setOutputAmount(parseInt(quote.outAmount) / 1_000_000)
      );
    }
  }, [inputAmount, exchangeRate]);

  useEffect(() => {
    const getWalletBalance = async () => {
      if (!publicKey) {
        setBalance(0);
        return;
      }

      await connection.getBalance(publicKey).then((value) => {
        setBalance(value / LAMPORTS_PER_SOL);
      });
    };

    getWalletBalance();
  }, [publicKey, connection]);

  return (
    <div
      data-testid={testID}
      className="relative p-2 gap-x-2 gap-y-0 rounded-lg bg-white grid grid-cols-[1fr auto 1fr] auto-rows items-center"
    >
      {error && (
        <span className="absolute p-4 inset-0 grid auto-row-auto to bg-black/50 text-white rounded-lg content-center backdrop-blur-sm text-lg">
          {error.message}
        </span>
      )}

      <input
        data-testid={`${testID}.input`}
        type={"number"}
        name="amount"
        min={0}
        step={1}
        placeholder={"0"}
        defaultValue={outputAmount}
        className="p-0 col-start-1 text-2xl border-none text-right font-bold"
        onChange={changeOutputAmount}
      />
      <span className="col-start-2 text-2xl font-bold">LFV</span>
      <strong className="col-start-1 row-start-2 text-xs grow text-right font-extrabold">
        {inputAmount}
      </strong>
      <strong className="col-start-2 row-start-2 text-xs grow text-left font-extrabold">
        SOL
      </strong>

      <Button
        testID={`${testID}.native`}
        loading={loading}
        disabled={inputAmount === 0 || inputAmount > balance}
        className="col-start-3 row-span-2"
        onClick={swapToken}
      >
        {`Buy $LFV`}
      </Button>
    </div>
  );
};
