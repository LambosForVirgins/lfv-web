import { atom, useRecoilValue } from "recoil";
import { type Giveaway } from "./types";

const fetchGiveaways = async (): Promise<Giveaway[]> => {
  return await fetch("/api/giveaway").then((res) => res.json());
};

const giveawayAtom = atom<Giveaway[]>({
  key: "giveaway-atom",
  default: fetchGiveaways(),
});

export const useGiveaways = () => {
  const giveaways = useRecoilValue(giveawayAtom);

  return {
    giveaways,
  };
};
