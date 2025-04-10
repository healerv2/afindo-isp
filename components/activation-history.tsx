"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, Clock, Download, Filter, RefreshCw, Search, X } from "lucide-react"

interface ActivationRecord {
  id: string
  pelangganId: string
  pelangganNama: string
  tanggalPembayaran: string
  tanggalAktivasi: string
  jumlahPembayaran: string
  metodePembayaran: string
  status: "success" | "failed" | "pending"
  durasi: string
}

export function ActivationHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")

  // Dummy data untuk riwayat aktivasi
  const activationRecords: ActivationRecord[] = [
    {
      id: "ACT12345",
      pelangganId: "A001",
      pelangganNama: "PT Maju Jaya",
      tanggalPembayaran: "15 Jan 2025 14:30",
      tanggalAktivasi: "15 Jan 2025 14:35",
      jumlahPembayaran: "Rp 2.500.000",
      metodePembayaran: "Transfer Bank",
      status: "success",
      durasi: "5 menit",
    },
    {
      id: "ACT12346",
      pelangganId: "A002",
      pelangganNama: "CV Sentosa",
      tanggalPembayaran: "15 Jan 2025 13:45",
      tanggalAktivasi: "15 Jan 2025 13:50",
      jumlahPembayaran: "Rp 1.800.000",
      metodePembayaran: "E-Wallet",
      status: "success",
      durasi: "5 menit",
    },
    {
      id: "ACT12347",
      pelangganId: "I001",
      pelangganNama: "CV Mandiri",
      tanggalPembayaran: "15 Jan 2025 12:15",
      tanggalAktivasi: "15 Jan 2025 12:25",
      jumlahPembayaran: "Rp 1.800.000",
      metodePembayaran: "Transfer Bank",
      status: "success",
      durasi: "10 menit",
    },
    {
      id: "ACT12348",
      pelangganId: "I002",
      pelangganNama: "Toko Elektronik",
      tanggalPembayaran: "15 Jan 2025 11:20",
      tanggalAktivasi: "15 Jan 2025 11:25",
      jumlahPembayaran: "Rp 750.000",
      metodePembayaran: "E-Commerce",
      status: "success",
      durasi: "5 menit",
    },
    {
      id: "ACT12349",
      pelangganId: "B001",
      pelangganNama: "PT Baru Jaya",
      tanggalPembayaran: "15 Jan 2025 10:30",
      tanggalAktivasi: "-",
      jumlahPembayaran: "Rp 1.800.000",
      metodePembayaran: "Transfer Bank",
      status: "pending",
      durasi: "-",
    },
    {
      id: "ACT12350",
      pelangganId: "I003",
      pelangganNama: "Bengkel Motor",
      tanggalPembayaran: "15 Jan 2025 09:15",
      tanggalAktivasi: "-",
      jumlahPembayaran: "Rp 1.800.000",
      metodePembayaran: "Transfer Bank",
      status: "failed",
      durasi: "-",
    },
  ]

  // Filter records berdasarkan pencarian dan filter
  const filteredRecords = activationRecords.filter((record) => {
    // Filter pencarian
    const matchesSearch =
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.pelangganId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.pelangganNama.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter status
    const matchesStatus = statusFilter === "all" || record.status === statusFilter

    // Filter tanggal (untuk demo, kita hanya menggunakan filter sederhana)
    const matchesDate = dateFilter === "all"

    return matchesSearch && matchesStatus && matchesDate
  })

  // Render status badge
  const renderStatusBadge = (status: ActivationRecord["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Berhasil
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            <Clock className="mr-1 h-3 w-3" /> Menunggu
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <X className="mr-1 h-3 w-3" /> Gagal
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Riwayat Aktivasi</h2>
        <p className="text-muted-foreground">Riwayat aktivasi internet otomatis setelah pembayaran</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Aktivasi</CardTitle>
              <CardDescription>Riwayat aktivasi internet pelanggan setelah pembayaran</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari ID aktivasi atau pelanggan..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="success">Berhasil</SelectItem>
                    <SelectItem value="pending">Menunggu</SelectItem>
                    <SelectItem value="failed">Gagal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter Tanggal" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tanggal</SelectItem>
                    <SelectItem value="today">Hari Ini</SelectItem>
                    <SelectItem value="yesterday">Kemarin</SelectItem>
                    <SelectItem value="week">Minggu Ini</SelectItem>
                    <SelectItem value="month">Bulan Ini</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Aktivasi</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Tanggal Pembayaran</TableHead>
                  <TableHead>Tanggal Aktivasi</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Metode</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>
                        {record.pelangganNama}
                        <div className="text-xs text-muted-foreground">{record.pelangganId}</div>
                      </TableCell>
                      <TableCell>{record.tanggalPembayaran}</TableCell>
                      <TableCell>{record.tanggalAktivasi}</TableCell>
                      <TableCell>{record.jumlahPembayaran}</TableCell>
                      <TableCell>{record.metodePembayaran}</TableCell>
                      <TableCell>{record.durasi}</TableCell>
                      <TableCell>{renderStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Tidak ada data aktivasi yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Menampilkan {filteredRecords.length} dari {activationRecords.length} data
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Load More
              </Button>
              <Button variant="outline" size="sm">
                Load All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
