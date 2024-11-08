import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import clsx from "classnames";
import { Header } from "@/src/components/Header/Header";
import { Brand } from "@/src/utils/config/Brand";
import customFonts from "./fonts";
import { getMessages } from "next-intl/server";
import { SectionBreak } from "@/src/components/SectionBreak/SectionBreak";
import Script from "next/script";
import { LocaleProvider } from "../providers/LocaleProvider";
import { SolanaProvider } from "../providers/SolanaProvider";

export const metadata: Metadata = {
  title: Brand.displayName,
  description: Brand.slogan,
};

export default async function RootLayout({
  children,
  about,
  community,
  submissions,
}: Readonly<{
  children: React.ReactNode;
  about: React.ReactNode;
  community: React.ReactNode;
  submissions: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html>
      <Script
        data-domain="lambosforvirgins.com"
        src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.tagged-events.js"
        defer
      />
      <Script src="/js/plausible.js" />
      <body
        className={clsx(
          customFonts,
          "antialiased grid auto-flow-row grid-cols-layout"
        )}
      >
        <LocaleProvider initialLocale={"en"} messages={messages}>
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
        </LocaleProvider>
      </body>
    </html>
  );
}
