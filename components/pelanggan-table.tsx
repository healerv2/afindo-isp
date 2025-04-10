"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PelangganStatus } from "./pelanggan-dashboard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Search, Filter, ArrowUpDown, MoreHorizontal, FileDown, Printer, RefreshCw, AlertTriangle, MessageSquare, Mail } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { IsolirPelangganModal } from "./isolir-pelanggan-modal"
import { NotifikasiOtomatisModal } from "./notifikasi-otomatis-modal"

interface PelangganTableProps {
  status: PelangganStatus
  searchTerm?: string
}

export function PelangganTable({ status, searchTerm = "" }: PelangganTableProps) {
  const [localSearch, setLocalSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [filterPaket, setFilterPaket] = useState<string | null>(null)
  const [visibleItems, setVisibleItems] = useState(5)
  const [showIsolirModal, setShowIsolirModal] = useState(false)
  const [showNotifikasiModal, setShowNotifikasiModal] = useState(false)
  const [notifikasiType, setNotifikasiType] = useState<"tagihan" | "info">("tagihan")
  const [selectedPelanggan, setSelectedPelanggan] = useState<{ id: string; nama: string; email?: string; whatsapp?: string } | null>(null)

  // Dummy data - in a real app, this would come from an API
  const pelangganData = {
    aktif: [
      {
        id: "A001",
        nama: "PT Maju Jaya",
        alamat: "Jl. Raya No. 123",
        paket: "Business Pro",
        tagihan: "Rp 2.500.000",
        status: "Aktif",
        tanggalBayar: "15 Jan 2025",
        email: "info@majujaya.com",
        whatsapp: "081234567890",
      },
      {
        id: "A002",
        nama: "CV Sentosa",
        alamat: "Jl. Melati No. 45",
        paket: "Business",
        tagihan: "Rp 1.800.000",
        status: "Aktif",
        tanggalBayar: "10 Jan 2025",
        email: "admin@sentosa.co.id",
        whatsapp: "081234567891",
      },
      {
        id: "A003",
        nama: "PT Abadi Sejahtera",
        alamat: "Jl. Mawar No. 78",
        paket: "Enterprise",
        tagihan: "Rp 5.000.000",
        status: "Aktif",
        tanggalBayar: "5 Jan 2025",
        email: "info@abadisejahtera.com",
        whatsapp: "081234567892",
      },
      {
        id: "A004",
        nama: "Toko Bahagia",
        alamat: "Jl. Anggrek No. 12",
        paket: "Basic",
        tagihan: "Rp 750.000",
        status: "Aktif",
        tanggalBayar: "20 Jan 2025",
        email: "toko@bahagia.com",
        whatsapp: "081234567893",
      },
      {
        id: "A005",
        nama: "Restoran Selera",
        alamat: "Jl. Kenanga No. 56",
        paket: "Business",
        tagihan: "Rp 1.800.000",
        status: "Aktif",
        tanggalBayar: "12 Jan 2025",
        email: "resto@selera.com",
        whatsapp: "081234567894",
      },
      {
        id: "A006",
        nama: "PT Teknologi Maju",
        alamat: "Jl. Cempaka No. 78",
        paket: "Enterprise",
        tagihan: "Rp 5.000.000",
        status: "Aktif",
        tanggalBayar: "8 Jan 2025",
        email: "info@teknologimaju.com",
        whatsapp: "081234567895",
      },
      {
        id: "A007",
        nama: "Klinik Sehat",
        alamat: "Jl. Dahlia No. 34",
        paket: "Business",
        tagihan: "Rp 1.800.000",
        status: "Aktif",
        tanggalBayar: "18 Jan 2025",
        email: "admin@kliniksehat.com",
        whatsapp: "081234567896",
      },
    ],
    baru: [
      {
        id: "B001",
        nama: "PT Baru Jaya",
        alamat: "Jl. Sudirman No. 45",
        paket: "Business",
        tagihan: "Rp 1.800.000",
        status: "Baru",
        tanggalBayar: "-",
        email: "contact@barujaya.com",
        whatsapp: "081234567897",
      },
      {
        id: "B002",
        nama: "Kafe Santai",
        alamat: "Jl. Gatot Subroto No. 12",
        paket: "Basic",
        tagihan: "Rp 750.000",
        status: "Baru",
        tanggalBayar: "-",
        email: "kafe@santai.com",
        whatsapp: "081234567898",
      },
      {
        id: "B003",
        nama: "PT Mitra Utama",
        alamat: "Jl. Thamrin No. 67",
        paket: "Enterprise",
        tagihan: "Rp 5.000.000",
        status: "Baru",
        tanggalBayar: "-",
        email: "info@mitrautama.com",
        whatsapp: "081234567899",
      },
      {
        id: "B004",
        nama: "Apotek Sehat",
        alamat: "Jl. Diponegoro No. 45",
        paket: "Business",
        tagihan: "Rp 1.800.000",
        status: "Baru",
        tanggalBayar: "-",
        email: "apotek@sehat.com",
        whatsapp: "081234567810",
      },
      {
        id: "B005",
        nama: "Salon Cantik",
        alamat: "Jl. Imam Bonjol No. 23",
        paket: "Basic",
        tagihan: "Rp 750.000",
        status: "Baru",
        tanggalBayar: "-",
        email: "salon@cantik.com",
        whatsapp: "081234567811",
      },
    ],
    isolir: [
      {
        id: "I001",
        nama: "CV Mandiri",
        alamat: "Jl. Pahlawan No. 23",
        paket: "Business",
        tagihan: "Rp 1.800.000",
        status: "Isolir",
        tanggalBayar: "15 Nov 2024",
        tanggalIsolir: "15 Jan 2025",
        email: "info@mandiri.com",
        whatsapp: "081234567812",
      },
      {
        id: "I002",
        nama: "Toko Elektronik",
        alamat: "Jl. Diponegoro No. 89",
        paket: "Basic",
        tagihan: "Rp 750.000",
        status: "Isolir",
        tanggalBayar: "20 Nov 2024",
        tanggalIsolir: "20 Jan 2025",
        email: "toko@elektronik.com",
        whatsapp: "081234567813",
      },
      {
        id: "I003",
        nama: "Bengkel Motor",
        alamat: "Jl. Veteran No. 56",
        paket: "Business",
        tagihan: "Rp 1.800.000",
        status: "Isolir",
        tanggalBayar: "10 Nov 2024",
        tanggalIsolir: "10 Jan 2025",
        email: "bengkel@motor.com",
        whatsapp: "081234567814",
      },
    ],
    berhenti: [
      {
        id: "S001",
        nama: "PT Lama",
        alamat: "Jl. Veteran No. 34",
        paket: "Business Pro",
        tagihan: "Rp 2.500.000",
        status: "Berhenti",
        tanggalBayar: "5 Okt 2024",
        email: "info@ptlama.com",
        whatsapp: "081234567815",
      },
      {
        id: "S002",
        nama: "Warung Internet",
        alamat: "Jl. Merdeka No. 56",
        paket: "Basic",
        tagihan: "Rp 750.000",
        status: "Berhenti",
        tanggalBayar: "12 Okt 2024",
        email: "warnet@internet.com",
        whatsapp: "081234567816",
      },
      {
        id: "S003",
        nama: "PT Tidak Jadi",
        alamat: "Jl. Pemuda No. 78",
        paket: "Enterprise",
        tagihan: "Rp 5.000.000",
        status: "Berhenti",
        tanggalBayar: "8 Okt 2024",
        email: "info@tidakjadi.com",
        whatsapp: "081234567817",
      },
    ],
  }

  const rawData = status ? pelangganData[status] : []

  // Get unique paket options for filter
  const paketOptions = Array.from(new Set(rawData.map((item) => item.paket)))

  // Filter data based on search term and paket filter
  const effectiveSearchTerm = searchTerm || localSearch
  let filteredData = rawData.filter(
    (item) =>
      item.nama.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(effectiveSearchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(effectiveSearchTerm.toLowerCase()),
  )

  // Apply paket filter if selected
  if (filterPaket) {
    filteredData = filteredData.filter((item) => item.paket === filterPaket)
  }

  // Sort data if sort field is selected
  if (sortField) {
    filteredData.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  // Pagination
  const data = filteredData.slice(0, visibleItems)
  const hasMore = filteredData.length > visibleItems

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleLoadMore = () => {
    setVisibleItems((prev) => prev + 5)
  }

  const handleLoadAll = () => {
    setVisibleItems(filteredData.length)
  }

  const handleRefresh = () => {
    // In a real app, this would refetch data from the API
    alert("Menyegarkan data...")
  }

  const handleIsolir = (pelanggan: { id: string; nama: string }) => {
    setSelectedPelanggan(pelanggan)
    setShowIsolirModal(true)
  }

  const handleSendNotifikasi = (pelanggan: { id: string; nama: string; email?: string; whatsapp?: string }, type: "tagihan" | "info") => {
    setSelectedPelanggan(pelanggan)
    setNotifikasiType(type)
    setShowNotifikasiModal(true)
  }

  const statusTitle = {
    aktif: "Pelanggan Aktif",
    baru: "Pelanggan Baru",
    isolir: "Pelanggan Isolir",
    berhenti: "Pelanggan Berhenti",
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{status ? statusTitle[status] : "Daftar Pelanggan"}</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari pelanggan..."
              className="pl-8 w-[250px]"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">Filter Paket</p>
                <Select
                  value={filterPaket || "all"}
                  onValueChange={(value) => setFilterPaket(value === "all" ? null : value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Paket" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Paket</SelectItem>
                    {paketOptions.map((paket) => (
                      <SelectItem key={paket} value={paket}>
                        {paket}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" />
                <span>Export Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileDown className="mr-2 h-4 w-4" />
                <span>Export CSV</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                <span>Print</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedPelanggan(null)
              setNotifikasiType("info")
              setShowNotifikasiModal(true)
            }}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Blast Info</span>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("id")}>
                  ID
                  {sortField === "id" && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("nama")}>
                  Nama
                  {sortField === "nama" && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>
                <div className="flex items-center cursor-pointer" onClick={() => handleSort("paket")}>
                  Paket
                  {sortField === "paket" && (
                    <ArrowUpDown className={`ml-1 h-4 w-4 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                  )}
                </div>
              </TableHead>
              <TableHead>Tagihan</TableHead>
              <TableHead>Terakhir Bayar</TableHead>
              {status === "isolir" && <TableHead>Tanggal Isolir</TableHead>}
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((pelanggan) => (
                <TableRow key={pelanggan.id}>
                  <TableCell className="font-medium">{pelanggan.id}</TableCell>
                  <TableCell>{pelanggan.nama}</TableCell>
                  <TableCell>{pelanggan.alamat}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{pelanggan.paket}</Badge>
                  </TableCell>
                  <TableCell>{pelanggan.tagihan}</TableCell>
                  <TableCell>{pelanggan.tanggalBayar}</TableCell>
                  {status === "isolir" && (
                    <TableCell>
                      <span className="text-yellow-600 flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {(pelanggan as any).tanggalIsolir}
                      </span>
                    </TableCell>
                  )}
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        pelanggan.status === "Aktif"
                          ? "bg-green-100 text-green-800"
                          : pelanggan.status === "Baru"
                            ? "bg-blue-100 text-blue-800"
                            : pelanggan.status === "Isolir"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {pelanggan.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Aksi</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Detail Pelanggan</DropdownMenuItem>
                        <DropdownMenuItem>Edit Pelanggan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Riwayat Pembayaran</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendNotifikasi(pelanggan, "tagihan")}>
                          <Mail className="mr-2 h-4 w-4" />
                          Kirim Tagihan
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendNotifikasi(pelanggan, "info")}>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Kirim Info
                        </DropdownMenuItem>
                        {(status === "aktif" || status === "baru") && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-yellow-600"
                              onClick={() => handleIsolir({ id: pelanggan.id, nama: pelanggan.nama })}
                            >
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Isolir Pelanggan
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={status === "isolir" ? 9 : 8} className="h-24 text-center">
                  Tidak ada data pelanggan yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data.length > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            Menampilkan {Math.min(visibleItems, filteredData.length)} dari {filteredData.length} data
          </div>
          <div className="flex gap-2">
            {hasMore && (
              <>
                <Button variant="outline" size="sm" onClick={handleLoadMore}>
                  Load More
                </Button>
                <Button variant="outline" size="sm" onClick={handleLoadAll}>
                  Load All
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {showIsolirModal && selectedPelanggan && (
        <IsolirPelangganModal
          isOpen={showIsolirModal}
          onClose={() => setShowIsolirModal(false)}
          pelangganId={selectedPelanggan.id}
          pelangganNama={selectedPelanggan.nama}
        />
      )}
      
      {showNotifikasiModal && (
        <NotifikasiOtomatisModal
          isOpen={showNotifikasiModal}
          onClose={() => setShowNotifikasiModal(false)}
          type={notifikasiType}
          preselectedRecipients={selectedPelanggan ? [selectedPelanggan] : []}
        />
      )}
    </div>
  )
}
