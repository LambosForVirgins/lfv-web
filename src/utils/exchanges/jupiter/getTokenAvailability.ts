import { type JupiterQuoteError, JupiterQuoteErrorCode } from "../types";
import { getSwapQuote } from "./getSwapQuote";

export const getTokenAvailability = async (
  balance: number
): Promise<boolean> => {
  if (balance <= 0) return false;

  return getSwapQuote(balance)
    .then(() => true)
    .catch((error: JupiterQuoteError | any) => {
      if (error.errorCode === JupiterQuoteErrorCode.TokenNotListed) {
        return false;
      }

      return false;
    });
};
