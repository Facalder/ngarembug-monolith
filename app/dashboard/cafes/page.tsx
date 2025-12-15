"use client";

import DashboardTitle from "@/components/dashboard-title";
import { DataTable } from "@/components/table";
import { cafeColumns } from "@/components/table-columns/cafe-table-columns";

export default function CafePage() {
  const filters = [
    {
      key: "types",
      label: "Type",
      options: [
        { label: "Indoor", value: "INDOOR_CAFE" },
        { label: "Outdoor", value: "OUTDOOR_CAFE" },
        { label: "Industrial", value: "INDUSTRIAL_CAFE" },
      ],
    },
  ];

  return (
    <>
      <DashboardTitle
        title="Halaman Cafe"
        subtitle="Kelola data cafe"
        createLabel="Tambah kafe"
        createHref="/dashboard/cafes/create"
      />

      <DataTable
        apiEndpoint="cafes"
        columns={cafeColumns}
        searchPlaceholder="Search name or description..."
        filters={filters}
      />
    </>
  );
}
