import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse<unknown> {
  // Only handle GET requests on the exact root path
  if (request.nextUrl.pathname === "/" && request.method === "GET") {
    // Redirect root to /about
    return NextResponse.redirect(new URL("/about", request.url));
  }

  // For all other requests (HEAD, OPTIONS, other paths), pass through to Next.js
  return NextResponse.next();
}

// This config ensures middleware only runs on the root path
export const config = {
  matcher: ["/"],
};
