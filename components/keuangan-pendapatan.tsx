"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

export function KeuanganPendapatan() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterKategori, setFilterKategori] = useState("semua")

  // Data dummy untuk pendapatan
  const pendapatanData = [
    {
      id: "P001",
      tanggal: "15 Jan 2023",
      deskripsi: "Pembayaran Internet - PT Maju Jaya",
      kategori: "Layanan Internet",
      jumlah: "Rp 2,500,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "P002",
      tanggal: "12 Jan 2023",
      deskripsi: "Pembayaran Internet - CV Sentosa",
      kategori: "Layanan Internet",
      jumlah: "Rp 1,800,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "P003",
      tanggal: "10 Jan 2023",
      deskripsi: "Pembayaran Internet - Toko Bahagia",
      kategori: "Layanan Internet",
      jumlah: "Rp 750,000",
      metodePembayaran: "Tunai",
      status: "Selesai",
    },
    {
      id: "P004",
      tanggal: "8 Jan 2023",
      deskripsi: "Pembayaran Internet - Restoran Selera",
      kategori: "Layanan Internet",
      jumlah: "Rp 1,800,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "P005",
      tanggal: "5 Jan 2023",
      deskripsi: "Pembayaran Instalasi - PT Baru Jaya",
      kategori: "Instalasi",
      jumlah: "Rp 3,500,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
    {
      id: "P006",
      tanggal: "3 Jan 2023",
      deskripsi: "Pembayaran Internet - Kafe Santai",
      kategori: "Layanan Internet",
      jumlah: "Rp 750,000",
      metodePembayaran: "Tunai",
      status: "Selesai",
    },
    {
      id: "P007",
      tanggal: "2 Jan 2023",
      deskripsi: "Pembayaran Instalasi - PT Mitra Utama",
      kategori: "Instalasi",
      jumlah: "Rp 5,000,000",
      metodePembayaran: "Transfer Bank",
      status: "Selesai",
    },
  ]

  // Filter data berdasarkan pencarian dan kategori
  const filteredData = pendapatanData.filter((item) => {
    const matchSearch = item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchKategori = filterKategori === "semua" || item.kategori === filterKategori
    return matchSearch && matchKategori
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Pendapatan</CardTitle>
          <CardDescription>Ringkasan pendapatan bulan ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Pendapatan</p>
              <p className="text-2xl font-bold">Rp 45,231,890</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Layanan Internet</p>
              <p className="text-2xl font-bold">Rp 38,750,000</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Instalasi</p>
              <p className="text-2xl font-bold">Rp 6,481,890</p>
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
              <SelectItem value="Layanan Internet">Layanan Internet</SelectItem>
              <SelectItem value="Instalasi">Instalasi</SelectItem>
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
                <TableCell className="font-medium text-green-600">{item.jumlah}</TableCell>
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
