import { NextMiddleware, NextResponse } from "next/server";

export const middleware: NextMiddleware = async (request) => {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/about", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/",
};
