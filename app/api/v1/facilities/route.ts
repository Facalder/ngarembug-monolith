import { type NextRequest, NextResponse } from "next/server";
import type { ZodError } from "zod";
import {
  createFacility,
  findFacilities,
  updateFacility,
} from "@/repositories/facilities.repositories";
import {
  createFacilitySchema,
  facilityQuerySchema,
  draftFacilitySchema,
  publishFacilitySchema,
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
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate based on contentStatus
    const schema = body.contentStatus === "DRAFT" ? draftFacilitySchema : publishFacilitySchema;
    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Validation Error", details: parsedBody.error.flatten() },
        { status: 400 },
      );
    }

    const newFacility = await createFacility(parsedBody.data as any);
    return NextResponse.json({ data: newFacility }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating facility:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Unique constraint violation", details: error.detail },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required for updates" },
        { status: 400 },
      );
    }

    // Validate based on contentStatus
    const schema = body.contentStatus === "DRAFT" ? draftFacilitySchema : publishFacilitySchema;
    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Validation Error", details: parsedBody.error.flatten() },
        { status: 400 },
      );
    }

    const updatedFacility = await updateFacility(id, parsedBody.data as any);
    return NextResponse.json({ data: updatedFacility }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating facility:", error);
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Unique constraint violation", details: error.detail },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message || String(error) },
      { status: 500 },
    );
  }
}
