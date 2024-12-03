import { useState } from "react";
import { useGiveaway } from "./useGiveaway";

export const useDailyGiveaway = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [entries, setEntries] = useState([]);

  return useGiveaway("bc923fbe");
};
