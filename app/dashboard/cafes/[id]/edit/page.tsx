import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import DashboardTitle from "@/components/dashboard-title";
import { CafeForm } from "@/components/form/cafe-form";
import { Shell } from "@/components/shell";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import { db } from "@/db";
import { cafes } from "@/db/schema/cafes.schema";

interface EditCafePageProps {
    params: Promise<{ id: string }>;
}

async function getCafe(id: string) {
    const cafe = await db.query.cafes.findFirst({
        where: eq(cafes.id, id),
    });

    return cafe;
}

export async function generateMetadata({ params }: EditCafePageProps) {
    const { id } = await params;
    const cafe = await getCafe(id);

    return {
        title: cafe ? `Edit ${cafe.name}` : "Edit Kafe",
        description: "Edit data kafe",
    };
}

export default async function EditCafePage({ params }: EditCafePageProps) {
    const { id } = await params;
    const cafe = await getCafe(id);

    if (!cafe) {
        notFound();
    }

    return (
        <Shell>
            <div className="flex flex-col gap-4">
                <DashboardBreadcrumb
                    items={[
                        { label: "Kafe", href: "/dashboard/cafes" },
                        {
                            label: cafe.name,
                            href: `/dashboard/cafes/${id}/edit`,
                            active: true,
                        },
                    ]}
                />
                <DashboardTitle
                    title={`Edit ${cafe.name}`}
                    description="Ubah detail informasi kafe di bawah ini."
                />
                <CafeForm initialData={cafe as any} />
            </div>
        </Shell>
    );
}
