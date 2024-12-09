import { type DrawEntry, type DrawRound } from "../types";

export const getCurrentDraw = async (): Promise<DrawRound | null> => {
  try {
    const result = await fetch("/api/draw").then((res) => res.json());

    console.log(JSON.stringify(result, null, " "));

    return result;
  } catch (err) {
    return null;
  }
};

export const getAllDraws = async (): Promise<DrawRound[]> =>
  await fetch("/api/draw").then<DrawRound[]>((res) => res.json());

export const enterDraw = async (drawId: string, details: DrawEntry) => {
  const body = JSON.stringify(details);

  return await fetch(`/api/draw/${drawId}/enter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).then((res) => res.json());
};

export const rollDraw = async (drawId: string): Promise<DrawRound> =>
  await fetch(`/api/draw/${drawId}/remix`, {
    method: "POST",
  }).then<DrawRound>((res) => res.json());
