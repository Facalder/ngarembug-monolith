import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createRecommendation } from "@/repositories/cafe-recommendations.repositories";
import { createRecommendationSchema } from "@/schemas/cafe-recommendations.dto";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validatedData = createRecommendationSchema.parse(body);

    const recommendation = await createRecommendation(
      session.user.id,
      validatedData,
    );

    return NextResponse.json({
      message: "Recommendation created successfully",
      data: recommendation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Error creating recommendation:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
