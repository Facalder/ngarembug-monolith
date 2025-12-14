import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(process.env.BASE_API_URL as string)) {
    const authHeader = request.headers.get("authorization");
    const token = process.env.API_TOKEN;

    if (!token) {
      console.warn("There's no valid token");
      return NextResponse.next();
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header" },
        { status: 401 },
      );
    }

    const providedToken = authHeader.split(" ")[1];

    if (providedToken !== token) {
      return NextResponse.json({ error: "Invalid API Token" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: `${process.env.BASE_API_URL}/:path*`,
};
