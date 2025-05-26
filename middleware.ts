import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of paths that don't require authentication
  const publicPaths = [
    "/", // Homepage is now public
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  // List of paths that require authentication
  const protectedPaths = ["/dashboard"];

  // Check if the requested path is public
  const isPublicPath = publicPaths.some((path) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path)
  );

  // Check if the requested path requires authentication
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Get the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is not authenticated and trying to access protected path, redirect to login
  if (!token && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated and trying to access login/register pages, redirect to home
  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)",
  ],
};
