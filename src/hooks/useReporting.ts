import { usePlausible } from "next-plausible";

enum ReportType {
  Exception = "Error",
  Event = "Event",
}

enum EventContext {
  Purchase = "Purchase",
  Locale = "Locale",
}

type PurchaseEvent<TName extends string = string> = {
  name: `Purchase/${TName}`;
  props: {
    walletProvider: string;
    marketProvider: string;
    balance: number;
    amount: number;
  };
};

const purchaseEvents = {
  Quote: {},
  Success: {},
  Failed: {},
};

const eventContexts: Record<EventContext, {}> = {
  Purchase: purchaseEvents,
  Locale: {},
};

const reportTypes: Record<
  ReportType,
  Record<keyof typeof eventContexts, {}> | {}
> = {
  [ReportType.Event]: eventContexts,
  [ReportType.Exception]: {},
};

const buildReporting = (type: ReportType) => reportTypes[type];

const createEventName = (context: string) => (name: string) =>
  `${context}/${name}`;

export const useReporting = (context?: string) => {
  const plausible = usePlausible();
  const nameFormatter = createEventName(context ?? "Event");

  const reportEvent = (context: string) => (name: string, props?: any) => {
    plausible(nameFormatter(name), { props });
  };

  const reportError = () => {
    // Report with sentry and plausible
  };

  return { reportEvent, reportError };
};
