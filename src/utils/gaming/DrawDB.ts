import { type DrawRound } from "@/src/state/types";
import { createDraw } from "./DrawBuilder";

class DrawDatabase {
  private readonly _draws: DrawRound[] = [];

  constructor(_initialDraws: DrawRound[] = []) {
    this._draws = _initialDraws;
  }

  async find(drawNumber: number): Promise<DrawRound | undefined> {
    return this._draws.find((draw) => draw.drawNumber === drawNumber);
  }

  async getCurrentDraw(): Promise<DrawRound | undefined> {
    return this._draws[this._draws.length - 1];
  }
}
const defaultDraw = createDraw(1).open();

export const DrawDB = new DrawDatabase([defaultDraw]);
