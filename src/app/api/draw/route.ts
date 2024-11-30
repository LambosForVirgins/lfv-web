import { createDraw } from "@/src/utils/gaming/Draws";
import { NextRequest, NextResponse } from "next/server";

const defaultDraw = createDraw(0);

const draws = [defaultDraw];

export async function GET(req: NextRequest) {
  const draw = draws[draws.length - 1];

  if (!draw) {
    return NextResponse.json({ error: "No open draws" }, { status: 400 });
  }

  return NextResponse.json(draw, { status: 200 });
}
