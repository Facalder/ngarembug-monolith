import { type NextRequest, NextResponse } from "next/server";
import { findCafes } from "@/repositories/cafes.repositories";
import { cafeQuerySchema } from "@/schemas/cafes.dto";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    // Parse and validate query parameters
    const parsedParams = cafeQuerySchema.safeParse(searchParams);

    if (!parsedParams.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsedParams.error.flatten() },
        { status: 400 },
      );
    }

    const result = await findCafes(parsedParams.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching cafes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
