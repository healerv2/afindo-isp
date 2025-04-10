"use client"

import { useState } from "react"
import { PelangganCards } from "@/components/pelanggan-cards"
import { PelangganTable } from "@/components/pelanggan-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { TambahPelangganModal } from "@/components/tambah-pelanggan-modal"
import { UserPlus } from "lucide-react"

export type PelangganStatus = "aktif" | "baru" | "isolir" | "berhenti" | null

export function PelangganDashboard() {
  const [selectedStatus, setSelectedStatus] = useState<PelangganStatus>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("Januari")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [showTambahModal, setShowTambahModal] = useState(false)

  const handleViewDetails = (status: PelangganStatus) => {
    setSelectedStatus(status)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    console.log("Searching for:", term)
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          title="Dashboard Pelanggan"
          onSearch={handleSearch}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setShowTambahModal(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Pelanggan
            </Button>
          </div>

          <div className="space-y-6">
            <PelangganCards onViewDetails={handleViewDetails} />
            {selectedStatus && <PelangganTable status={selectedStatus} searchTerm={searchTerm} />}
            {!selectedStatus && (
              <div className="rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium">Pilih kategori pelanggan</h3>
                <p className="text-muted-foreground mt-2">
                  Klik pada salah satu kartu di atas untuk melihat detail pelanggan.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {showTambahModal && <TambahPelangganModal isOpen={showTambahModal} onClose={() => setShowTambahModal(false)} />}
    </div>
  )
}
