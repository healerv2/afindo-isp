import { AreaDashboard } from "@/components/area-dashboard"
import { TambahAreaModal } from "@/components/tambah-area-modal"

export default function AreaPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Area Layanan</h1>
        <TambahAreaModal />
      </div>
      <AreaDashboard />
    </div>
  )
}
