import { type DrawRound } from "@/src/state/types";
import { createDraw } from "./DrawBuilder";

class DrawDatabase {
  private readonly _draws: DrawRound[] = [];

  constructor(_initialDraws: DrawRound[] = []) {
    this._draws = _initialDraws;
  }

  async addDraw(draw: DrawRound): Promise<void> {
    this._draws.push(draw);
  }

  async find(drawId: string): Promise<DrawRound | undefined> {
    return this._draws.find((draw) => draw.id === drawId);
  }

  async getCurrentDraw(): Promise<DrawRound | undefined> {
    return this._draws[this._draws.length - 1];
  }
}
const defaultDraw = createDraw(1, "bc923fbe").open();

export const DrawDB = new DrawDatabase([defaultDraw]);
