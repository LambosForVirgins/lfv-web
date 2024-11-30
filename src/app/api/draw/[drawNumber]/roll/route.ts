import { DrawStatus } from "@/src/state/types";
import { createDraw } from "@/src/utils/gaming/Draws";
import { mergeRandomly } from "@/src/utils/string/mergeRandom";
import { NextRequest, NextResponse } from "next/server";
import { v4 as generateRandom } from "uuid";

const defaultDraw = createDraw(0);

const draws = [defaultDraw];

interface RouteParams {
  drawNumber: string;
}

export async function GET(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  const drawNumber = parseInt(params.drawNumber, 0);
  const draw = draws.find((draw) => draw.drawNumber === drawNumber);

  if (!draw) {
    return NextResponse.json({ error: "Draw not found" }, { status: 400 });
  }

  return NextResponse.json(draw, { status: 200 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: RouteParams }
) {
  const drawNumber = parseInt(params.drawNumber, 0);
  const draw = draws.find((draw) => draw.drawNumber === drawNumber);

  if (!draw) {
    return NextResponse.json({ error: "Draw not found" }, { status: 400 });
  }

  if (draw.status !== DrawStatus.Open) {
    return NextResponse.json({ error: "Draw is not open" }, { status: 400 });
  }

  const lastRoll = draw.logs[draw.logs.length - 1]?.hash || draw.seed;
  const hash = mergeRandomly(lastRoll, generateRandom().substring(0, 8));

  draw.logs.push({ hash, timeStamp: Date.now(), sender: "0x" });

  return NextResponse.json(draw, { status: 200 });
}
