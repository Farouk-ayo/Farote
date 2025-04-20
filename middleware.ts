import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of paths that don't require authentication
  const publicPaths = ["/login", "/register"];

  // Check if the requested path is a public path
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_AUTH_SCERET,
  });

  // If user is not authenticated and the path is not public, redirect to login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access login/register pages, redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
