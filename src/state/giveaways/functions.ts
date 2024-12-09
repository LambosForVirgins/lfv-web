import { Giveaway } from "../types";

export const fetchGiveaways = async (): Promise<Giveaway[]> => {
  return await fetch("/api/giveaway").then((res) => res.json());
};
