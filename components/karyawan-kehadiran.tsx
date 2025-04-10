"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, Download } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function KaryawanKehadiran() {
  const [date, setDate] = useState<Date>(new Date())
  const [filterDepartemen, setFilterDepartemen] = useState("semua")

  // Data dummy untuk kehadiran
  const kehadiranData = [
    {
      id: "EMP001",
      nama: "Budi Santoso",
      departemen: "Teknis",
      waktuMasuk: "07:55",
      waktuPulang: "17:05",
      status: "Hadir",
      keterangan: "-",
    },
    {
      id: "EMP002",
      nama: "Siti Rahayu",
      departemen: "Keuangan",
      waktuMasuk: "08:02",
      waktuPulang: "17:00",
      status: "Hadir",
      keterangan: "-",
    },
    {
      id: "EMP003",
      nama: "Ahmad Hidayat",
      departemen: "Teknis",
      waktuMasuk: "07:45",
      waktuPulang: "17:15",
      status: "Hadir",
      keterangan: "-",
    },
    {
      id: "EMP004",
      nama: "Dewi Lestari",
      departemen: "Pelayanan",
      waktuMasuk: "08:10",
      waktuPulang: "17:05",
      status: "Hadir",
      keterangan: "-",
    },
    {
      id: "EMP005",
      nama: "Rudi Hartono",
      departemen: "Teknis",
      waktuMasuk: "-",
      waktuPulang: "-",
      status: "Izin",
      keterangan: "Sakit",
    },
    {
      id: "EMP006",
      nama: "Rina Wijaya",
      departemen: "SDM",
      waktuMasuk: "08:00",
      waktuPulang: "17:00",
      status: "Hadir",
      keterangan: "-",
    },
    {
      id: "EMP007",
      nama: "Doni Kusuma",
      departemen: "Pemasaran",
      waktuMasuk: "08:05",
      waktuPulang: "17:10",
      status: "Hadir",
      keterangan: "-",
    },
    {
      id: "EMP008",
      nama: "Andi Pratama",
      departemen: "Teknis",
      waktuMasuk: "-",
      waktuPulang: "-",
      status: "Tidak Hadir",
      keterangan: "Tanpa Keterangan",
    },
  ]

  // Filter data berdasarkan departemen
  const filteredData = kehadiranData.filter((item) => {
    return filterDepartemen === "semua" || item.departemen === filterDepartemen
  })

  // Hitung statistik kehadiran
  const totalKaryawan = kehadiranData.length
  const totalHadir = kehadiranData.filter((item) => item.status === "Hadir").length
  const totalIzin = kehadiranData.filter((item) => item.status === "Izin").length
  const totalTidakHadir = kehadiranData.filter((item) => item.status === "Tidak Hadir").length

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Kehadiran Karyawan</CardTitle>
            <CardDescription>{format(date, "EEEE, dd MMMM yyyy", { locale: id })}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Karyawan</p>
                <p className="text-2xl font-bold">{totalKaryawan}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Hadir</p>
                <p className="text-2xl font-bold">{totalHadir}</p>
                <p className="text-xs text-muted-foreground">{Math.round((totalHadir / totalKaryawan) * 100)}%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Izin</p>
                <p className="text-2xl font-bold">{totalIzin}</p>
                <p className="text-xs text-muted-foreground">{Math.round((totalIzin / totalKaryawan) * 100)}%</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Tidak Hadir</p>
                <p className="text-2xl font-bold">{totalTidakHadir}</p>
                <p className="text-xs text-muted-foreground">{Math.round((totalTidakHadir / totalKaryawan) * 100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-[300px]">
          <CardHeader>
            <CardTitle>Pilih Tanggal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: id }) : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
                </PopoverContent>
              </Popover>
              <Button variant="outline" className="gap-1">
                <Download className="h-4 w-4" /> Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-2">
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
              <TableHead>Departemen</TableHead>
              <TableHead>Waktu Masuk</TableHead>
              <TableHead>Waktu Pulang</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Keterangan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell>{item.departemen}</TableCell>
                <TableCell>{item.waktuMasuk}</TableCell>
                <TableCell>{item.waktuPulang}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.status === "Hadir"
                        ? "bg-green-100 text-green-800"
                        : item.status === "Izin"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>{item.keterangan}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
