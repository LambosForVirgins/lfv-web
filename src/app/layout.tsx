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
              <div className="grid col-full grid-cols-subgrid">
                <Header testID={`header`} className="col-content" />
              </div>
              {children}
              <div className="grid col-full grid-cols-subgrid">
                <Footer testID="footer" />
              </div>
              <div className="grid col-full sticky bottom-0 left-0 right-0 bg-red-500">
                <h1>Promo</h1>
              </div>
            </SolanaProvider>
          </LocaleProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
