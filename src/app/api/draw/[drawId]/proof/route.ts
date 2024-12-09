import { DrawStatus } from "@/src/state/types";
import { DrawDB } from "@/src/utils/gaming/DrawDB";
import { NextRequest, NextResponse } from "next/server";

interface DrawProofParams {
  drawId: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: DrawProofParams }
) {
  const draw = await DrawDB.find(params.drawId);

  if (!draw) {
    return NextResponse.json({ error: "Draw not found" }, { status: 400 });
  }

  if (draw.status !== DrawStatus.Closed) {
    return NextResponse.json({ error: "Draw has not closed" }, { status: 400 });
  }

  return NextResponse.json(draw, { status: 200 });
}
