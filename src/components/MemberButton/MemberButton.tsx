import { forwardRef } from "react";
import styles from "./MemberButton.module.css";
import clsx from "classnames";
import { Popover } from "../Popover/Popover";

interface MemberButtonProps extends Common.ComponentProps {
  name: string;
  onClick?: () => void;
}

export const MemberButton = forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<MemberButtonProps>
>(({ testID, name, children, ...props }, ref) => {
  return (
    <button
      {...props}
      popoverTarget={"members"}
      ref={ref}
      data-testid={testID}
      className={styles.frame}
    >
      <span className={clsx(styles.icon, styles.badge)} />
      <span className={styles.labels}>
        <span>{name}</span>
        <span className={styles.progress}>
          <span className={styles.indicator} style={{ width: `44%` }} />
        </span>
      </span>
      <span className={clsx(styles.icon, styles.more)} />
      {children}
      <Popover testID={`${testID}.options`} id="members"></Popover>
    </button>
  );
});
