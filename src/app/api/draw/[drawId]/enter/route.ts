import { DrawStatus } from "@/src/state/types";
import { DrawDB } from "@/src/utils/gaming/DrawDB";
import { NextRequest, NextResponse } from "next/server";
import { v4 as generateRandom } from "uuid";

interface DrawEntryParams {
  drawId: string;
}

export async function POST(
  req: NextRequest,
  { params }: { params: DrawEntryParams }
) {
  const body = await req.json();
  const draw = await DrawDB.find(params.drawId);

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

  const entry = {
    id: generateRandom(),
    address: body.address,
    name: body.name,
  };

  draw.entries.push(entry);

  return NextResponse.json(entry, { status: 200 });
}
