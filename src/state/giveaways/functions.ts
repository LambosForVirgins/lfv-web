import { DrawEntry, Giveaway } from "../types";

export const fetchGiveaways = async (): Promise<Giveaway[]> => {
  return await fetch("/api/giveaway").then((res) => res.json());
};

export const enterDraw = async (giveawayId: string, details: DrawEntry) => {
  const body = JSON.stringify(details);

  return await fetch(`/api/draw/${giveawayId}/enter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).then((res) => res.json());
};
