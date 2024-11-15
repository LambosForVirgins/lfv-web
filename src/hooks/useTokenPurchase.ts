import { useEffect, useState } from "react";
import { useErrorMapping } from "./useErrorMapping";
import { getSwapQuote } from "../utils/exchanges/raydium/getSwapQuote";
import { createSwapTransaction } from "../utils/exchanges/raydium/createSwapTransaction";
import { executeTransaction } from "../utils/exchanges/transactions";
import { SwapErrorCode } from "../utils/exchanges/SwapError";
import { getTokenAvailability } from "../utils/exchanges/raydium/getTokenAvailability";
import { getExchangeRate } from "../utils/exchanges/jupiter/getMarketQuotes";
import { VIRGINTokenMint } from "../utils/exchanges/tokens";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface SwapError {
  code: number;
  message: string | null;
}

export const useTokenPurchase = () => {
  const [loading, setLoading] = useState(false);
  const [availability, setAvailability] = useState("unavailable");
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [error, setError] = useState<SwapError | null>(null);
  const { connection } = useConnection();
  const { publicKey, wallet } = useWallet();
  const [balance, setBalance] = useState(0);
  const { getError } = useErrorMapping("Purchase");

  const handleOutputAmountChange = (amount: number) => {
    setError(null);

    const input = amount * exchangeRate;
    setOutputAmount(amount);
    setInputAmount(input);

    if (input <= balance) return;

    setError({
      code: 200,
      message: getError(200),
    });
  };

  const executeSwap = async () => {
    if (!publicKey || !wallet) return;

    setLoading(true);
    setError(null);

    try {
      const latestQuote = await getSwapQuote(inputAmount, {
        highVolatility: true,
      });
      const transaction = await createSwapTransaction(latestQuote, publicKey);

      const result = await executeTransaction(
        transaction,
        wallet?.adapter,
        connection
      );

      console.log("Result", result);

      setInputAmount(0);
      setOutputAmount(0);
      setLoading(false);
    } catch (err: any) {
      if (err.code === SwapErrorCode.Aborted) {
        setError({
          code: err.code,
          message: getError(100),
        });
      } else {
        setError({ code: err.code, message: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // HACK: Determine if the token is available for swap
    getTokenAvailability(balance).then((available) => {
      setAvailability(available ? "available" : "unavailable");
    });
  }, [balance]);

  useEffect(() => {
    // HACK: Get the exchange rate relative to the base token
    getExchangeRate(VIRGINTokenMint).then(setExchangeRate);
  }, []);

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

  return {
    loading,
    error,
    balance,
    availability,
    changeOutput: handleOutputAmountChange,
    executeSwap,
    inputAmount,
    outputAmount,
  };
};
