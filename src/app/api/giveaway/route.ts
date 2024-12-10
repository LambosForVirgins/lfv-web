import { NextRequest, NextResponse } from "next/server";

import { createClient } from "edgedb";

const client = createClient();

export async function GET(req: NextRequest) {
  const giveaways = await client.query(
    `
    select Giveaway {
      id,
      title,
      description,
      providers: {
        name
      },
      draws: {
        timeOpens,
        timeCloses,
        timeDraws,
        status
      } filter .status = DrawStatus.Open
    } filter .active = true
  `
  );

  return NextResponse.json(giveaways, { status: 200 });
}
