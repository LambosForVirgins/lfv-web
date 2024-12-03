import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { drawRoundSelector } from "./selectors";
import { getCurrentDraw } from "./functions";

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
