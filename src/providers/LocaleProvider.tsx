"use client";

import { createContext, useContext, useState } from "react";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";

interface LocalContextProps {
  locale: string;
  setLocale: (locale: string) => void;
}

interface LocaleProviderProps {
  children: React.ReactNode;
  initialLocale: string;
  messages: AbstractIntlMessages;
}

const LocaleContext = createContext<LocalContextProps | undefined>(undefined);

export const LocaleProvider = ({
  children,
  initialLocale,
  messages,
}: LocaleProviderProps) => {
  const [locale, setLocale] = useState(initialLocale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};