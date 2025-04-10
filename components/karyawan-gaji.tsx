"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye } from "lucide-react"

export function KaryawanGaji() {
  const [periode, setPeriode] = useState("januari-2023")
  const [departemen, setDepartemen] = useState("semua")

  // Data dummy untuk gaji karyawan
  const gajiData = [
    {
      id: "EMP001",
      nama: "Budi Santoso",
      departemen: "Teknis",
      jabatan: "Teknisi Lapangan",
      gajiPokok: "Rp 4,500,000",
      tunjangan: "Rp 1,000,000",
      bonus: "Rp 500,000",
      potongan: "Rp 200,000",
      totalGaji: "Rp 5,800,000",
      status: "Dibayar",
    },
    {
      id: "EMP002",
      nama: "Siti Rahayu",
      departemen: "Keuangan",
      jabatan: "Admin Keuangan",
      gajiPokok: "Rp 5,000,000",
      tunjangan: "Rp 1,200,000",
      bonus: "Rp 300,000",
      potongan: "Rp 250,000",
      totalGaji: "Rp 6,250,000",
      status: "Dibayar",
    },
    {
      id: "EMP003",
      nama: "Ahmad Hidayat",
      departemen: "Teknis",
      jabatan: "Teknisi Lapangan",
      gajiPokok: "Rp 4,500,000",
      tunjangan: "Rp 1,000,000",
      bonus: "Rp 450,000",
      potongan: "Rp 200,000",
      totalGaji: "Rp 5,750,000",
      status: "Dibayar",
    },
    {
      id: "EMP004",
      nama: "Dewi Lestari",
      departemen: "Pelayanan",
      jabatan: "Customer Service",
      gajiPokok: "Rp 4,200,000",
      tunjangan: "Rp 800,000",
      bonus: "Rp 400,000",
      potongan: "Rp 180,000",
      totalGaji: "Rp 5,220,000",
      status: "Dibayar",
    },
    {
      id: "EMP005",
      nama: "Rudi Hartono",
      departemen: "Teknis",
      jabatan: "Manager Teknis",
      gajiPokok: "Rp 8,000,000",
      tunjangan: "Rp 2,000,000",
      bonus: "Rp 1,000,000",
      potongan: "Rp 400,000",
      totalGaji: "Rp 10,600,000",
      status: "Dibayar",
    },
    {
      id: "EMP006",
      nama: "Rina Wijaya",
      departemen: "SDM",
      jabatan: "HRD",
      gajiPokok: "Rp 6,500,000",
      tunjangan: "Rp 1,500,000",
      bonus: "Rp 500,000",
      potongan: "Rp 300,000",
      totalGaji: "Rp 8,200,000",
      status: "Dibayar",
    },
    {
      id: "EMP007",
      nama: "Doni Kusuma",
      departemen: "Pemasaran",
      jabatan: "Marketing",
      gajiPokok: "Rp 5,500,000",
      tunjangan: "Rp 1,200,000",
      bonus: "Rp 800,000",
      potongan: "Rp 250,000",
      totalGaji: "Rp 7,250,000",
      status: "Dibayar",
    },
    {
      id: "EMP008",
      nama: "Andi Pratama",
      departemen: "Teknis",
      jabatan: "Teknisi Lapangan",
      gajiPokok: "Rp 4,500,000",
      tunjangan: "Rp 1,000,000",
      bonus: "Rp 300,000",
      potongan: "Rp 200,000",
      totalGaji: "Rp 5,600,000",
      status: "Dibayar",
    },
  ]

  // Filter data berdasarkan departemen
  const filteredData = gajiData.filter((item) => {
    return departemen === "semua" || item.departemen.toLowerCase() === departemen
  })

  // Hitung total gaji
  const totalGaji = filteredData.reduce((total, item) => {
    const amount = Number.parseInt(item.totalGaji.replace(/\D/g, ""))
    return total + amount
  }, 0)

  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID")}`
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Gaji</CardTitle>
          <CardDescription>Periode: Januari 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Pengeluaran Gaji</p>
              <p className="text-2xl font-bold">{formatCurrency(totalGaji)}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Rata-rata Gaji</p>
              <p className="text-2xl font-bold">{formatCurrency(Math.round(totalGaji / filteredData.length))}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Bonus</p>
              <p className="text-2xl font-bold">Rp 4,250,000</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Tunjangan</p>
              <p className="text-2xl font-bold">Rp 9,700,000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
          <Select value={periode} onValueChange={setPeriode}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="januari-2023">Januari 2023</SelectItem>
              <SelectItem value="desember-2022">Desember 2022</SelectItem>
              <SelectItem value="november-2022">November 2022</SelectItem>
            </SelectContent>
          </Select>
          <Select value={departemen} onValueChange={setDepartemen}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Departemen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Departemen</SelectItem>
              <SelectItem value="teknis">Teknis</SelectItem>
              <SelectItem value="keuangan">Keuangan</SelectItem>
              <SelectItem value="pelayanan">Pelayanan</SelectItem>
              <SelectItem value="sdm">SDM</SelectItem>
              <SelectItem value="pemasaran">Pemasaran</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="gap-1">
          <Download className="h-4 w-4" /> Export Slip Gaji
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Departemen</TableHead>
              <TableHead>Jabatan</TableHead>
              <TableHead>Gaji Pokok</TableHead>
              <TableHead>Tunjangan</TableHead>
              <TableHead>Bonus</TableHead>
              <TableHead>Potongan</TableHead>
              <TableHead>Total Gaji</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.departemen}</TableCell>
                <TableCell>{item.jabatan}</TableCell>
                <TableCell>{item.gajiPokok}</TableCell>
                <TableCell>{item.tunjangan}</TableCell>
                <TableCell>{item.bonus}</TableCell>
                <TableCell>{item.potongan}</TableCell>
                <TableCell className="font-medium">{item.totalGaji}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">{item.status}</span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
