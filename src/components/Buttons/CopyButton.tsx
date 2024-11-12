"use client";

import { prettyAddress } from "@/src/utils/string/prettyAddress";
import { usePlausible } from "next-plausible";

interface CopyButtonProps extends Common.ComponentProps {
  label: string;
  value: string;
  meta?: Partial<{ wallet: { provider: any; balance: any } }>;
}

export const CopyButton = ({
  testID,
  meta = {},
  ...props
}: CopyButtonProps) => {
  const plausible = usePlausible();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.value);
    plausible("Purchase/Copy", {
      props: {
        wallet: meta.wallet?.provider,
        balance: meta.wallet?.balance,
      },
    });
  };

  return (
    <button
      className="flex flex-row bg-neutral-100/60 p-4 rounded-lg items-center"
      onClick={copyToClipboard}
    >
      <span
        data-testid={`${testID}.label`}
        className="flex-auto text-left text-xl"
      >
        {prettyAddress(props.value, 19)}
      </span>
      <span
        data-testid={`${testID}.action`}
        className="p-3 pl-9 pr-9 bg-red-500 opacity-50 text-white rounded-xl font-[Arial] text-sm shadow-xl transition ease-in-out duration-300 hover:scale-105"
      >
        {props.label}
      </span>
    </button>
  );
};
