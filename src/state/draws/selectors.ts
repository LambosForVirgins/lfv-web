import { DefaultValue, selector, selectorFamily } from "recoil";
import { DrawRound } from "../types";
import { drawRoundsAtom } from "./atoms";

export const drawRoundSelector = selectorFamily<DrawRound, number>({
  key: "draw-round-selector",
  get:
    (drawNumber: number) =>
    ({ get }) => {
      const rounds = get(drawRoundsAtom);
      return rounds[drawNumber];
    },
  set:
    (drawNumber: number) =>
    ({ set }, newValue: DrawRound | DefaultValue) => {
      if (newValue instanceof DefaultValue) return;

      set(drawRoundsAtom, (prev) => {
        const updated = [...prev];
        updated[drawNumber] = newValue;
        return updated;
      });
    },
});

export const currentSeedSelector = selector<string>({
  key: "current-seed-selector",
  get: ({ get }) => {
    return get(roundSelector).seed;
  },
});

export const roundSelector = selector<DrawRound>({
  key: "current-round-selector",
  get: ({ get }) => {
    const rounds = get(drawRoundsAtom);
    return rounds[rounds.length - 1];
  },
  set: ({ set }, newValue: DrawRound | DefaultValue) => {
    if (newValue instanceof DefaultValue) return;

    set(drawRoundsAtom, (prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = newValue;
      return updated;
    });
  },
});
