import { DrawStatus } from "@/src/state/types";
import { createDraw } from "@/src/utils/gaming/Draws";
import { NextRequest, NextResponse } from "next/server";

const defaultDraw = createDraw(1).open();

const draws = [defaultDraw];

interface DrawEntryParams {
  drawNumber: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: DrawEntryParams }
) {
  const body = await req.json();
  const drawNumber = parseInt(params.drawNumber, 0);
  const draw = draws.find((draw) => draw.drawNumber === drawNumber);

  if (!draw) {
    return NextResponse.json({ error: "Draw not found" }, { status: 400 });
  }

  if (draw.status !== DrawStatus.Open) {
    return NextResponse.json({ error: "Draw is not open" }, { status: 400 });
  }

  if (!body.address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  if (draw.entries.some((entry) => entry.address === body.address)) {
    return NextResponse.json({ error: "Already entered" }, { status: 400 });
  }

  if (!body.name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  draw.entries.push({
    address: body.address,
    name: body.name,
  });

  return NextResponse.json(draw, { status: 200 });
}
