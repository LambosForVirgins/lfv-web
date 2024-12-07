import "@oddbird/popover-polyfill";
import "@oddbird/css-anchor-positioning/fn";
import styles from "./Popover.module.css";

interface PopoverProps extends Common.ComponentProps {
  id: string;
}

export const Popover = ({ testID, ...props }: PopoverProps) => {
  return (
    <dialog role="menu" popover="auto" id={props.id} className={styles.frame}>
      <ul className={styles.list}>
        <li>Stuff</li>
        <li>Things</li>
        <li>Really long menu item that hits the edges of the frame</li>
      </ul>
    </dialog>
  );
};
