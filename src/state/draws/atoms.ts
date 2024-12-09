import { atom } from "recoil";
import { type DrawRound } from "../types";
import { getAllDraws } from "./functions";

export const drawRoundsAtom = atom<DrawRound[] | [DrawRound]>({
  key: "draw-rounds-atom",
  default: getAllDraws(),
});
