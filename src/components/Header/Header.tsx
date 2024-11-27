"use client";

import clsx from "classnames";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LocaleButton } from "../Buttons/LocaleButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const MenuItems = [
  {
    key: "Membership",
    url: "/members",
    active: true,
  },
  {
    key: "About",
    url: "/#about",
  },
  {
    key: "Purchase",
    url: "/purchase",
  },
  {
    key: "Community",
    url: "/#community",
  },
  {
    key: "Submissions",
    url: "/#submissions",
  },
];

const ShowLocale = false;

interface HeaderProps extends Common.ComponentProps {
  className?: string;
}

export const Header = ({ testID, ...props }: HeaderProps) => {
  const t = useTranslations("Header");

  return (
    <div
      data-testid={testID}
      className={clsx(props.className, "grid flex-column flex-wrap gap-6 p-4")}
    >
      <div className="flex flex-row">
        <h1 className="flex-grow font-headline text-4xl">{t("Title")}</h1>
        <WalletMultiButton className="bg-red-500 text-white" />
      </div>
      <nav className="flex flex-auto flex-row gap-1 justify-around items-end">
        {MenuItems.map((item, idx) =>
          item.active === false ? null : (
            <Link key={`${item.key}-${idx}`} href={item.url}>
              {t(`Navigation.${item.key}`)}
            </Link>
          )
        )}
        {ShowLocale && <LocaleButton testID={`${testID}.locale`} />}
      </nav>
    </div>
  );
};
