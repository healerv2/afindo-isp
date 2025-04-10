"use client"

import Link from "next/link"
import { ArrowRight, CreditCard, FileText, Package, Wifi } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PortalPelangganDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Selamat datang, Ahmad!</h1>
        <p className="text-muted-foreground">Kelola layanan internet Anda dengan mudah di sini.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Status Layanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 rounded-full bg-green-500"></span>
              <span className="text-xl font-bold">Aktif</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Paket Home 20 Mbps</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="px-0" asChild>
              <Link href="/portal-pelanggan/paket" className="flex items-center gap-1">
                <span>Detail Paket</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tagihan Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Rp 250.000</div>
            <p className="mt-2 text-xs text-muted-foreground">Jatuh tempo: 25 April 2025</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="px-0" asChild>
              <Link href="/portal-pelanggan/tagihan" className="flex items-center gap-1">
                <span>Bayar Sekarang</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Penggunaan Kuota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">75%</div>
            <div className="mt-2">
              <Progress value={75} className="h-2" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">750 GB dari 1000 GB</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="px-0" asChild>
              <Link href="/portal-pelanggan/penggunaan" className="flex items-center gap-1">
                <span>Detail Penggunaan</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tiket Support</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">1 Aktif</div>
            <p className="mt-2 text-xs text-muted-foreground">2 Tiket selesai bulan ini</p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="px-0" asChild>
              <Link href="/portal-pelanggan/tiket" className="flex items-center gap-1">
                <span>Lihat Tiket</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="aktivitas">
        <TabsList>
          <TabsTrigger value="aktivitas">Aktivitas Terbaru</TabsTrigger>
          <TabsTrigger value="pengumuman">Pengumuman</TabsTrigger>
        </TabsList>
        <TabsContent value="aktivitas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Riwayat aktivitas akun Anda dalam 30 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Pembayaran Berhasil</p>
                    <p className="text-xs text-muted-foreground">
                      Pembayaran tagihan bulan Maret sebesar Rp 250.000 berhasil
                    </p>
                    <p className="text-xs text-muted-foreground">10 April 2025, 14:30</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Wifi className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Penggunaan Internet Tinggi</p>
                    <p className="text-xs text-muted-foreground">
                      Penggunaan internet Anda mencapai 75% dari kuota bulanan
                    </p>
                    <p className="text-xs text-muted-foreground">8 April 2025, 09:15</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Tiket Support Dibuat</p>
                    <p className="text-xs text-muted-foreground">
                      Anda membuat tiket support baru: "Koneksi lambat saat sore hari"
                    </p>
                    <p className="text-xs text-muted-foreground">5 April 2025, 17:22</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Penawaran Paket Baru</p>
                    <p className="text-xs text-muted-foreground">
                      Ada penawaran khusus untuk upgrade paket Anda ke Home 50 Mbps
                    </p>
                    <p className="text-xs text-muted-foreground">1 April 2025, 10:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/portal-pelanggan/riwayat">Lihat Semua Aktivitas</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="pengumuman" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengumuman</CardTitle>
              <CardDescription>Informasi penting dan pembaruan dari Afindo ISP</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold">Pemeliharaan Jaringan Terjadwal</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kami akan melakukan pemeliharaan jaringan pada tanggal 15 April 2025 pukul 01:00 - 05:00 WIB.
                    Layanan internet mungkin akan terganggu selama periode ini.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Diposting: 1 April 2025</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold">Paket Baru Home 100 Mbps</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Kami dengan senang hati mengumumkan peluncuran paket baru Home 100 Mbps dengan harga spesial.
                    Hubungi customer service untuk informasi lebih lanjut.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Diposting: 25 Maret 2025</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold">Update Aplikasi Mobile</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Aplikasi mobile Afindo ISP telah diperbarui dengan fitur baru. Silakan update aplikasi Anda untuk
                    pengalaman yang lebih baik.
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">Diposting: 15 Maret 2025</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href="/portal-pelanggan/pengumuman">Lihat Semua Pengumuman</Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Paket Layanan Saat Ini</CardTitle>
            <CardDescription>Detail paket internet yang Anda gunakan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="text-lg font-semibold">Home 20 Mbps</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kecepatan Download</span>
                  <span className="text-sm font-medium">20 Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kecepatan Upload</span>
                  <span className="text-sm font-medium">10 Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kuota Bulanan</span>
                  <span className="text-sm font-medium">1000 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Biaya Bulanan</span>
                  <span className="text-sm font-medium">Rp 250.000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Masa Aktif</span>
                  <span className="text-sm font-medium">1 April - 30 April 2025</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/portal-pelanggan/paket">Lihat Semua Paket</Link>
            </Button>
            <Button asChild>
              <Link href="/portal-pelanggan/paket/upgrade">Upgrade Paket</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Informasi Pembayaran</CardTitle>
            <CardDescription>Detail tagihan dan metode pembayaran</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Tagihan Bulan Ini</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Paket Home 20 Mbps</span>
                    <span className="text-sm font-medium">Rp 250.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">PPN 11%</span>
                    <span className="text-sm font-medium">Rp 27.500</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-sm font-bold">Rp 277.500</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">Periode: 1 April - 30 April 2025</p>
                  <p className="text-xs text-muted-foreground">Jatuh tempo: 25 April 2025</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold">Metode Pembayaran</h3>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="h-auto flex-col py-2">
                    <img src="/placeholder.svg?height=24&width=24&text=BCA" alt="BCA" className="mb-1 h-6 w-6" />
                    <span className="text-xs">BCA</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto flex-col py-2">
                    <img
                      src="/placeholder.svg?height=24&width=24&text=Mandiri"
                      alt="Mandiri"
                      className="mb-1 h-6 w-6"
                    />
                    <span className="text-xs">Mandiri</span>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto flex-col py-2">
                    <img src="/placeholder.svg?height=24&width=24&text=QRIS" alt="QRIS" className="mb-1 h-6 w-6" />
                    <span className="text-xs">QRIS</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/portal-pelanggan/tagihan/riwayat">Riwayat Tagihan</Link>
            </Button>
            <Button asChild>
              <Link href="/portal-pelanggan/tagihan/bayar">Bayar Sekarang</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
