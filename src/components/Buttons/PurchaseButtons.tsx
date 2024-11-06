"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "./Button";

interface PurchaseButtonsProps extends Common.ComponentProps {
  tokenSymbol: string;
}

export const PurchaseButtons = ({ testID, ...props }: PurchaseButtonsProps) => {
  return (
    <div className="grid gap-5 grid-cols-actions">
      <Button testID={`${testID}.native`}>{props.tokenSymbol}</Button>
      <WalletMultiButton className="bg-red-500 text-white" />
    </div>
  );
};
