"use client";

import * as React from "react";

import DashboardTitle from "@/components/dashboard-title";
import { DataTable } from "@/components/table";
import { facilitiesColumns } from "@/components/table-columns/facilities-table-columns";

export default function FacilitiesPage() {
  return (
    <React.Suspense fallback={null}>
      <DashboardTitle
        title="Fasilitas"
        subtitle="Kelola data fasilitas"
        createLabel="Tambah Fasilitas"
        createHref="/dashboard/facilities/new"
      />

      <DataTable
        apiEndpoint="facilities"
        columns={facilitiesColumns}
        searchPlaceholder="Search name or description..."
        editHref="/dashboard/facilities"
        canDelete={true}
      />
    </React.Suspense>
  );
}
