import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import clsx from "classnames";
import { Header } from "@/src/components/Header/Header";
import { Brand } from "@/src/utils/config/Brand";
import customFonts from "./fonts";
import { getMessages } from "next-intl/server";
import { SectionBreak } from "@/src/components/SectionBreak/SectionBreak";
import { LocaleProvider } from "../providers/LocaleProvider";
import { SolanaProvider } from "../providers/SolanaProvider";
import PlausibleProvider from "next-plausible";

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
      <body
        className={clsx(
          customFonts,
          "antialiased grid auto-flow-row grid-cols-layout"
        )}
      >
        <PlausibleProvider
          domain="lambosforvirgins.com"
          // taggedEvents
          // trackLocalhost
          // enabled
        >
          <LocaleProvider initialLocale={"en"} messages={messages}>
            <SolanaProvider>
              <div className="grid col-full grid-cols-subgrid">
                <Header testID={`header`} className="col-content" />
              </div>
              <main className="grid col-full auto-flow-row grid-cols-subgrid">
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
              </main>
            </SolanaProvider>
          </LocaleProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
