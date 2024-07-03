import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { IUser } from "./types";

type Role = keyof typeof roleBasedRoutes;

const commonRoutes = [
  "/dashboard",
  "/dashboard/profile",
  "/dashboard/profile/edit",
  "/dashboard/change-password",
  "/travel-request",
];
const roleBasedRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  USER: [/^\/dashboard\/user/],
};
const authRoutes = ["/auth/login", "/auth/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // get authToken from cookies
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  console.log({ token, pathname });
  const res = NextResponse.next();

  // add the CORS headers to the response
  res.headers.append("Access-Control-Allow-Credentials", "true");
  res.headers.append(
    "Access-Control-Allow-Origin",
    "https://dream-destination-travel.vercel.app"
  );
  res.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT,OPTIONS"
  );
  res.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  // if token is not present redirect to login page
  if (!token) {
    if (authRoutes.includes(pathname)) {
      return res;
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  if (token && commonRoutes.includes(pathname)) {
    return res;
  }

  // get user role from token
  let decodedToken;
  decodedToken = jwtDecode(token) as IUser;
  const userRole = decodedToken?.role;

  /// allow user to access path according to their role
  const allowedRoutes = roleBasedRoutes[userRole as Role];

  if (userRole && allowedRoutes) {
    const isAllowed = allowedRoutes.some((route) => pathname.match(route));
    if (isAllowed) {
      return res;
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/:path*", "/dashboard/:path*", "/travel-request/:path*"],
};
