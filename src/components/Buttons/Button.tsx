import { forwardRef } from "react";
import clsx from "classnames";

interface ButtonProps
  extends Common.ComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  inverted?: boolean;
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ testID, text, inverted, ...props }, ref) => {
  return (
    <button
      ref={ref}
      data-testid={testID}
      className={clsx(
        "p-3 rounded-lg font-leading text-3xl shadow-xl",
        "transition hover:scale-105",
        inverted
          ? "bg-neutral-100/60 text-[var(--bg-red-500)]"
          : "bg-red-500 text-white"
      )}
      {...props}
    >
      {props.children || text}
    </button>
  );
});
