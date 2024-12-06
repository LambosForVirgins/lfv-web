"use client";

import clsx from "classnames";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LocaleButton } from "../Buttons/LocaleButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { MemberButton } from "../MemberButton/MemberButton";
import { BoostButton } from "../BoostButton/BoostButton";

const GuestMenuItems = [
  {
    key: "About",
    url: "/#about",
  },
  {
    key: "Store",
    url: "/store",
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

const MenuItems = [
  {
    key: "Members",
    url: "/members",
    active: true,
  },
  {
    key: "Store",
    url: "/store",
  },
  {
    key: "Giveaways",
    url: "/giveaways",
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
      className={clsx(props.className, "grid flex-column flex-wrap p-3")}
    >
      <nav className="flex flex-auto flex-row gap-1 justify-around items-end">
        <WalletMultiButton className="bg-red-500 text-white" />
        {/* {MenuItems.map((item, idx) =>
          item.active === false ? null : (
            <Link key={`${item.key}-${idx}`} href={item.url}>
              {t(`Navigation.${item.key}`)}
            </Link>
          )
        )} */}
        {ShowLocale && <LocaleButton testID={`${testID}.locale`} />}
        <BoostButton testID={`${testID}.store`} label={`Store`} />
        <BoostButton
          testID={`${testID}.boost`}
          label={`Giveaways`}
          progress={10}
          highlight
        />
        <MemberButton testID={`${testID}.member`} name={`mitch`} />
      </nav>
    </div>
  );
};
