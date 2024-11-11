import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function to handle redirects
export function middleware(request: NextRequest) {
  // Check if the pathname starts with any of the locale paths
  return NextResponse.redirect(new URL("/", request.url));
}

// Specify the paths where the middleware will be active
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|fonts|js|favicon.ico|sitemap.xml|robots.txt).+)",
  ],
};
