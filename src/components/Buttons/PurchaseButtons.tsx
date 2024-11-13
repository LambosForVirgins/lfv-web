"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "./Button";

interface PurchaseButtonsProps extends Common.ComponentProps {
  tokenSymbol: string;
  /**
   * @deprecated Merge purchase buttons with swap button
   */
  onPurchase?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * @deprecated Merge purchase buttons with swap button
   */
  loading?: boolean;
  /**
   * @deprecated Merge purchase buttons with swap button
   */
  disabled?: boolean;
}

export const PurchaseButtons = ({ testID, ...props }: PurchaseButtonsProps) => {
  return (
    <div className="grid gap-5 grid-cols-actions">
      <Button
        testID={`${testID}.native`}
        name="standalone"
        loading={props.loading}
        disabled={props.disabled}
        onClick={props.onPurchase}
      >
        {props.tokenSymbol}
      </Button>
      <WalletMultiButton className="bg-red-500 text-white" />
    </div>
  );
};
