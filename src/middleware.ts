import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/:path*",
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get("authorization");
  const url = req.nextUrl;

  const validUser = process.env.BASIC_AUTH_USER;
  const validPassWord = process.env.BASIC_AUTH_PASSWORD;
  const doesNotUseBasicAuth = validUser === "" && validPassWord === "";

  if (doesNotUseBasicAuth) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    if (user === validUser && pwd === validPassWord) {
      return NextResponse.next();
    }
  }

  url.pathname = "/api/auth";

  return NextResponse.rewrite(url);
}
