import { atom } from "recoil";
import { DrawRound } from "../types";

export const drawRoundsAtom = atom<DrawRound[] | [DrawRound]>({
  key: "draw-rounds-atom",
  default: [],
});
