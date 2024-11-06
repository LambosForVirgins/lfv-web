import Image from "next/image";
import { Button } from "@/src/components/Buttons/Button";
import { Brand } from "@/src/utils/config/Brand";
import { CopyButton } from "@/src/components/Buttons/CopyButton";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";
import { PurchaseSteps } from "@/src/components/PurchaseSteps/PurchaseSteps";
import { ConnectionButton } from "@/src/components/Buttons/ConnectionButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PurchaseButtons } from "@/src/components/Buttons/PurchaseButtons";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("Token.DisplayName"),
    description: t("Token.Slogan"),
    keywords: [], // TODO: SEO Keywords
    openGraph: {
      title: t("Token.DisplayName"),
      description: t("Token.Slogan"),
      type: "website",
      locale: locale,
      siteName: t("Token.DisplayName"),
      images: [
        // TODO: SEO Images
        {
          url: "/images/logo-stamp.png",
          width: 400,
          height: 250,
          alt: `${Brand.tokenSymbol} stamp logo`,
        },
      ],
    },
  };
}

const MARKETS = [
  {
    key: "solflare",
    src: "/images/solflare.png",
    label: "Solflare Wallet",
    href: "https://solflare.com/",
  },
  {
    key: "jupiter",
    src: "/images/jupiter.png",
    label: "Jupiter Marketplace",
    href: "https://jup.ag/",
  },
  {
    key: "raydium",
    src: "/images/raydium.png",
    label: "Raydium Marketplace",
    href: "https://raydium.io/swap/",
  },
];

export default function LocalePage({
  testID = "home",
}: Readonly<Partial<Common.ComponentProps>>) {
  const t = useTranslations("Home");

  return (
    <section
      id={"welcome"}
      data-testid={testID}
      className="grid p-5 gap-9 col-content grid-cols-panels content-center items-center"
    >
      <div data-testid={`${testID}.content`}>
        <Image
          data-testid={`${testID}.image`}
          src={"/images/lambos.png"}
          alt={`${Brand.tokenSymbol} stamp logo`}
          width={501}
          height={186}
        />
        <div className="grid gap-5">
          <CopyButton
            testID={`${testID}.copy`}
            label={t("CopyButtonLabel")}
            value={Brand.contractAddress}
          />
          <PurchaseButtons
            testID={`${testID}.purchase`}
            tokenSymbol={t("PurchaseButtonToken")}
          />
          <h3 className="text-2xl">How to buy $LFV</h3>
          <PurchaseSteps testID={`${testID}.steps`} />
        </div>
      </div>
      <Image
        src={"/images/logo-stamp.png"}
        alt={`${Brand.tokenSymbol} stamp logo`}
        width={400}
        height={250}
        className="justify-self-center"
      />
    </section>
  );
}
