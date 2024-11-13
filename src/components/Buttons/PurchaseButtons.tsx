"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "./Button";
import { usePlausible } from "next-plausible";

interface PurchaseButtonsProps extends Common.ComponentProps {
  tokenSymbol: string;
}

export const PurchaseButtons = ({ testID, ...props }: PurchaseButtonsProps) => {
  const plausible = usePlausible();

  const handlePurchase = (event: React.MouseEvent<HTMLButtonElement>) => {
    plausible("Purchase/Quote", {
      props: {
        button: event.currentTarget.name,
      },
    });
  };

  return (
    <div className="grid gap-5 grid-cols-actions">
      <Button
        testID={`${testID}.native`}
        name="standalone"
        onClick={handlePurchase}
      >
        {props.tokenSymbol}
      </Button>
      <WalletMultiButton className="bg-red-500 text-white" />
    </div>
  );
};
