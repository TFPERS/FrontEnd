import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = getCookie("TFPERS.token");
  console.log(token);
  const { pathname, origin } = req.nextUrl;
  if (pathname == "/profile") {
    if (token) {
      return NextResponse.redirect(`${origin}/login`);
    }
  }
  return NextResponse.next();
}
