import { type JupiterQuoteError, JupiterQuoteErrorCode } from "../types";
import { getSwapQuote } from "./getSwapQuote";

export const getTokenAvailability = async (): Promise<boolean> =>
  getSwapQuote(0)
    .then(() => true)
    .catch((error: JupiterQuoteError | any) => {
      if (error.errorCode === JupiterQuoteErrorCode.Unavailable) {
        return false;
      }

      return true;
    });
