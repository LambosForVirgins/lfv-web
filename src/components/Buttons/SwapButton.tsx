"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Button } from "./Button";
import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import { VIRGINTokenMint, SolanaTokenMint } from "@/src/utils/exchanges/tokens";
import { executeTransaction } from "@/src/utils/exchanges/transactions";
import { createSwapTransaction } from "@/src/utils/exchanges/jupiter/createSwapTransaction";
import { getSwapQuote } from "@/src/utils/exchanges/jupiter/getSwapQuote";
import { getExchangeRate } from "@/src/utils/exchanges/jupiter/getMarketQuotes";
import { CopyButton } from "./CopyButton";
import { Brand } from "@/src/utils/config/Brand";
import { useTranslations } from "next-intl";
import { getTokenAvailability } from "@/src/utils/exchanges/jupiter/getTokenAvailability";
import { usePlausible } from "next-plausible";
import { redirect, RedirectType } from "next/navigation";
import { useExchange } from "@/src/utils/exchanges/useExchange";
import { SwapErrorCode } from "@/src/utils/exchanges/SwapError";
import { PurchaseButtons } from "./PurchaseButtons";

interface SwapError {
  code: number;
  message: string;
}

const ErrorMessageMapping = {
  100: [
    "Try clicking confirm next time... virgin",
    "No wonder why you're still a virgin",
    "Once a virgin, always a virgin",
    "That's no way to get a laid",
    "No Lambos for you",
  ],
  200: [
    "Not sure how else to say this, but you're broke",
    "Brokie",
    "Try getting a job",
    "That's a little awkward",
    "Broke and a virgin, that's a tough combo",
    "Not enough cash... and that's not all you're lacking",
    "Try having more money next time",
    "No cash, no Lambos",
    "No cash, but looks like you don't get much of anything...",
  ],
};

const getRandomErrorMessage = (code: 100 | 200) => {
  const messages = ErrorMessageMapping[code];
  return messages[Math.floor(Math.random() * messages.length)];
};

export const SwapButton = ({ testID }: Common.ComponentProps) => {
  const t = useTranslations("Purchase");
  const [loading, setLoading] = useState(false);
  const plausible = usePlausible();
  const { exchanges } = useExchange();
  const [tokenAvailable, setTokenAvailable] = useState(false);
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

    plausible("Purchase/Input", {
      props: {
        wallet: wallet?.adapter.name,
        provider: "Jupiter",
        balance,
        amount: input,
      },
    });

    if (input <= balance) return;

    setError({
      code: 200,
      message: getRandomErrorMessage(200),
    });
  };

  useEffect(() => {
    // HACK: Redirect to exchange if the token is not available
    if (error?.code !== SwapErrorCode.Timeout) return;
    const exchange = exchanges.find(({ name }) => name === "Jupiter");
    if (!exchange) return;
    redirect(exchange.url, RedirectType.push);
  }, [error]);

  const swapToken = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!publicKey || !wallet?.adapter) return;

    setLoading(true);
    setError(null);

    try {
      plausible("Purchase/Quote", {
        props: {
          button: event.currentTarget.name,
          wallet: wallet.adapter.name,
          provider: "Jupiter",
          balance,
          amount: inputAmount,
        },
      });

      const latestQuote = await getSwapQuote(inputAmount, {
        highVolatility: true,
      });
      const transaction = await createSwapTransaction(latestQuote, publicKey);

      const result = await executeTransaction(
        transaction,
        wallet?.adapter,
        connection
      );

      plausible("Purchase/Success", {
        props: {
          wallet: wallet.adapter.name,
          provider: "Jupiter",
          balance,
          amount: inputAmount,
        },
      });

      console.log("Result", result);

      setInputAmount(0);
      setOutputAmount(0);
      setLoading(false);
    } catch (err: any) {
      plausible("Purchase/Failed", {
        props: {
          wallet: wallet.adapter.name,
          provider: "Jupiter",
          balance,
          amount: inputAmount,
          error: err.message,
        },
      });

      if (err.code === SwapErrorCode.Aborted) {
        setError({
          code: err.code,
          message: getRandomErrorMessage(100),
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
    getTokenAvailability(balance).then(setTokenAvailable);
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

        plausible("Purchase/Balance", {
          props: {
            wallet: wallet?.adapter.name,
            provider: "Jupiter",
            balance,
          },
        });
      });
    };

    getWalletBalance();
  }, [publicKey, connection]);

  if (!publicKey || !tokenAvailable)
    return (
      <div className="grid gap-5">
        <CopyButton
          testID={`${testID}.copy`}
          label={t("CopyButtonLabel")}
          value={Brand.contractAddress}
          meta={{ wallet: { provider: wallet?.adapter.name, balance } }}
        />
      </div>
    );

  return (
    <div className="grid gap-5">
      <div
        data-testid={testID}
        className="relative p-2 gap-x-2 gap-y-1 rounded-lg bg-neutral-100/60 grid grid-cols-[1fr auto 1fr] auto-rows items-center"
      >
        <input
          data-testid={`${testID}.input`}
          type={"number"}
          name="amount"
          min={0}
          step={1}
          placeholder={"0"}
          defaultValue={outputAmount}
          className="p-0 w-full col-start-1 text-2xl border-none text-right font-bold bg-transparent"
          onChange={handleOutputAmountChange}
        />
        <span className="col-start-2 text-2xl font-bold">VIRGIN</span>
        <strong className="col-start-1 row-start-2 text-xs grow text-right font-extrabold">
          {Math.floor(inputAmount * 1_000_000) / 1_000_000}
        </strong>
        <strong className="col-start-2 row-start-2 text-xs grow text-left font-extrabold">
          SOL
        </strong>

        <Button
          testID={`${testID}.native`}
          name="inline"
          loading={loading}
          disabled={inputAmount === 0 || inputAmount > balance}
          className="col-start-3 row-span-2"
          onClick={swapToken}
        >
          {t("PurchaseButtonToken")}
        </Button>

        {error && (
          <span className="col-span-3 text-sm bg-red-500 p-1 text-white text-center rounded-md">
            {error?.message}
          </span>
        )}
      </div>
      <PurchaseButtons
        testID={`${testID}.purchase`}
        tokenSymbol={t("PurchaseButtonToken")}
        loading={loading}
        disabled={inputAmount === 0 || inputAmount > balance}
        onPurchase={swapToken}
      />
    </div>
  );
};
