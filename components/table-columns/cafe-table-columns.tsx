import type { Column } from "@/components/table/table";
import { Badge } from "@/components/ui/badge";
import type { cafes } from "@/db/schema/cafes.schema";

export type Cafe = typeof cafes.$inferSelect;

export const cafeColumns: Column<Cafe>[] = [
  {
    key: "name",
    label: "Name",
    sortable: true,
    pinned: "left",
    className: "font-medium",
  },
  {
    key: "slug",
    label: "Slug",
    className: "text-muted-foreground",
  },
  {
    key: "cafeType",
    label: "Type",
    sortable: true,
    render: (row) => (
      <span className="capitalize">
        {row.cafeType.replace(/_/g, " ").toLowerCase()}
      </span>
    ),
  },
  {
    key: "region",
    label: "Region",
    sortable: true,
    render: (row) => (
      <span className="capitalize">{row.region.replace(/-/g, " ")}</span>
    ),
  },
  {
    key: "address",
    label: "Address",
    className: "max-w-[300px] whitespace-normal",
  },
  {
    key: "priceRange",
    label: "Price Range",
    sortable: true,
    render: (row) => (
      <span className="whitespace-nowrap">{row.priceRange}</span>
    ),
  },
  {
    key: "averageRating",
    label: "Rating",
    sortable: true,
    render: (row) => (
      <div className="flex items-center gap-1">
        <span>{Number(row.averageRating).toFixed(1)}</span>
        <span className="text-muted-foreground text-xs">
          ({row.totalReviews})
        </span>
      </div>
    ),
  },
  {
    key: "createdAt",
    label: "Created At",
    sortable: true,
    render: (row) => (
      <span>
        {new Date(row.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "updatedAt",
    label: "Updated At",
    sortable: true,
    render: (row) => (
      <span>
        {new Date(row.updatedAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    key: "contentStatus",
    label: "Status",
    sortable: true,
    render: (row) => {
      const status = (row.contentStatus || "draft").toLowerCase();

      return (
        <Badge
          variant={status === "draft" ? "secondary" : "default"}
          className={
            status === "archived"
              ? "border bg-secondary text-muted-foreground"
              : ""
          }
        >
          {status}
        </Badge>
      );
    },
  },
];
