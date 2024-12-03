import { DrawRound } from "../types";

export const getCurrentDraw = async (): Promise<DrawRound | null> => {
  try {
    const result = await fetch("/api/draw").then((res) => res.json());

    console.log(JSON.stringify(result, null, " "));

    return result;
  } catch (err) {
    return null;
  }
};
