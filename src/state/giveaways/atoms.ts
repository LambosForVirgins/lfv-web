import { atom } from "recoil";
import { type Giveaway } from "../types";
import { fetchGiveaways } from "./functions";

export const giveawaysAtom = atom<Giveaway[]>({
  key: "giveaways-atom",
  default: fetchGiveaways(),
});
