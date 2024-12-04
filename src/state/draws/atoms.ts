import { atom } from "recoil";
import { DrawRound, DrawStatus } from "../types";
import { createEntry } from "@/src/utils/builders/EntryBuilder";

export const drawRoundsAtom = atom<DrawRound[] | [DrawRound]>({
  key: "draw-rounds-atom",
  default: [
    {
      id: "cfd08335",
      drawNumber: 0,
      timeOpens: Date.now(),
      timeCloses: Date.now() + 96000000,
      timeDraws: Date.now() + 120000000,
      seed: "f7197faf",
      winner: null,
      status: DrawStatus.Open,
      entries: [
        createEntry(),
        createEntry(),
        createEntry(),
        createEntry(),
        createEntry(),
      ],
      logs: [],
    },
    {
      id: "1b91f9e4",
      drawNumber: 1,
      timeOpens: Date.now() + 96000000,
      timeCloses: Date.now() + 9600000000,
      timeDraws: Date.now() + 12000000000,
      seed: "31155b2e",
      winner: null,
      status: DrawStatus.Open,
      entries: [createEntry(), createEntry(), createEntry()],
      logs: [],
    },
  ],
});
