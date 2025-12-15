"use client";

import DashboardTitle from "@/components/dashboard-title";
import { DataTable } from "@/components/table";
import { facilitiesColumns } from "@/components/table-columns/facilities-table-columns";

export default function FacilitiesPage() {
    return (
        <>
            <DashboardTitle
                title="Fasilitas"
                subtitle="Kelola data fasilitas"
                createLabel="Tambah Fasilitas"
                createHref="/dashboard/facilities/create"
            />

            <DataTable
                apiEndpoint="facilities"
                columns={facilitiesColumns}
                searchPlaceholder="Search name or description..."
            />
        </>
    );
}
