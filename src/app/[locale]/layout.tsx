import type { Metadata } from "next";
import "../globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import clsx from "classnames";
import { notFound } from "next/navigation";
import { Header } from "@/src/components/Header/Header";
import { Brand } from "@/src/utils/config/Brand";
import { routing } from "@/src/i18n/routing";
import customFonts from "../fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { SectionBreak } from "@/src/components/SectionBreak/SectionBreak";
import { SolanaProvider } from "@/src/app/providers";

export const metadata: Metadata = {
  title: Brand.displayName,
  description: Brand.slogan,
};

export default async function LocaleLayout({
  children,
  params: { locale },
  about,
  community,
  submissions,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
  about: React.ReactNode;
  community: React.ReactNode;
  submissions: React.ReactNode;
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={clsx(
          customFonts,
          "antialiased grid auto-flow-row grid-cols-layout"
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <SolanaProvider>
            <div className="grid col-full grid-cols-subgrid">
              <Header testID={`header`} className="col-content" />
            </div>
            <div className="grid col-full auto-flow-row grid-cols-subgrid">
              {children}
              <SectionBreak
                testID={`section`}
                className="col-full sticky bottom-0"
              />
              {about}
              <SectionBreak
                testID={`section`}
                className="col-full sticky bottom-0"
              />
              {community}
              {submissions}
            </div>
          </SolanaProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
