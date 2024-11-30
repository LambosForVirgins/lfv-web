import { atom, DefaultValue, selector, useRecoilState } from "recoil";
import { type DrawRound, SubmissionEntry } from "./types";
import { v4 as generateRandom } from "uuid";
import { mergeRandomly } from "../utils/string/mergeRandom";

import { useEffect } from "react";

export const submissionsAtom = atom<SubmissionEntry[]>({
  key: "submission-entries-atom",
  default: [],
});

export const drawRoundsAtom = atom<DrawRound[] | [DrawRound]>({
  key: "draw-rounds-atom",
  default: [],
});

export const currentRoundSelector = selector<DrawRound>({
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

export const currentSeedSelector = selector<string>({
  key: "current-seed-selector",
  get: ({ get }) => {
    return get(currentRoundSelector).seed;
  },
});

export const useEntries = () => {
  const [currentRound, setCurrentDraw] = useRecoilState(currentRoundSelector);

  const setWinningEntry = (index: number) => {
    setCurrentDraw((prev) => ({
      ...prev,
      winner: index,
    }));
  };

  return {
    setWinningEntry,
    entries: currentRound.entries,
    isOpen: !currentRound.winner,
  };
};

const getCurrentDraw = async (): Promise<DrawRound | null> => {
  try {
    const result = await fetch("/api/draw").then((res) => res.json());

    console.log(JSON.stringify(result, null, " "));

    return result;
  } catch (err) {
    return null;
  }
};

export const useDraw = () => {
  const [currentRound, setCurrentDraw] = useRecoilState(currentRoundSelector);

  useEffect(() => {
    getCurrentDraw().then((draw) => {
      if (!draw) return;
      setCurrentDraw(draw);
    });
  }, [setCurrentDraw]);

  const rollDrawHash = (seed: string) => {
    setCurrentDraw((prev) => ({
      ...prev,
      seed: mergeRandomly(seed, generateRandom().substring(0, 8)),
    }));
  };

  return {
    draw: currentRound,
    roll: rollDrawHash,
  };
};
