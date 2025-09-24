import { NextRequest, NextResponse } from "next/server";

export async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/about", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
