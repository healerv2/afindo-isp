import { PaketDashboard } from "@/components/paket-dashboard"
import { TambahPaketModal } from "@/components/tambah-paket-modal"

export default function PaketPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Paket Internet</h1>
        <TambahPaketModal />
      </div>
      <PaketDashboard />
    </div>
  )
}
