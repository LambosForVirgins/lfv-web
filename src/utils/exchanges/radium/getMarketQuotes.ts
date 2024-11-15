import { TokenMint } from "../types";
import { RadiumPricingResponse } from "./types";

enum RadiumTokenTag {
  Listed = "lst",
  Community = "community",
}

export const getMarketQuotes = require("../jupiter/getMarketQuotes");
