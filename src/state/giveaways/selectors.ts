import { DefaultValue, selectorFamily } from "recoil";
import { Giveaway } from "../types";
import { giveawaysAtom } from "./atoms";

export const giveawaySelector = selectorFamily<Giveaway | null, string>({
  key: "giveaways-selector",
  get:
    (giveawayId: string) =>
    ({ get }) => {
      const rounds = get(giveawaysAtom);
      const record = rounds.find(({ id }) => id === giveawayId);
      return record ?? null;
    },
  set:
    (giveawayId: string) =>
    ({ set }, newValue: Giveaway | DefaultValue) => {
      if (newValue instanceof DefaultValue) return;

      set(giveawaysAtom, (prev) => {
        const index = prev.findIndex(({ id }) => id === giveawayId);
        const updated = [...prev];
        if (index) {
          updated[index] = newValue;
        } else {
          updated.push(newValue);
        }

        return updated;
      });
    },
});
