"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function KeuanganOverview() {
  return (
    <div className="grid gap-4">
      {/* Grafik Pendapatan vs Pengeluaran */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Pendapatan vs Pengeluaran</CardTitle>
          <CardDescription>Perbandingan pendapatan dan pengeluaran 6 bulan terakhir</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full bg-muted/20 rounded-md flex items-center justify-center">
            <p className="text-muted-foreground">Grafik Pendapatan vs Pengeluaran akan ditampilkan di sini</p>
          </div>
        </CardContent>
      </Card>

      {/* Transaksi Terbaru */}
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Transaksi Terbaru</CardTitle>
          <CardDescription>10 transaksi terakhir yang tercatat dalam sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
              <div>TANGGAL</div>
              <div>DESKRIPSI</div>
              <div>KATEGORI</div>
              <div>JUMLAH</div>
              <div>STATUS</div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4 rounded-lg border p-4">
              <div className="text-sm">12 Jan 2023</div>
              <div className="text-sm">Pembayaran Internet - PT Maju Jaya</div>
              <div className="text-sm">Pendapatan</div>
              <div className="text-sm font-medium text-green-600">+ Rp 2,500,000</div>
              <div className="text-sm">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Selesai</span>
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4 rounded-lg border p-4">
              <div className="text-sm">10 Jan 2023</div>
              <div className="text-sm">Pembayaran Listrik</div>
              <div className="text-sm">Pengeluaran</div>
              <div className="text-sm font-medium text-red-600">- Rp 1,200,000</div>
              <div className="text-sm">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Selesai</span>
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4 rounded-lg border p-4">
              <div className="text-sm">8 Jan 2023</div>
              <div className="text-sm">Pembayaran Internet - CV Sentosa</div>
              <div className="text-sm">Pendapatan</div>
              <div className="text-sm font-medium text-green-600">+ Rp 1,800,000</div>
              <div className="text-sm">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Selesai</span>
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4 rounded-lg border p-4">
              <div className="text-sm">5 Jan 2023</div>
              <div className="text-sm">Pembelian Peralatan</div>
              <div className="text-sm">Pengeluaran</div>
              <div className="text-sm font-medium text-red-600">- Rp 3,500,000</div>
              <div className="text-sm">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Selesai</span>
              </div>
            </div>
            <div className="grid grid-cols-5 items-center gap-4 rounded-lg border p-4">
              <div className="text-sm">3 Jan 2023</div>
              <div className="text-sm">Pembayaran Internet - Toko Bahagia</div>
              <div className="text-sm">Pendapatan</div>
              <div className="text-sm font-medium text-green-600">+ Rp 750,000</div>
              <div className="text-sm">
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Selesai</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
