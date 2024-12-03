import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { DrawRound } from "../types";
import { roundSelector } from "./selectors";

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
