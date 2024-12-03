import { GiveawayDB } from "@/src/utils/gaming/GiveawayDB";
import { NextRequest, NextResponse } from "next/server";

interface DrawEntryParams {
  giveawayId: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: DrawEntryParams }
) {
  const giveaway = await GiveawayDB.find(params.giveawayId);

  if (!giveaway) {
    return NextResponse.json({ error: "Giveaway not found" }, { status: 400 });
  }

  return NextResponse.json(giveaway, { status: 200 });
}
