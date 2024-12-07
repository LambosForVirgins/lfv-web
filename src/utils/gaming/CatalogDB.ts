class CatalogDatabase {
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

export const GiveawayDB = new CatalogDatabase([
  {
    id: "bc389fbe",
    title: "Extra Virgin Baby Oil",
    description:
      "Always stay prepared for Diddy with this extra virgin baby oil.",
    active: true,
    providers: ["LambosForVirgins"],
    cost: 1000,
  },
]);
