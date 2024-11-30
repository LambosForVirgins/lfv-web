import { v4 as generateRandom } from "uuid";
import { deriveNumberFromSeed } from "../string/deriveNumberFromSeed";
import {
  type DrawLog,
  DrawStatus,
  type DrawRound,
  type DrawEntry,
} from "@/src/state/types";

class DrawBuilder implements DrawRound {
  readonly drawNumber: number;
  readonly seed: string;
  status: DrawStatus;
  timeOpens: number;
  timeCloses: number;
  timeDraws: number;
  winner: number;
  readonly logs: DrawLog[] = [];
  readonly entries: DrawEntry[] = [
    { address: generateRandom(), name: "Tommy" },
    { address: generateRandom(), name: "Mitch" },
    { address: generateRandom(), name: "Hudson" },
    { address: generateRandom(), name: "Thomas" },
    { address: generateRandom(), name: "Phu" },
  ];

  constructor(_drawNumber: number, _duration: number = 60) {
    this.drawNumber = _drawNumber;
    this.timeOpens = Date.now();
    this.timeCloses = Date.now() + _duration * 60 * 1000;
    this.timeDraws = this.timeCloses + 3600000;
    this.seed = generateRandom().substring(0, 8);
    this.status = DrawStatus.Pending;
    this.winner = this.getSelectedEntry();
  }

  open() {
    if (this.status !== DrawStatus.Pending)
      throw new Error("Draw status pending required");
    this.status = DrawStatus.Open;
    return this;
  }

  withStatus(status: DrawStatus) {
    this.status = status;
    return this;
  }

  withLogs(logs: DrawLog[]) {
    // TODO: Iterate logs and add unique
    return this;
  }

  getSelectedEntry(): number {
    return deriveNumberFromSeed(this.seed, {
      max: this.entries.length,
      skip: this.winner,
    });
  }

  toJSON(): DrawRound {
    return {
      drawNumber: this.drawNumber,
      seed: this.seed,
      status: this.status,
      timeOpens: this.timeOpens,
      timeCloses: this.timeCloses,
      timeDraws: this.timeDraws,
      winner: this.winner,
      logs: this.logs,
      entries: this.entries,
    };
  }
}

export const createDraw = (drawNumber: number) => new DrawBuilder(drawNumber);
