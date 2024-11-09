import { forwardRef } from "react";
import clsx from "classnames";

interface ButtonProps
  extends Common.ComponentProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  inverted?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ testID, text, loading, inverted, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      data-testid={testID}
      className={clsx(
        props.className,
        "p-3 rounded-lg font-leading text-3xl",
        !props.disabled && "transition hover:scale-105 shadow-xl",
        inverted
          ? "bg-neutral-100/60 text-[var(--bg-red-500)]"
          : "bg-red-500 text-white",
        props.disabled && "bg-neutral-100 text-neutral-500",
        loading && "opacity-50 cursor-not-allowed shadow-md"
      )}
      disabled={props.disabled || loading}
    >
      {props.children || text}
    </button>
  );
});
