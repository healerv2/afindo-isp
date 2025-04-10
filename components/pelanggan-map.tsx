"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, User, Users } from "lucide-react"

export function PelangganMap() {
  const [filterStatus, setFilterStatus] = useState<"semua" | "aktif" | "isolir" | "berhenti">("semua")
  const [searchTerm, setSearchTerm] = useState("")

  // Data dummy untuk pelanggan
  const pelangganData = [
    {
      id: "A001",
      nama: "PT Maju Jaya",
      alamat: "Jl. Raya No. 123",
      paket: "Business Pro",
      status: "Aktif",
      location: { lat: -6.1761, lng: 106.866 },
      odp: "ODP001",
    },
    {
      id: "A002",
      nama: "CV Sentosa",
      alamat: "Jl. Melati No. 45",
      paket: "Business",
      status: "Aktif",
      location: { lat: -6.1771, lng: 106.867 },
      odp: "ODP002",
    },
    {
      id: "A003",
      nama: "PT Abadi Sejahtera",
      alamat: "Jl. Mawar No. 78",
      paket: "Enterprise",
      status: "Aktif",
      location: { lat: -6.1861, lng: 106.876 },
      odp: "ODP003",
    },
    {
      id: "I001",
      nama: "CV Mandiri",
      alamat: "Jl. Pahlawan No. 23",
      paket: "Business",
      status: "Isolir",
      location: { lat: -6.2618, lng: 106.8118 },
      odp: "ODP004",
    },
    {
      id: "S001",
      nama: "PT Lama",
      alamat: "Jl. Veteran No. 34",
      paket: "Business Pro",
      status: "Berhenti",
      location: { lat: -6.2628, lng: 106.8128 },
      odp: "ODP004",
    },
  ]

  // Filter data berdasarkan pencarian dan status
  const filteredData = pelangganData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "semua" || item.status.toLowerCase() === filterStatus
    return matchSearch && matchStatus
  })

  // Hitung jumlah pelanggan berdasarkan status
  const totalAktif = pelangganData.filter((item) => item.status === "Aktif").length
  const totalIsolir = pelangganData.filter((item) => item.status === "Isolir").length
  const totalBerhenti = pelangganData.filter((item) => item.status === "Berhenti").length

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Peta Pelanggan</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pelanggan..."
              className="pl-8 w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(value: "semua" | "aktif" | "isolir" | "berhenti") => setFilterStatus(value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Status</SelectItem>
              <SelectItem value="aktif">Aktif</SelectItem>
              <SelectItem value="isolir">Isolir</SelectItem>
              <SelectItem value="berhenti">Berhenti</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4 text-green-500" /> Pelanggan Aktif
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAktif}</div>
            <p className="text-xs text-muted-foreground">Total pelanggan aktif</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4 text-yellow-500" /> Pelanggan Isolir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIsolir}</div>
            <p className="text-xs text-muted-foreground">Total pelanggan isolir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="mr-2 h-4 w-4 text-red-500" /> Pelanggan Berhenti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBerhenti}</div>
            <p className="text-xs text-muted-foreground">Total pelanggan berhenti</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative h-[600px] w-full bg-muted">
            {/* Placeholder untuk peta - dalam implementasi nyata, gunakan Google Maps atau Leaflet */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Di sini akan ditampilkan peta interaktif untuk melihat lokasi pelanggan.
                </p>
                <div className="mb-4 flex flex-col items-center justify-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Menampilkan {filteredData.length} pelanggan</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Pelanggan</CardTitle>
          <CardDescription>
            {filterStatus === "semua"
              ? "Semua pelanggan"
              : filterStatus === "aktif"
                ? "Pelanggan aktif"
                : filterStatus === "isolir"
                  ? "Pelanggan isolir"
                  : "Pelanggan berhenti"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      item.status === "Aktif"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Isolir"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{item.nama}</p>
                    <p className="text-xs text-muted-foreground">{item.alamat}</p>
                    <p className="text-xs text-muted-foreground">
                      ODP: {item.odp} | Paket: {item.paket}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.status === "Aktif"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Isolir"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                  <Button variant="outline" size="sm">
                    Lihat Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
