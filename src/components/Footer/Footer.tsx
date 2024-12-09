import Link from "next/link";
import styles from "./Footer.module.css";
import { LocaleButton } from "../Buttons/LocaleButton";
import clsx from "classnames";

const ShowLocale = true;

interface FooterProps extends Common.ComponentProps {
  className?: string;
}

export const Footer = ({ testID, ...props }: FooterProps) => {
  return (
    <footer
      data-testid={testID}
      className={clsx(props.className, styles.frame)}
    >
      <div className={styles.content}>
        <div>
          <h3 className="text-xl">Links</h3>
          <ul>
            <li>Announcements</li>
            <li>Community</li>
            <Link href={"/partners"}>
              <li>Become a Partner</li>
            </Link>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl">Investors</h3>
          <ul>
            <Link href={"/treasury/vesting"}>
              <li>Tokenomics</li>
            </Link>
          </ul>
        </div>
        <div>
          <h3 className="text-xl">Legal</h3>
          <ul>
            <li>About us</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Contact us</li>
            <li>Audits</li>
          </ul>
        </div>
        {ShowLocale && <LocaleButton testID={`${testID}.locale`} />}
        {/* <small className="col-span-2">
          We started as a simple meme with a simple purpose, solve population
          decline by giving away Lambos to virgins, but we've grown since then.
        </small> */}
      </div>
    </footer>
  );
};
