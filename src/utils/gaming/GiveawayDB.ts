import { type Giveaway } from "@/src/state/types";
import { v4 as generateRandom } from "uuid";

class GiveawayDatabase {
  private readonly _records: Giveaway[] = [];

  constructor(_initialDraws: Giveaway[] = []) {
    this._records = _initialDraws;
  }

  async all(): Promise<Giveaway[]> {
    return this._records;
  }

  async find(giveawayId: string): Promise<Giveaway | undefined> {
    return this._records.find((record) => record.id === giveawayId);
  }
}

export const GiveawayDB = new GiveawayDatabase([
  {
    id: generateRandom().slice(0, 8),
    title: "Daily Top Up",
    description:
      "Top up your holdings with 1000 and 10,000 VIRGIN awarded every day",
    active: true,
    providers: ["LambosForVirgins"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 1 }],
  },
  {
    id: generateRandom().slice(0, 8),
    title: "Gold Bullion",
    description: null,
    active: true,
    providers: ["ABC Bullion"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 1000 }],
  },
  {
    id: generateRandom().slice(0, 8),
    title: "Rolex Giveaway",
    description: null,
    active: true,
    providers: ["Some Watch Company"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 25_000 }],
  },
  {
    id: generateRandom().slice(0, 8),
    title: "$10K Cash",
    description: "$10,000 USD in cash",
    active: true,
    providers: ["The Whales"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 10_000 }],
  },
  {
    id: generateRandom().slice(0, 8),
    title: "Bahamas Escape",
    description:
      "Escape to the Bahama's with your favorite person on a one week getaway",
    active: true,
    providers: ["Travel World"],
    criteria: [{ type: "balance", parameter: "VIRGIN", value: 17_000 }],
  },
  {
    id: generateRandom().slice(0, 8),
    title: "$100M Lambo",
    description: "Celebrating $100M USD Market Cap with a Lamborghini giveaway",
    active: true,
    providers: ["LambosForVirgins"],
    criteria: [],
  },
]);
