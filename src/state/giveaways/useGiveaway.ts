import { useRecoilValue } from "recoil";
import { giveawaySelector } from "./selectors";
import { enterDraw } from "./functions";
import { DrawEntry } from "../types";

export const useGiveaway = (giveawayId: string) => {
  const giveaway = useRecoilValue(giveawaySelector(giveawayId));

  return {
    giveaway,
    enterDraw: (details: DrawEntry) => enterDraw(giveawayId, details),
  };
};
