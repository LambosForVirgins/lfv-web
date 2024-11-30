import { AccountDB } from "@/src/utils/accounts/MockAccountDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = 0;
  const balance = await AccountDB.getBalance(address);

  return NextResponse.json({ balance }, { status: 200 });
}

export async function POST(req: NextRequest) {
  const address = 0;
  const tx = {};

  console.log("Create transaction to accept VIRGIN payment for credits");

  await AccountDB.addBalance(address, 10);

  const balance = await AccountDB.getBalance(address);

  return NextResponse.json({ tx, balance }, { status: 200 });
}
