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

const ErrorMessageMapping = {
  100: [
    "Try clicking confirm next time virgin",
    "No wonder why you're a virgin",
    "Once a virgin, always a virgin",
    "That's no way to get a laid",
    "No Lambos for you",
  ],
  200: [
    "Not sure how else to say this, but you're broke",
    "You're broke, but you're also a nerd",
    "Try getting a job",
    "That's awkward because you don't have that much",
    "Broke and a virgin, that's a tough combo",
    "Not enough cash... and that's not all you're lacking",
    "Try having more money next time",
    "No cash, no Lambos",
    "No cash... looks like you don't get much of anything",
  ],
};

const getRandomErrorMessage = (code: 100 | 200) => {
  const messages = ErrorMessageMapping[code];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const SwapButton = ({ testID }: Common.ComponentProps) => {
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [balance, setBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const { connection } = useConnection();
  const { publicKey, wallet } = useWallet();
  const [error, setError] = useState<SwapError | null>(null);

  const handleOutputAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);
    const amount = parseFloat(event.target.value);
    const input = amount * exchangeRate;
    setOutputAmount(amount);
    setInputAmount(input);

    if (input <= balance) return;

    setError({
      code: 200,
      message: getRandomErrorMessage(200),
    });
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
          message: getRandomErrorMessage(100),
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
      <input
        data-testid={`${testID}.input`}
        type={"number"}
        name="amount"
        min={0}
        step={1}
        placeholder={"0"}
        defaultValue={outputAmount}
        className="p-0 col-start-1 text-2xl border-none text-right font-bold"
        onChange={handleOutputAmountChange}
      />
      <span className="col-start-2 text-2xl font-bold">LFV</span>
      <strong className="col-start-1 row-start-2 text-xs grow text-right font-extrabold">
        {Math.floor(inputAmount * 1_000_000) / 1_000_000}
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

      <span className="col-span-3 text-sm">{error?.message}</span>
    </div>
  );
};
