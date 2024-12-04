import { useState } from "react";
import { useGiveaway } from "./useGiveaway";

export const useDailyGiveaway = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [entries, setEntries] = useState([]);

  const { giveaway, enterDraw } = useGiveaway("bc923fbe");

  const currentDraw = giveaway?.draws[0];

  return {
    draw: currentDraw,
    enterDraw,
  };
};
