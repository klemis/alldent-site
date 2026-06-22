import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Prevent indexing of Vercel-generated preview/alias domains (*.vercel.app).
 * The production domain (alldent-stomatologia.pl) is unaffected and stays
 * indexable; the canonical tags already point there, this just removes any
 * duplicate-content ambiguity.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get("host") ?? "";

  if (host.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Run on page requests; skip Next.js internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
