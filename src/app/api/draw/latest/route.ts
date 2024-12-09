import { DrawDB } from "@/src/utils/gaming/DrawDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const draw = await DrawDB.getCurrentDraw();

  if (!draw) {
    return NextResponse.json({ error: "No open draws" }, { status: 400 });
  }

  return NextResponse.json(draw, { status: 200 });
}
