import { useRecoilValue } from "recoil";
import { giveawaysAtom } from "./atoms";

export const useGiveaways = () => {
  const giveaways = useRecoilValue(giveawaysAtom);

  return {
    giveaways,
  };
};
