import "@oddbird/popover-polyfill";
import styles from "./Popover.module.css";

interface PopoverProps extends Common.ComponentProps {
  id: string;
}

export const Popover = ({ testID, ...props }: PopoverProps) => {
  return (
    <div role="menu" popover="auto" id={props.id} className={styles.frame}>
      <p>Stuff</p>
    </div>
  );
};
