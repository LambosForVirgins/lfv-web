import { forwardRef, useMemo } from "react";
import clsx from "classnames";

interface ReasonableTextareaProps extends Common.ComponentProps {
  label: string;
  className?: string;
}

const hints = [
  "Anything else we should know?",
  "I only invest on fundamentals and extensive market research.",
];

export const ReasonableTextarea = forwardRef<
  HTMLTextAreaElement,
  ReasonableTextareaProps
>((props, ref) => {
  const randomHint = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * hints.length);
    return hints[randomIndex];
  }, []);

  return (
    <label className={clsx(props.className, "grid grid-col-1")}>
      <span>{props.label}</span>
      <textarea ref={ref} name="reason" placeholder={randomHint} />
    </label>
  );
});
