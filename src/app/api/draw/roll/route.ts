import { DrawStatus } from "@/src/state/types";
import { AccountDB } from "@/src/utils/accounts/MockAccountDB";
import { DrawDB } from "@/src/utils/gaming/DrawDB";
import { mergeRandomly } from "@/src/utils/string/mergeRandom";
import { NextRequest, NextResponse } from "next/server";
import { v4 as generateRandom } from "uuid";

const rollPrice = 1;

export async function GET(req: NextRequest) {
  const draw = await DrawDB.getCurrentDraw();

  if (!draw) {
    return NextResponse.json({ error: "No open draws" }, { status: 400 });
  }

  if (draw.logs.length === 0) {
    return NextResponse.json({ error: "No rolls" }, { status: 400 });
  }

  const lastRoll = draw.logs[draw.logs.length - 1];

  return NextResponse.json(lastRoll, { status: 200 });
}

export async function POST(req: NextRequest) {
  const address = 0;
  const draw = await DrawDB.getCurrentDraw(),
    balance = await AccountDB.getBalance(address);

  console.log("Balance", balance);

  if (balance < rollPrice) {
    return NextResponse.json(
      { error: "Insufficient balance" },
      { status: 400 }
    );
  }

  if (!draw) {
    return NextResponse.json({ error: "No open draws" }, { status: 400 });
  }

  if (draw.status !== DrawStatus.Open) {
    return NextResponse.json({ error: "Draw is not open" }, { status: 400 });
  }

  const lastRoll = draw.logs[draw.logs.length - 1]?.hash || draw.seed;
  const hash = mergeRandomly(lastRoll, generateRandom().substring(0, 8));
  // Update balance
  await AccountDB.removeBalance(address, rollPrice);

  draw.logs.push({ hash, timeStamp: Date.now(), sender: String(address) });

  return NextResponse.json(draw, { status: 200 });
}
