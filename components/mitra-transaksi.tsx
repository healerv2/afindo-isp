"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"

export function MitraTransaksi() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("semua")

  // Data dummy untuk transaksi mitra
  const transaksiData = [
    {
      id: "TRX001",
      tanggal: "15 Jan 2023",
      pelanggan: "Budi Santoso",
      deskripsi: "Pembayaran Internet - Januari 2023",
      jumlah: "Rp 150.000",
      status: "Berhasil",
    },
    {
      id: "TRX002",
      tanggal: "12 Jan 2023",
      pelanggan: "Siti Rahayu",
      deskripsi: "Pembayaran Internet - Januari 2023",
      jumlah: "Rp 250.000",
      status: "Berhasil",
    },
    {
      id: "TRX003",
      tanggal: "10 Jan 2023",
      pelanggan: "Ahmad Hidayat",
      deskripsi: "Pembayaran Internet - Januari 2023",
      jumlah: "Rp 350.000",
      status: "Pending",
    },
  ]

  // Filter data berdasarkan pencarian dan status
  const filteredData = transaksiData.filter((item) => {
    const matchSearch =
      item.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "semua" || item.status === filterStatus
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Transaksi</CardTitle>
          <CardDescription>Ringkasan transaksi bulan ini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Transaksi</p>
              <p className="text-2xl font-bold">Rp 450,000</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Transaksi Berhasil</p>
              <p className="text-2xl font-bold">Rp 400,000</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Transaksi Pending</p>
              <p className="text-2xl font-bold">Rp 50,000</p>
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
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Status</SelectItem>
              <SelectItem value="Berhasil">Berhasil</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
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
              <TableHead>Pelanggan</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Jumlah</TableHead>
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
                <TableCell>{item.jumlah}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.status === "Berhasil" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
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
