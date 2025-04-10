"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Search } from "lucide-react"
import { KaryawanDetailModal } from "@/components/karyawan-detail-modal"

export function KaryawanList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDepartemen, setFilterDepartemen] = useState("semua")
  const [selectedKaryawan, setSelectedKaryawan] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Data dummy untuk karyawan
  const karyawanData = [
    {
      id: "EMP001",
      nama: "Budi Santoso",
      jabatan: "Teknisi Lapangan",
      departemen: "Teknis",
      tanggalBergabung: "15 Jan 2020",
      status: "Aktif",
      kontak: "081234567890",
      email: "budi.santoso@afindo.co.id",
      alamat: "Jl. Merdeka No. 123, Jakarta Pusat",
      pendidikan: "D3 Teknik Elektro",
      keahlian: ["Instalasi Jaringan", "Troubleshooting", "Konfigurasi Router"],
      foto: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "EMP002",
      nama: "Siti Rahayu",
      jabatan: "Admin Keuangan",
      departemen: "Keuangan",
      tanggalBergabung: "10 Mar 2021",
      status: "Aktif",
      kontak: "081234567891",
      email: "siti.rahayu@afindo.co.id",
      alamat: "Jl. Sudirman No. 45, Jakarta Selatan",
      pendidikan: "S1 Akuntansi",
      keahlian: ["Pembukuan", "Pajak", "Laporan Keuangan"],
      foto: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "EMP003",
      nama: "Ahmad Hidayat",
      jabatan: "Teknisi Lapangan",
      departemen: "Teknis",
      tanggalBergabung: "05 Jun 2019",
      status: "Aktif",
      kontak: "081234567892",
      email: "ahmad.hidayat@afindo.co.id",
      alamat: "Jl. Gatot Subroto No. 67, Jakarta Selatan",
      pendidikan: "SMK Teknik Komputer Jaringan",
      keahlian: ["Instalasi Jaringan", "Konfigurasi ODP", "Penarikan Kabel"],
      foto: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "EMP004",
      nama: "Dewi Lestari",
      jabatan: "Customer Service",
      departemen: "Pelayanan",
      tanggalBergabung: "20 Aug 2022",
      status: "Aktif",
      kontak: "081234567893",
      email: "dewi.lestari@afindo.co.id",
      alamat: "Jl. Pahlawan No. 34, Jakarta Timur",
      pendidikan: "D3 Komunikasi",
      keahlian: ["Komunikasi", "Penanganan Keluhan", "Administrasi"],
      foto: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "EMP005",
      nama: "Rudi Hartono",
      jabatan: "Manager Teknis",
      departemen: "Teknis",
      tanggalBergabung: "12 Feb 2018",
      status: "Aktif",
      kontak: "081234567894",
      email: "rudi.hartono@afindo.co.id",
      alamat: "Jl. Diponegoro No. 78, Jakarta Pusat",
      pendidikan: "S1 Teknik Informatika",
      keahlian: ["Manajemen Jaringan", "Perencanaan Infrastruktur", "Supervisi Tim"],
      foto: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "EMP006",
      nama: "Rina Wijaya",
      jabatan: "HRD",
      departemen: "SDM",
      tanggalBergabung: "03 Apr 2020",
      status: "Aktif",
      kontak: "081234567895",
      email: "rina.wijaya@afindo.co.id",
      alamat: "Jl. Cendrawasih No. 12, Jakarta Selatan",
      pendidikan: "S1 Manajemen SDM",
      keahlian: ["Rekrutmen", "Manajemen Karyawan", "Pelatihan"],
      foto: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "EMP007",
      nama: "Doni Kusuma",
      jabatan: "Marketing",
      departemen: "Pemasaran",
      tanggalBergabung: "17 Jul 2021",
      status: "Aktif",
      kontak: "081234567896",
      email: "doni.kusuma@afindo.co.id",
      alamat: "Jl. Antasari No. 45, Jakarta Selatan",
      pendidikan: "S1 Manajemen Pemasaran",
      keahlian: ["Digital Marketing", "Presentasi", "Negosiasi"],
      foto: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "EMP008",
      nama: "Andi Pratama",
      jabatan: "Teknisi Lapangan",
      departemen: "Teknis",
      tanggalBergabung: "25 Sep 2022",
      status: "Aktif",
      kontak: "081234567897",
      email: "andi.pratama@afindo.co.id",
      alamat: "Jl. Kebon Jeruk No. 23, Jakarta Barat",
      pendidikan: "D3 Teknik Elektro",
      keahlian: ["Instalasi Jaringan", "Troubleshooting", "Konfigurasi Router"],
      foto: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Filter data berdasarkan pencarian dan departemen
  const filteredData = karyawanData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDepartemen = filterDepartemen === "semua" || item.departemen === filterDepartemen
    return matchSearch && matchDepartemen
  })

  const handleViewDetail = (karyawan: any) => {
    setSelectedKaryawan(karyawan)
    setShowDetailModal(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari karyawan..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterDepartemen} onValueChange={setFilterDepartemen}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departemen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Departemen</SelectItem>
              <SelectItem value="Teknis">Teknis</SelectItem>
              <SelectItem value="Keuangan">Keuangan</SelectItem>
              <SelectItem value="Pelayanan">Pelayanan</SelectItem>
              <SelectItem value="SDM">SDM</SelectItem>
              <SelectItem value="Pemasaran">Pemasaran</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Departemen</TableHead>
              <TableHead>Tanggal Bergabung</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((karyawan) => (
              <TableRow key={karyawan.id}>
                <TableCell className="font-medium">{karyawan.id}</TableCell>
                <TableCell>{karyawan.nama}</TableCell>
                <TableCell>{karyawan.jabatan}</TableCell>
                <TableCell>{karyawan.departemen}</TableCell>
                <TableCell>{karyawan.tanggalBergabung}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">{karyawan.status}</span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleViewDetail(karyawan)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal Detail Karyawan */}
      {selectedKaryawan && (
        <KaryawanDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          karyawan={selectedKaryawan}
        />
      )}
    </div>
  )
}
