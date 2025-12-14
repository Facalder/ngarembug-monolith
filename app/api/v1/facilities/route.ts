import { type NextRequest, NextResponse } from "next/server";
import {
  createFacility,
  findFacilities,
} from "@/repositories/facilities.repositories";
import {
  createFacilitySchema,
  facilityQuerySchema,
} from "@/schemas/facilities.dto";

export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);

    const parsedParams = facilityQuerySchema.safeParse(searchParams);

    if (!parsedParams.success) {
      return NextResponse.json(
        { error: "Invalid parameters", details: parsedParams.error.flatten() },
        { status: 400 },
      );
    }

    const result = await findFacilities(parsedParams.data);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedBody = createFacilitySchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsedBody.error.flatten() },
        { status: 400 },
      );
    }

    const newFacility = await createFacility(parsedBody.data);
    return NextResponse.json(newFacility, { status: 201 });
  } catch (error) {
    console.error("Error creating facility:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
