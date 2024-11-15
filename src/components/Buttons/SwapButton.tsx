"use client";

import { Button } from "./Button";
import { useEffect } from "react";

import { CopyButton } from "./CopyButton";
import { Brand } from "@/src/utils/config/Brand";
import { useTranslations } from "next-intl";
import { usePlausible } from "next-plausible";
import { redirect, RedirectType } from "next/navigation";
import { useExchange } from "@/src/utils/exchanges/useExchange";
import { SwapErrorCode } from "@/src/utils/exchanges/SwapError";
import { PurchaseButtons } from "./PurchaseButtons";
import { useTokenPurchase } from "@/src/hooks/useTokenPurchase";

const STEP_AMOUNT = Number(process.env.NEXT_TOKEN_AMOUNT_STEP || "1");

export const SwapButton = ({ testID }: Common.ComponentProps) => {
  const t = useTranslations("Purchase");

  const plausible = usePlausible();
  const { exchanges } = useExchange();

  const {
    loading,
    error,
    availability,
    balance,
    inputAmount,
    outputAmount,
    changeOutput,
    executeSwap,
  } = useTokenPurchase();

  const handleOutputAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    changeOutput(+event.currentTarget.value);

    plausible("Purchase/Input", {
      props: {
        wallet: "Unknown",
        provider: "Raydium",
        balance,
        amount: inputAmount,
      },
    });
  };

  useEffect(() => {
    // HACK: Redirect to exchange if the token is not available
    if (error?.code !== SwapErrorCode.Timeout) return;
    const exchange = exchanges.find(({ name }) => name === "Raydium");
    if (!exchange) return;
    redirect(exchange.url, RedirectType.push);
  }, [error]);

  useEffect(() => {
    plausible("Purchase/Balance", {
      props: {
        wallet: "Unknown", // TODO: Store meta or something
        provider: "Raydium",
        balance,
      },
    });
  }, [balance]);

  const swapToken = async (event: React.MouseEvent<HTMLButtonElement>) => {
    plausible("Purchase/Quote", {
      props: {
        wallet: "Unknown", // TODO: Store meta or something
        button: event.currentTarget.name,
        provider: "Raydium",
        balance,
        amount: inputAmount,
      },
    });

    executeSwap()
      .then(() => {
        plausible("Purchase/Success", {
          props: {
            wallet: "Unknown", // TODO: Store meta or something
            provider: "Raydium",
            balance,
            amount: inputAmount,
          },
        });
      })
      .catch((err) => {
        plausible("Purchase/Failed", {
          props: {
            wallet: "Unknown", // TODO: Store meta or something
            provider: "Raydium",
            balance,
            amount: inputAmount,
            error: err.message,
          },
        });
      });
  };

  if (availability !== "available")
    return (
      <div className="grid gap-5">
        <CopyButton
          testID={`${testID}.copy`}
          label={t("CopyButtonLabel")}
          value={Brand.contractAddress}
          meta={{ wallet: { balance } }}
        />
        <PurchaseButtons
          testID={`${testID}.purchase`}
          tokenSymbol={t("PurchaseButtonToken")}
          loading={loading}
          disabled
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
          step={STEP_AMOUNT}
          placeholder={"0"}
          defaultValue={outputAmount}
          className="p-0 w-full col-start-1 text-2xl border-none text-right font-bold bg-transparent"
          onChange={handleOutputAmountChange}
        />
        <span className="col-start-2 text-2xl font-bold">
          {Brand.tokenSymbol}
        </span>
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
