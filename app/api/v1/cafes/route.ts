import { type NextRequest, NextResponse } from "next/server";
import { findCafes } from "@/repositories/cafes.repositories";
import { cafeQuerySchema } from "../../../../schemas/cafes.dto";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    // Parse and validate query parameters
    const parsedParams = cafeQuerySchema.safeParse(searchParams);

    if (!parsedParams.success) {
      console.error("Validation Error Params:", parsedParams.error);
      return NextResponse.json(
        { error: "Invalid parameters", details: parsedParams.error.flatten() },
        { status: 400 },
      );
    }

    console.log("Fetching cafes with params:", parsedParams.data);

    const result = await findCafes(parsedParams.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching cafes:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

import type { ZodError } from "zod";
import { createCafe } from "@/repositories/cafes.repositories";
import { createCafeSchema } from "../../../../schemas/cafes.dto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedData = createCafeSchema.parse(body);

    const newCafe = await createCafe(parsedData);

    return NextResponse.json(newCafe, { status: 201 });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", details: (error as ZodError).flatten() },
        { status: 400 },
      );
    }

    console.error("Error creating cafe:", error);
    // Handle specific DB errors like unique constraints if needed
    if (error.code === "23505") {
      // Postgres unique constraint
      return NextResponse.json(
        { error: "Unique constraint violation", details: error.detail },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
