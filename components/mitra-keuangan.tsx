"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Download, Search } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function MitraKeuangan() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("semua")
  const [date, setDate] = useState<Date>()

  // Data dummy untuk keuangan mitra
  const keuanganData = [
    {
      id: "TRX00123456",
      tanggal: "15 Jan 2023",
      pelanggan: "Budi Santoso",
      deskripsi: "Pembayaran Internet Bulan Januari 2023",
      jumlahTagihan: "Rp 300,000",
      biayaAdmin: "Rp 5,000",
      totalDiterima: "Rp 295,000",
      status: "Berhasil",
    },
    {
      id: "TRX00123457",
      tanggal: "15 Jan 2023",
      pelanggan: "Siti Rahayu",
      deskripsi: "Pembayaran Internet Bulan Januari 2023",
      jumlahTagihan: "Rp 500,000",
      biayaAdmin: "Rp 5,000",
      totalDiterima: "Rp 495,000",
      status: "Berhasil",
    },
    {
      id: "TRX00123458",
      tanggal: "16 Jan 2023",
      pelanggan: "Ahmad Hidayat",
      deskripsi: "Pembayaran Internet Bulan Januari 2023",
      jumlahTagihan: "Rp 250,000",
      biayaAdmin: "Rp 5,000",
      totalDiterima: "Rp 245,000",
      status: "Berhasil",
    },
    {
      id: "TRX00123459",
      tanggal: "16 Jan 2023",
      pelanggan: "Dewi Lestari",
      deskripsi: "Pembayaran Internet Bulan Januari 2023",
      jumlahTagihan: "Rp 750,000",
      biayaAdmin: "Rp 5,000",
      totalDiterima: "Rp 745,000",
      status: "Berhasil",
    },
    {
      id: "TRX00123460",
      tanggal: "17 Jan 2023",
      pelanggan: "Rudi Hartono",
      deskripsi: "Pembayaran Internet Bulan Januari 2023",
      jumlahTagihan: "Rp 300,000",
      biayaAdmin: "Rp 5,000",
      totalDiterima: "Rp 0",
      status: "Gagal",
    },
  ]

  // Filter data berdasarkan pencarian, status, dan tanggal
  const filteredData = keuanganData.filter((item) => {
    const matchSearch =
      item.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())

    const matchStatus = filterStatus === "semua" || item.status === filterStatus

    const matchDate = !date || item.tanggal === format(date, "dd MMM yyyy", { locale: id })

    return matchSearch && matchStatus && matchDate
  })

  // Hitung total pendapatan
  const totalPendapatan = filteredData
    .filter((item) => item.status === "Berhasil")
    .reduce((total, item) => {
      const amount = Number.parseInt(item.totalDiterima.replace(/\D/g, ""))
      return total + amount
    }, 0)

  // Hitung total biaya admin
  const totalBiayaAdmin = filteredData
    .filter((item) => item.status === "Berhasil")
    .reduce((total, item) => {
      const amount = Number.parseInt(item.biayaAdmin.replace(/\D/g, ""))
      return total + amount
    }, 0)

  // Hitung total tagihan
  const totalTagihan = filteredData
    .filter((item) => item.status === "Berhasil")
    .reduce((total, item) => {
      const amount = Number.parseInt(item.jumlahTagihan.replace(/\D/g, ""))
      return total + amount
    }, 0)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalPendapatan.toLocaleString("id-ID")}</div>
            <p className="text-xs text-muted-foreground">
              Dari {filteredData.filter((item) => item.status === "Berhasil").length} transaksi berhasil
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tagihan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalTagihan.toLocaleString("id-ID")}</div>
            <p className="text-xs text-muted-foreground">Sebelum biaya admin</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Biaya Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalBiayaAdmin.toLocaleString("id-ID")}</div>
            <p className="text-xs text-muted-foreground">
              {((totalBiayaAdmin / totalTagihan) * 100).toFixed(1)}% dari total tagihan
            </p>
          </CardContent>
        </Card>
      </div>

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
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Status</SelectItem>
              <SelectItem value="Berhasil">Berhasil</SelectItem>
              <SelectItem value="Gagal">Gagal</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: id }) : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Jumlah Tagihan</TableHead>
              <TableHead>Biaya Admin</TableHead>
              <TableHead>Total Diterima</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.pelanggan}</TableCell>
                <TableCell>{item.deskripsi}</TableCell>
                <TableCell>{item.jumlahTagihan}</TableCell>
                <TableCell className="text-red-600">{item.biayaAdmin}</TableCell>
                <TableCell className="font-medium text-green-600">{item.totalDiterima}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.status === "Berhasil" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
