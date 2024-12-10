"use client";

import clsx from "classnames";
import { useTranslations } from "next-intl";
import { MemberButton } from "../MemberButton/MemberButton";
import { BoostButton } from "../BoostButton/BoostButton";
import { useRouter } from "next/navigation";
import { RecoilRoot } from "recoil";

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

const MENU_ACTIONS = [];

interface HeaderProps extends Common.ComponentProps {
  className?: string;
}

export const Header = ({ testID, ...props }: HeaderProps) => {
  const t = useTranslations("Header");
  const { push } = useRouter();

  const navigateToPath = (path: string) => () => push(path);

  // Menu actions should be configurable per route and also communicate via channels with pages

  return (
    <div
      data-testid={testID}
      className={clsx(props.className, "grid flex-column flex-wrap p-2")}
    >
      <nav className="flex flex-auto flex-row gap-1 items-end">
        {/* <WalletMultiButton className="bg-red-500 text-white" /> */}
        {/* {MenuItems.map((item, idx) =>
          item.active === false ? null : (
            <Link key={`${item.key}-${idx}`} href={item.url}>
              {t(`Navigation.${item.key}`)}
            </Link>
          )
        )} */}
        <BoostButton
          testID={`${testID}.members`}
          onClick={navigateToPath("/members")}
          label={`Members`}
          icon={"award"}
        />
        <BoostButton
          testID={`${testID}.store`}
          onClick={navigateToPath("/store")}
          label={`Store`}
          icon={"store"}
        />
        <BoostButton
          testID={`${testID}.giveaways`}
          onClick={navigateToPath("/giveaways")}
          label={`Giveaways`}
          icon={"present"}
        />
        <BoostButton
          testID={`${testID}.discounts`}
          onClick={navigateToPath("/benefits")}
          label={`Discounts`}
          progress={10}
          highlight
          disabled
        />
        <span style={{ flexGrow: 2, flexShrink: 3 }} />
        <MemberButton
          testID={`${testID}.member`}
          name={`mitch`}
          className="flex-grow"
        />
      </nav>
    </div>
  );
};
