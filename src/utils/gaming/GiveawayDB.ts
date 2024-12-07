import { type Giveaway } from "@/src/state/types";
import { v4 as generateRandom } from "uuid";
import { DrawDB } from "./DrawDB";
import { createDraw } from "./DrawBuilder";

class GiveawayDatabase {
  private readonly _records: Giveaway[] = [];

  constructor(_initialGiveaways: Giveaway[] = []) {
    this._records = _initialGiveaways;
  }

  async all(options?: { filters?: { active?: boolean } }): Promise<Giveaway[]> {
    if (options?.filters) {
      return this._records.filter((record) => {
        if (options.filters?.active) {
          return record.active;
        }
      });
    }

    return this._records;
  }

  async find(giveawayId: string): Promise<Giveaway | undefined> {
    return this._records.find((record) => record.id === giveawayId);
  }
}
DrawDB.addDraw(createDraw(1, "36ffef35"));
DrawDB.addDraw(createDraw(2, "2a934bf9").open());

export const GiveawayDB = new GiveawayDatabase([
  {
    id: "bc923fbe",
    title: "Daily Top Up",
    description:
      "Top up your holdings with 10,000 and 100,000 VIRGIN awarded every day",
    active: true,
    providers: ["LambosForVirgins"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 1 }],
    draws: ["36ffef35", "2a934bf9"],
  },
  {
    id: "b079ae3a",
    title: "Gold Bullion",
    description: null,
    active: true,
    providers: ["ABC Bullion"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 1000 }],
    draws: [],
  },
  {
    id: "b079ae3a",
    title: "Jeffrey's Island",
    description: `Only the purest virgins can qualify for this giveaway.`,
    active: true,
    providers: ["Gates Foundation"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 100_000 }],
    draws: [],
  },
  {
    id: "fa36b192",
    title: "Rolex Giveaway",
    description: null,
    active: true,
    providers: ["Some Watch Company"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 25_000 }],
    draws: [],
  },
  {
    id: "aa22a5f7",
    title: "$10K Cash",
    description: "$10,000 USD in cash",
    active: true,
    providers: ["The Whales"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 10_000 }],
    draws: [],
  },
  {
    id: "c57d992d",
    title: "Bahamas Escape",
    description:
      "Escape to the Bahama's with your favorite person on a one week getaway",
    active: true,
    providers: ["Travel World"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 17_000 }],
    draws: [],
  },
  {
    id: "c57d523i",
    title: "Baby Jesus",
    description: "Mary Magdalene did it with her legs closed.",
    active: false,
    providers: ["God"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 17_000 }],
    draws: [],
  },
  {
    id: "005cc69b",
    title: "$100M Lambo",
    description: "Celebrating $100M USD Market Cap with a Lamborghini giveaway",
    active: true,
    providers: ["LambosForVirgins"],
    criteria: [],
    draws: [],
  },
]);
