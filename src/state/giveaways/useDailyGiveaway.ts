import { useMemo, useState } from "react";
import { useGiveaway } from "./useGiveaway";

export const useDailyGiveaway = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [entries, setEntries] = useState([]);

  const { giveaway, enterDraw } = useGiveaway("bc923fbe");

  const currentDraw = useMemo(() => {
    return giveaway?.draws[giveaway.draws.length - 1];
  }, [giveaway]);

  return {
    draw: currentDraw,
    enterDraw,
  };
};
