import Image from "next/image";
import { Button } from "@/src/components/Buttons/Button";
import { Brand } from "@/src/utils/config/Brand";
import { CopyButton } from "@/src/components/Buttons/CopyButton";
import { useTranslations } from "next-intl";

import { getTranslations } from "next-intl/server";
import Link from "next/link";

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

const WALLETS = [
  {
    key: "trust",
    src: "/images/trust.png",
    label: "Trust Wallet",
    href: "https://trustwallet.com/download",
  },
  {
    key: "phantom",
    src: "/images/phantom.png",
    label: "Phantom Wallet",
    href: "https://phantom.app/en-GB/download",
  },
  {
    key: "solflare",
    src: "/images/solflare.png",
    label: "Solflare Wallet",
    href: "https://solflare.com/",
  },
  {
    key: "jupiter",
    src: "/images/jupiter.png",
    label: "Jupiter Wallet",
    href: "https://www.google.com/search?q=Jupiter+wallet+download",
  },
  {
    key: "raydium",
    src: "/images/raydium.png",
    label: "Raydium Wallet",
    href: "https://www.google.com/search?q=raydium+wallet+download",
  },
  {
    key: "glow",
    src: "/images/glow.png",
    label: "Glow Wallet",
    href: "https://www.google.com/search?q=Jupiter+wallet+download",
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
          <div className="grid gap-5 grid-cols-actions">
            <Button testID={`${testID}.native`}>
              {t("PurchaseButtonToken")}
            </Button>
            <Button testID={`${testID}.raydium`} inverted>
              {t("PurchaseButtonRadium")}
            </Button>
            {/* <ConnectionButton testID={`${testID}.wallet`} /> */}
          </div>
          <h3 className="text-2xl">How to buy $LFV</h3>
          <ol className="text-2xl">
            <li>
              <span>Get one of the wallets below</span>
              <span className="col-span-2 p-2 flex justify-around gap-2">
                {WALLETS.map((wallet) => (
                  <Link key={wallet.key} href={wallet.href}>
                    <Image
                      src={wallet.src}
                      alt={wallet.label}
                      width={60}
                      height={60}
                    />
                  </Link>
                ))}
              </span>
            </li>
            <li>Buy some Solana</li>
            <li>Buy $LFV and get Lambo</li>
          </ol>
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
