import { NextResponse, type NextRequest } from "next/server";

const ACCESS_COOKIE_NAME = "iot_update_tracker_access";
const protectedPages = ["/dashboard", "/devices", "/alerts"];
const protectedApis = ["/api/devices", "/api/scan", "/api/alerts"];

function isProtected(pathname: string, routes: string[]) {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasAccess = Boolean(request.cookies.get(ACCESS_COOKIE_NAME)?.value);

  if (!hasAccess && isProtected(pathname, protectedPages)) {
    const redirectUrl = new URL("/unlock", request.url);
    redirectUrl.searchParams.set("next", pathname);

    return NextResponse.redirect(redirectUrl);
  }

  if (!hasAccess && isProtected(pathname, protectedApis)) {
    return NextResponse.json({ error: "Subscription required" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/devices/:path*", "/alerts/:path*", "/api/:path*"]
};
