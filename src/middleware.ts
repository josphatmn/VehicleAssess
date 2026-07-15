import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const publicPaths = ["/login", "/api/auth", "/api/analyze", "/api/reports"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/" || publicPaths.some((p) => pathname.startsWith(p))) {
    if (pathname === "/login") {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|uploads).*)"],
};
