"use client";

import DashboardTitle from "@/components/dashboard-title";
import { DataTable } from "@/components/table";
import { termsColumns } from "@/components/table-columns/terms-table-columns";

export default function TermsPage() {
    return (
        <>
            <DashboardTitle
                title="Syarat dan Ketentuan"
                subtitle="Kelola data syarat dan ketentuan"
                createLabel="Tambah Syarat & Ketentuan"
                createHref="/dashboard/terms/create"
            />

            <DataTable
                apiEndpoint="terms"
                columns={termsColumns}
                searchPlaceholder="Search name or description..."
            />
        </>
    );
}
