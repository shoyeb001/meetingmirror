import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get("connect.sid")?.value;
    const isLoggedIn = Boolean(sessionToken);
    const pathname = request.nextUrl.pathname;
    if (pathname.startsWith("/login") && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (pathname.startsWith("/dashboard") && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: ["/login", "/dashboard/:path*"]
}