import { TokenMint } from "../types";
import { RaydiumPricingResponse } from "./types";

enum RaydiumTokenTag {
  Listed = "lst",
  Community = "community",
}

export const getMarketQuotes = require("../jupiter/getMarketQuotes");
