"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function KaryawanKinerja() {
  // Data dummy untuk kinerja karyawan
  const kinerjaData = [
    {
      id: "EMP001",
      nama: "Budi Santoso",
      departemen: "Teknis",
      jabatan: "Teknisi Lapangan",
      tugasSelesai: 45,
      ratingPelanggan: 4.8,
      ketepatan: "95%",
      kinerja: "Sangat Baik",
    },
    {
      id: "EMP003",
      nama: "Ahmad Hidayat",
      departemen: "Teknis",
      jabatan: "Teknisi Lapangan",
      tugasSelesai: 42,
      ratingPelanggan: 4.6,
      ketepatan: "90%",
      kinerja: "Sangat Baik",
    },
    {
      id: "EMP008",
      nama: "Andi Pratama",
      departemen: "Teknis",
      jabatan: "Teknisi Lapangan",
      tugasSelesai: 38,
      ratingPelanggan: 4.5,
      ketepatan: "85%",
      kinerja: "Baik",
    },
    {
      id: "EMP005",
      nama: "Rudi Hartono",
      departemen: "Teknis",
      jabatan: "Manager Teknis",
      tugasSelesai: 15,
      ratingPelanggan: 4.7,
      ketepatan: "95%",
      kinerja: "Sangat Baik",
    },
    {
      id: "EMP004",
      nama: "Dewi Lestari",
      departemen: "Pelayanan",
      jabatan: "Customer Service",
      tugasSelesai: 120,
      ratingPelanggan: 4.9,
      ketepatan: "98%",
      kinerja: "Sangat Baik",
    },
    {
      id: "EMP002",
      nama: "Siti Rahayu",
      departemen: "Keuangan",
      jabatan: "Admin Keuangan",
      tugasSelesai: 65,
      ratingPelanggan: 4.5,
      ketepatan: "92%",
      kinerja: "Baik",
    },
    {
      id: "EMP007",
      nama: "Doni Kusuma",
      departemen: "Pemasaran",
      jabatan: "Marketing",
      tugasSelesai: 28,
      ratingPelanggan: 4.4,
      ketepatan: "88%",
      kinerja: "Baik",
    },
    {
      id: "EMP006",
      nama: "Rina Wijaya",
      departemen: "SDM",
      jabatan: "HRD",
      tugasSelesai: 35,
      ratingPelanggan: 4.6,
      ketepatan: "94%",
      kinerja: "Sangat Baik",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Kinerja Rata-rata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+2% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rating Pelanggan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5.0</div>
            <p className="text-xs text-muted-foreground">+0.1 dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tugas Selesai</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">388</div>
            <p className="text-xs text-muted-foreground">+15% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ketepatan Waktu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">93%</div>
            <p className="text-xs text-muted-foreground">+3% dari bulan lalu</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kinerja Karyawan</CardTitle>
          <CardDescription>Periode: Januari 2023</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2">
              <Select defaultValue="januari-2023">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="januari-2023">Januari 2023</SelectItem>
                  <SelectItem value="desember-2022">Desember 2022</SelectItem>
                  <SelectItem value="november-2022">November 2022</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="semua">
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
          </div>

          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Jabatan</TableHead>
                  <TableHead>Tugas Selesai</TableHead>
                  <TableHead>Rating Pelanggan</TableHead>
                  <TableHead>Ketepatan</TableHead>
                  <TableHead>Kinerja</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {kinerjaData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.departemen}</TableCell>
                    <TableCell>{item.jabatan}</TableCell>
                    <TableCell>{item.tugasSelesai}</TableCell>
                    <TableCell>{item.ratingPelanggan}</TableCell>
                    <TableCell>{item.ketepatan}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          item.kinerja === "Sangat Baik"
                            ? "bg-green-100 text-green-800"
                            : item.kinerja === "Baik"
                              ? "bg-blue-100 text-blue-800"
                              : item.kinerja === "Cukup"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.kinerja}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
