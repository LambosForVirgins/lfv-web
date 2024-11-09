import { Brand } from "@/src/utils/config/Brand";
import clsx from "classnames";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { LocaleButton } from "../Buttons/LocaleButton";

const MenuItems = [
  // {
  //   key: "Navigation.Home",
  //   url: "/",
  // },
  {
    key: "Navigation.About",
    url: "#about",
  },
  {
    key: "Navigation.Instructions",
    url: "/",
  },
  {
    key: "Navigation.Community",
    url: "#community",
  },
  {
    key: "Navigation.Submissions",
    url: "#submissions",
  },
];

interface HeaderProps extends Common.ComponentProps {
  className?: string;
}

export const Header = ({ testID, ...props }: HeaderProps) => {
  const t = useTranslations("Header");

  return (
    <div
      data-testid={testID}
      className={clsx(
        props.className,
        "flex flex-row flex-wrap grid-cols-panels gap-6 p-4"
      )}
    >
      <h1 className="font-headline text-4xl">{t("Title")}</h1>
      <div className="flex flex-auto flex-row gap-1 justify-around items-end">
        {MenuItems.map((item, idx) => (
          <Link key={`${item.key}-${idx}`} href={item.url}>
            {t(item.key)}
          </Link>
        ))}
        <LocaleButton testID={`${testID}.locale`} />
      </div>
    </div>
  );
};
