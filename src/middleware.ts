import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AuthCookies } from "@/utils/AuthCookies";

const protectedRoutes = [
  "/dashboard",
  "/logout",
  "/job-positions/add"
];

const publicRoutes = [
  "/sign-in",
  "/"
];

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get(AuthCookies.ACCESS_TOKEN)?.value !== undefined;
  const isAuthenticatedAsGuest = req.cookies.get(AuthCookies.ACCESS_TOKEN_GUEST)?.value !== undefined;
  const pathname = req.nextUrl.pathname;

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (pathname.includes("/interviews") && !isAuthenticatedAsGuest) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (publicRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - favicon.ico (favicon file)
     * - _next internal calls
     */
    "/((?!api|static|favicon.ico|_next).*)"
  ]
};
