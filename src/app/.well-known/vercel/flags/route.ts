import { NextResponse, type NextRequest } from "next/server";
import { verifyAccess, type ApiData } from "@vercel/flags";

export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>({
    definitions: {
      entrySubmissions: {
        description: "Controls whether the entry submission form is available.",
        origin: "/#submissions",
        options: [
          { value: false, label: "Off" },
          { value: true, label: "On" },
        ],
      },
    },
  });
}
