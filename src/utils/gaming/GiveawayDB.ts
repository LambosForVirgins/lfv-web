import { type Giveaway } from "@/src/state/types";
import { v4 as generateRandom } from "uuid";

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

export const GiveawayDB = new GiveawayDatabase([
  {
    id: "bc923fbe",
    title: "Daily Top Up",
    description:
      "Top up your holdings with 1000 and 10,000 VIRGIN awarded every day",
    active: true,
    providers: ["LambosForVirgins"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 1 }],
  },
  {
    id: "b079ae3a",
    title: "Gold Bullion",
    description: null,
    active: true,
    providers: ["ABC Bullion"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 1000 }],
  },
  {
    id: "fa36b192",
    title: "Rolex Giveaway",
    description: null,
    active: true,
    providers: ["Some Watch Company"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 25_000 }],
  },
  {
    id: "aa22a5f7",
    title: "$10K Cash",
    description: "$10,000 USD in cash",
    active: true,
    providers: ["The Whales"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 10_000 }],
  },
  {
    id: "c57d992d",
    title: "Bahamas Escape",
    description:
      "Escape to the Bahama's with your favorite person on a one week getaway",
    active: true,
    providers: ["Travel World"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 17_000 }],
  },
  {
    id: "005cc69b",
    title: "$100M Lambo",
    description: "Celebrating $100M USD Market Cap with a Lamborghini giveaway",
    active: true,
    providers: ["LambosForVirgins"],
    criteria: [],
  },
]);
