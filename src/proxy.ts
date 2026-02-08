import { ProxyConfig, NextResponse, NextProxy } from "next/server";

export const proxy: NextProxy = async (request) => {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/about", request.url));
  }

  return NextResponse.next();
};

export const config: ProxyConfig = {
  matcher: "/",
};
