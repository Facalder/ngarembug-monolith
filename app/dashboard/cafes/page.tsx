import DashboardTitle from "@/components/dashboard-title";

export default function CafePage() {
  return (
    <DashboardTitle 
      title="Halaman Cafe"
      subtitle="Kelola data cafe"
      createLabel="Tambah kafe"
      createHref="/dashboard/cafes/create"
    />
  )
}
