"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Plus, Search } from "lucide-react"
import Link from "next/link"

export function MitraList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("semua")

  // Data dummy untuk mitra
  const mitraData = [
    {
      id: "MTR00012345",
      nama: "PT Maju Jaya",
      paket: "Professional",
      pelanggan: 87,
      status: "Aktif",
      tanggalBergabung: "15 Jan 2023",
      alamat: "Jl. Raya Bogor No. 123, Jakarta Timur",
      email: "info@majujaya.com",
      telepon: "021-5551234",
    },
    {
      id: "MTR00023456",
      nama: "CV Sentosa",
      paket: "Basic",
      pelanggan: 42,
      status: "Aktif",
      tanggalBergabung: "20 Feb 2023",
      alamat: "Jl. Gatot Subroto No. 45, Jakarta Selatan",
      email: "admin@sentosa.co.id",
      telepon: "021-5552345",
    },
    {
      id: "MTR00034567",
      nama: "PT Abadi Sejahtera",
      paket: "Enterprise",
      pelanggan: 156,
      status: "Aktif",
      tanggalBergabung: "5 Mar 2023",
      alamat: "Jl. Sudirman No. 78, Jakarta Pusat",
      email: "contact@abadisejahtera.com",
      telepon: "021-5553456",
    },
    {
      id: "MTR00045678",
      nama: "Kafe Santai",
      paket: "Basic",
      pelanggan: 12,
      status: "Tidak Aktif",
      tanggalBergabung: "10 Apr 2023",
      alamat: "Jl. Kemang Raya No. 56, Jakarta Selatan",
      email: "info@kafesantai.com",
      telepon: "021-5554567",
    },
    {
      id: "MTR00056789",
      nama: "PT Mitra Utama",
      paket: "Professional",
      pelanggan: 73,
      status: "Aktif",
      tanggalBergabung: "25 May 2023",
      alamat: "Jl. Thamrin No. 34, Jakarta Pusat",
      email: "admin@mitrautama.co.id",
      telepon: "021-5555678",
    },
  ]

  // Filter data berdasarkan pencarian dan status
  const filteredData = mitraData.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchStatus = filterStatus === "semua" || item.status === filterStatus

    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari mitra..."
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
              <SelectItem value="Aktif">Aktif</SelectItem>
              <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2" asChild>
            <Link href="/mitra/tambah">
              <Plus className="h-4 w-4" /> Tambah Mitra
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Mitra</TableHead>
                <TableHead>Paket</TableHead>
                <TableHead>Jumlah Pelanggan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{item.nama}</div>
                    <div className="text-xs text-muted-foreground">{item.email}</div>
                  </TableCell>
                  <TableCell>{item.paket}</TableCell>
                  <TableCell>{item.pelanggan}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Aktif" ? "default" : "secondary"}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>{item.tanggalBergabung}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      Detail
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
