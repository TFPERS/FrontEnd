import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.cookies["TFPERSTOKEN"];
  const { pathname, origin } = req.nextUrl;
  if (pathname == "/profile") {
    if (!token) {
      return NextResponse.redirect(`${origin}/login`);
    }
  }
  if (pathname == "/petition/follow") {
    if (!token) {
      return NextResponse.redirect(`${origin}/login`);
    }
  }
  return NextResponse.next();
}
