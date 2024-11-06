import { forwardRef } from "react";
import clsx from "classnames";

interface SectionProps
  extends Common.ComponentProps,
    React.HTMLAttributes<HTMLSelectElement> {
  className?: string;
}

export const Section = forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<SectionProps>
>(({ testID, children, ...props }, ref) => {
  return (
    <section
      ref={ref}
      {...props}
      data-testid={testID}
      className={clsx(
        props.className,
        "grid col-full gap-9 grid-cols-layout content-center"
      )}
    >
      {children}
    </section>
  );
});
