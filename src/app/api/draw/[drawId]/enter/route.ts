import { DrawStatus } from "@/src/state/types";
import { DrawDB } from "@/src/utils/gaming/DrawDB";
import { EntryDB } from "@/src/utils/gaming/EntryDB";
import { NextRequest, NextResponse } from "next/server";
import { v4 as generateRandom } from "uuid";

interface DrawEntryParams {
  drawId: string;
}

enum DrawEntryError {
  NotFound = "Draw not found",
  Closed = "Draw is not open",
  AlreadyEntered = "Already entered",
  MissingAddress = "Address is required",
  MissingName = "Name is required",
  InsufficientEntries = "You don't have enough entries",
}

const accountBalance = 1;

export async function POST(
  req: NextRequest,
  { params }: { params: DrawEntryParams }
) {
  const body = await req.json();
  const draw = await DrawDB.find(params.drawId);

  if (!draw) {
    return NextResponse.json(
      { error: DrawEntryError.NotFound },
      { status: 400 }
    );
  }

  if (draw.status !== DrawStatus.Open) {
    return NextResponse.json({ error: DrawEntryError.Closed }, { status: 400 });
  }

  if (accountBalance < draw.price) {
    return NextResponse.json(
      { error: DrawEntryError.InsufficientEntries },
      { status: 400 }
    );
  }

  if (!body.address) {
    return NextResponse.json(
      { error: DrawEntryError.MissingAddress },
      { status: 400 }
    );
  }

  if (draw.entries.some((entry) => entry.address === body.address)) {
    return NextResponse.json(
      { error: DrawEntryError.AlreadyEntered },
      { status: 400 }
    );
  }

  if (!body.name) {
    return NextResponse.json(
      { error: DrawEntryError.MissingName },
      { status: 400 }
    );
  }

  const entry = {
    id: generateRandom(),
    address: body.address,
    name: body.name,
  };

  EntryDB.addEntry(entry);

  return NextResponse.json(entry, { status: 200 });
}
