import { MiddlewareConfig, NextResponse, NextMiddleware } from "next/server";

export const middleware: NextMiddleware = async (request) => {
  // Only redirect GET requests on root path
  if (request.nextUrl.pathname === "/" && request.method === "GET") {
    return NextResponse.redirect(new URL("/about", request.url));
  }

  // Let all other requests (HEAD, OPTIONS, etc.) pass through naturally
  return NextResponse.next();
};

export const config: MiddlewareConfig = {
  matcher: "/",
};
