import { NextRequest, NextResponse } from "next/server";
import { createClient } from "edgedb";

const client = createClient();

export async function GET(req: NextRequest) {
  const draws = await client.query(
    `
    select default::Draw {
      id,
      status,
      timeCloses,
      timeDraws,
      timeOpens,
      giveawayId := .giveaway.id
    }
    filter .status = DrawStatus.Open
  `
  );

  if (draws.length === 0) {
    return NextResponse.json({ error: "No open draws" }, { status: 400 });
  }

  return NextResponse.json(draws, { status: 200 });
}
