import styles from "./Subscribe.module.css";
import clsx from "classnames";

interface SubscribeProps extends Common.ComponentProps {
  className?: string;
}

export const Subscribe = ({ testID, ...props }: SubscribeProps) => {
  return (
    <div data-testid={testID} className={clsx(props.className, styles.frame)}>
      <p className={styles.content}>Subscribe to our newsletter</p>
    </div>
  );
};
