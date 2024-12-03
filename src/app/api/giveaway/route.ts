import { GiveawayDB } from "@/src/utils/gaming/GiveawayDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const giveaways = await GiveawayDB.all();

  return NextResponse.json(giveaways, { status: 200 });
}
