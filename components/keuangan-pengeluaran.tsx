"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

export function KeuanganPengeluaran() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterKategori, setFilterKategori] = useState("semua")

  // Data dummy untuk pengeluaran
  const pengeluaranData = [
    {
      id: "E001",
      tanggal: "20 Jan 2023",
      deskripsi: "Pembayaran Listrik",
      kategori: "Utilitas",
      jumlah: "Rp 1,200,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "E002",
      tanggal: "18 Jan 2023",
      deskripsi: "Gaji Karyawan",
      kategori: "Gaji",
      jumlah: "Rp 5,000,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "E003",
      tanggal: "15 Jan 2023",
      deskripsi: "Pembelian Peralatan",
      kategori: "Peralatan",
      jumlah: "Rp 3,500,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "E004",
      tanggal: "12 Jan 2023",
      deskripsi: "Sewa Kantor",
      kategori: "Sewa",
      jumlah: "Rp 2,000,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "E005",
      tanggal: "10 Jan 2023",
      deskripsi: "Pembelian Bahan Bakar",
      kategori: "Operasional",
      jumlah: "Rp 500,000",
      metodePembayaran: "Tunai",
      status: "Selesai",
    },
    {
      id: "E006",
      tanggal: "5 Jan 2023",
      deskripsi: "Biaya Internet Kantor",
      kategori: "Utilitas",
      jumlah: "Rp 350,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
  ]

  // Filter data berdasarkan pencarian dan kategori
  const filteredData = pengeluaranData.filter((item) => {
    const matchSearch = item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchKategori = filterKategori === "semua" || item.kategori === filterKategori
    return matchSearch && matchKategori
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Pengeluaran</CardTitle>
          <CardDescription>Ringkasan pengeluaran bulan ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Pengeluaran</p>
              <p className="text-2xl font-bold">Rp 12,543,200</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Gaji</p>
              <p className="text-2xl font-bold">Rp 5,000,000</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Utilitas</p>
              <p className="text-2xl font-bold">Rp 1,550,000</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Operasional</p>
              <p className="text-2xl font-bold">Rp 5,993,200</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari transaksi..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterKategori} onValueChange={setFilterKategori}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Kategori</SelectItem>
              <SelectItem value="Utilitas">Utilitas</SelectItem>
              <SelectItem value="Gaji">Gaji</SelectItem>
              <SelectItem value="Peralatan">Peralatan</SelectItem>
              <SelectItem value="Sewa">Sewa</SelectItem>
              <SelectItem value="Operasional">Operasional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Metode Pembayaran</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.deskripsi}</TableCell>
                <TableCell>{item.kategori}</TableCell>
                <TableCell className="font-medium text-red-600">{item.jumlah}</TableCell>
                <TableCell>{item.metodePembayaran}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">{item.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
