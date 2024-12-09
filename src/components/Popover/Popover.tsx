import "@oddbird/popover-polyfill";
import "@oddbird/css-anchor-positioning/fn";
import styles from "./Popover.module.css";
import Link from "next/link";

interface PopoverProps extends Common.ComponentProps {
  id: string;
}

export const Popover = ({ testID, ...props }: PopoverProps) => {
  return (
    <dialog role="menu" popover="auto" id={props.id} className={styles.frame}>
      <ul className={styles.list}>
        <Link href="/members">
          <li>Membership</li>
        </Link>
        <Link href="/store">
          <li>Merchandise</li>
        </Link>
        <li>Events</li>
        <li>Giveaways</li>
        <Link href="/">
          <li>Disconnect</li>
        </Link>
      </ul>
    </dialog>
  );
};
