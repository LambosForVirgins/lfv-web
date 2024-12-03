import {
  atom,
  DefaultValue,
  selector,
  selectorFamily,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { type DrawRound, SubmissionEntry } from "./types";

import { useEffect, useState } from "react";

export const submissionsAtom = atom<SubmissionEntry[]>({
  key: "submission-entries-atom",
  default: [],
});

export const drawRoundsAtom = atom<DrawRound[] | [DrawRound]>({
  key: "draw-rounds-atom",
  default: [],
});

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

export const currentSeedSelector = selector<string>({
  key: "current-seed-selector",
  get: ({ get }) => {
    return get(roundSelector).seed;
  },
});

export const useEntries = () => {
  const [round, setRound] = useRecoilState(roundSelector);

  const setWinningEntry = (index: number) => {
    setRound((prev) => ({
      ...prev,
      winner: index,
    }));
  };

  return {
    setWinningEntry,
    entries: round.entries,
    isOpen: !round.winner,
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

export const useDraw = (drawNumber: number) => {
  const [round, setRound] = useRecoilState(drawRoundSelector(drawNumber));

  useEffect(() => {
    getCurrentDraw().then((draw) => {
      if (!draw) return;
      setRound(draw);
    });
  }, [setRound]);

  const enterDraw = async (details: { address: string; name: string }) => {
    const body = JSON.stringify(details);

    return await fetch(`/api/draw/${drawNumber}/enter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }).then((res) => res.json());
  };

  return {
    draw: round,
    enterDraw,
  };
};

export const useRollDraw = () => {
  const [loading, setLoading] = useState(false);
  const setRound = useSetRecoilState(roundSelector);

  const rollDrawHash = async (): Promise<DrawRound | null> => {
    try {
      setLoading(true);
      const result = await fetch("/api/draw/roll", { method: "POST" }).then(
        (res) => res.json() as Promise<DrawRound>
      );

      setRound(result);
      setLoading(false);

      return result;
    } catch (err) {
      setLoading(false);
      return null;
    }
  };

  return { roll: rollDrawHash, loading };
};
