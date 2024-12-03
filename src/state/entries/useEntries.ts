import { useRecoilState } from "recoil";
import { roundSelector } from "../draws/selectors";

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
