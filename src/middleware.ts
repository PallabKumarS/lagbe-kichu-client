import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

type DecodedUser = {
  userId: string;
  role: "admin" | "buyer" | "seller";
  email: string;
  iat: number;
  exp: number;
};

const getCurrentUser = async (): Promise<DecodedUser | null> => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as DecodedUser;
    return decodedData;
  } else {
    return null;
  }
};

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login"];

const roleBasedPrivateRoutes = {
  admin: [/^\/dashboard\/admin/],
  seller: [/^\/dashboard\/seller/],
  buyer: [/^\/dashboard\/buyer/, /^\/verify-payment/],
};

const sharedRoutes = [/^\/dashboard\/settings/, /^\/dashboard\/profile/];

export const middleware = async (request: NextRequest) => {
  const userInfo = await getCurrentUser();

  const { pathname } = request.nextUrl;

  console.log("userInfo:", userInfo);

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  if (sharedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo.role as Role];


    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/verify-payment(.*)"],
};
