"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText } from "lucide-react"

export function KeuanganLaporan() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Laporan Keuangan</CardTitle>
          <CardDescription>Akses dan unduh laporan keuangan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="space-y-2">
              <p className="text-sm font-medium">Jenis Laporan</p>
              <Select defaultValue="laba-rugi">
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="laba-rugi">Laporan Laba Rugi</SelectItem>
                  <SelectItem value="arus-kas">Laporan Arus Kas</SelectItem>
                  <SelectItem value="neraca">Neraca</SelectItem>
                  <SelectItem value="pajak">Laporan Pajak</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Periode</p>
              <Select defaultValue="januari-2023">
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Pilih periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="januari-2023">Januari 2023</SelectItem>
                  <SelectItem value="februari-2023">Februari 2023</SelectItem>
                  <SelectItem value="maret-2023">Maret 2023</SelectItem>
                  <SelectItem value="q1-2023">Q1 2023</SelectItem>
                  <SelectItem value="tahun-2022">Tahun 2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Format</p>
              <Select defaultValue="pdf">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Pilih format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="gap-1">
              <Download className="h-4 w-4" /> Unduh Laporan
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Laporan Terbaru</CardTitle>
            <CardDescription>Laporan yang baru dibuat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-10 w-10 text-primary" />
                  <div>
                    <p className="font-medium">Laporan Laba Rugi</p>
                    <p className="text-sm text-muted-foreground">Januari 2023</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-10 w-10 text-primary" />
                  <div>
                    <p className="font-medium">Laporan Arus Kas</p>
                    <p className="text-sm text-muted-foreground">Januari 2023</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-10 w-10 text-primary" />
                  <div>
                    <p className="font-medium">Neraca</p>
                    <p className="text-sm text-muted-foreground">Januari 2023</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Jadwal Laporan</CardTitle>
            <CardDescription>Laporan yang dijadwalkan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Laporan Laba Rugi Bulanan</p>
                  <p className="text-sm text-muted-foreground">Setiap akhir bulan</p>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Aktif</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Laporan Arus Kas Mingguan</p>
                  <p className="text-sm text-muted-foreground">Setiap hari Senin</p>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Aktif</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Laporan Pajak Tahunan</p>
                  <p className="text-sm text-muted-foreground">Setiap akhir tahun</p>
                </div>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Aktif</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
