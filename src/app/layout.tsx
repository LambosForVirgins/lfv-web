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
import Image from "next/image";

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
              <div className="grid col-full grid-cols-subgrid bg-red-500">
                <Header testID={`header`} className="col-content" />
              </div>
              {children}
              <div className="grid col-full grid-cols-subgrid">
                <Footer testID="footer" />
              </div>
              <div className="grid col-full gap-5 sticky bottom-0 left-0 right-0 bg-red-500">
                <div className="relative col-content" style={{ height: 60 }}>
                  <Image
                    src={"/images/banner.png"}
                    alt={"banner"}
                    width={618}
                    height={123}
                    className="justify-self-center absolute"
                    style={{ top: -100, right: 0 }}
                  />
                </div>
                <div className="col-content">
                  <span>Disclaimers</span>
                </div>
              </div>
            </SolanaProvider>
          </LocaleProvider>
        </PlausibleProvider>
      </body>
    </html>
  );
}
