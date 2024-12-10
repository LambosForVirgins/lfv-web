import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import clsx from "classnames";
import { Header } from "@/src/components/Header/Header";
import { Brand } from "@/src/utils/config/Brand";
import customFonts from "./fonts";
import { getMessages } from "next-intl/server";
import { LocaleProvider } from "../providers/LocaleProvider";
import { SolanaProvider } from "../providers/SolanaProvider";
import PlausibleProvider from "next-plausible";
import { Footer } from "../components/Footer/Footer";
import { Subscribe } from "../components/Subscribe/Subscribe";
import { Disclaimers } from "../components/Disclaimers/Disclaimers";
import { PromoSection } from "../components/PromoSection/PromoSection";

export const metadata: Metadata = {
  title: Brand.displayName,
  description: Brand.slogan,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
              <div className="grid col-full grid-cols-subgrid bg-red-500 sticky top-0 left-0 right-0 z-50">
                <Header testID={`header`} className="col-content" />
              </div>
              <section className="col-full grid grid-cols-subgrid">
                {children}
              </section>
              <PromoSection
                testID="promo"
                className="col-full gap-5 sticky bottom-0 left-0 right-0"
              />
              <Subscribe testID="subscribe" className="col-full" />
              <Footer testID="footer" className="col-full" />
              <Disclaimers testID="disclaimers" className="col-full" />
            </SolanaProvider>
          </LocaleProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
