import { type NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const baseApiUrl = process.env.BASE_API_URL;

  if (baseApiUrl && request.nextUrl.pathname.startsWith(baseApiUrl)) {
    const authHeader = request.headers.get("authorization");
    const token = process.env.API_TOKEN;

    if (!token) {
      console.warn("API_TOKEN is not defined in environment variables");
      return NextResponse.json(
        { error: "Server Configuration Error: API_TOKEN missing" },
        { status: 500 }
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid Authorization header", status: 401 },
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
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
