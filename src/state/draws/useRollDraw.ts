import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { DrawRound } from "../types";
import { roundSelector } from "./selectors";

export const useRollDraw = (drawId: string) => {
  const [loading, setLoading] = useState(false);
  const setRound = useSetRecoilState(roundSelector(drawId));
  const [selected, setSelected] = useState(0);

  const rollDrawHash = async (): Promise<DrawRound | null> => {
    try {
      setLoading(true);
      const result = await fetch(`/api/draw/${drawId}/remix`, {
        method: "POST",
      }).then((res) => res.json() as Promise<DrawRound>);

      setRound(result);
      setSelected(result.logs.length);
      setLoading(false);

      return result;
    } catch (err) {
      setLoading(false);
      return null;
    }
  };

  return { roll: rollDrawHash, selected, loading };
};
