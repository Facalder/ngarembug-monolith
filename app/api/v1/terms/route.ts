import { type NextRequest, NextResponse } from "next/server";
import { findTerms } from "@/repositories/terms.repositories";
import { termQuerySchema } from "@/schemas/terms.dto";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    // Parse and validate query parameters
    const parsedParams = termQuerySchema.safeParse(searchParams);

    if (!parsedParams.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsedParams.error.flatten() },
        { status: 400 },
      );
    }

    const result = await findTerms(parsedParams.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching terms:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
