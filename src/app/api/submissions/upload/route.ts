import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  console.log(request);

  if (!address)
    return NextResponse.json({ error: "No address provided" }, { status: 400 });

  if (!request.body)
    return NextResponse.json({ error: "No file contents" }, { status: 400 });
  // Validate file contents

  // Validate address format
  // - Maybe validate address LFV balance?
  // - Maybe check for exiting submissions from the same address?
  // Store
  const blob = await put(address, request.body, {
    access: "public",
  });
  // Handle errors
  // Store the submission name, address, and reason
  // - Reference the stored file
  // - Set a review state
  // Maybe send a notification to the admin

  return NextResponse.json(blob);
}
