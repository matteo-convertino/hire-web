import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard"
];

const publicRoutes = [
  "/sign-in",
  "/"
];

export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.get("access-token")?.value !== undefined;
  const pathname = req.nextUrl.pathname;

  if (protectedRoutes.includes(pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (publicRoutes.includes(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...publicRoutes]
};
