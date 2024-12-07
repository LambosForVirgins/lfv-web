import { EntryCriteria } from "@/src/state/types";

export const getProgressFromBalance = (
  criteria: EntryCriteria[],
  balance: number
) => {
  return (
    balance /
    criteria.reduce((sum, criterion) => {
      if (criterion.type === "balance" && criterion.value) {
        if (criterion.value instanceof Array) {
          return sum + criterion.value[0];
        }

        return sum + criterion.value;
      }

      return sum;
    }, 0)
  );
};
