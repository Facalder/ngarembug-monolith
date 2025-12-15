"use client";

import type { Column } from "@/components/table";

interface Term {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
    contentStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export const termsColumns: Column<Term>[] = [
    {
        key: "name",
        label: "Name",
        sortable: true,
        className: "min-w-[200px] font-medium",
    },
    {
        key: "slug",
        label: "Slug",
        className: "text-muted-foreground",
    },
    {
        key: "description",
        label: "Description",
        className: "max-w-[300px] whitespace-normal md:max-w-[400px]",
        render: (row) => (
            <span className="block" title={row.description || ""}>
                {row.description || "-"}
            </span>
        ),
    },
    {
        key: "createdAt",
        label: "Created At",
        sortable: true,
        render: (row) =>
            new Date(row.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
    },
    {
        key: "updatedAt",
        label: "Updated At",
        render: (row) =>
            new Date(row.updatedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
    },
    {
        key: "contentStatus",
        label: "Status",
        sortable: true,
        render: (row) => (
            <span className="capitalize">
                {(row.contentStatus || "draft").toLowerCase()}
            </span>
        ),
    },
];
