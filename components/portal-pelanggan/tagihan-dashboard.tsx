"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, CreditCard, Download, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TagihanDashboard() {
  const [activeTab, setActiveTab] = useState("tagihan")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tagihan & Pembayaran</h1>
        <p className="text-muted-foreground">Kelola tagihan dan lakukan pembayaran dengan mudah</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="tagihan">Tagihan Saat Ini</TabsTrigger>
          <TabsTrigger value="riwayat">Riwayat Pembayaran</TabsTrigger>
          <TabsTrigger value="metode">Metode Pembayaran</TabsTrigger>
        </TabsList>

        <TabsContent value="tagihan" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tagihan Bulan April 2025</CardTitle>
              <CardDescription>Periode 1 April - 30 April 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Total Tagihan</h3>
                    <p className="text-3xl font-bold">Rp 277.500</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Jatuh tempo: 25 April 2025</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <Badge className="w-fit" variant="outline">
                      Status: Belum Dibayar
                    </Badge>
                    <Button asChild>
                      <Link href="/portal-pelanggan/tagihan/bayar">Bayar Sekarang</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 font-semibold">Detail Tagihan</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Paket Home 20 Mbps</TableCell>
                      <TableCell className="text-right">Rp 250.000</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PPN 11%</TableCell>
                      <TableCell className="text-right">Rp 27.500</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Total</TableCell>
                      <TableCell className="text-right font-bold">Rp 277.500</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                <span>Download Invoice</span>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/portal-pelanggan/tagihan/detail">Lihat Detail Lengkap</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cara Pembayaran</CardTitle>
              <CardDescription>Pilih salah satu metode pembayaran berikut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <img src="/placeholder.svg?height=24&width=24&text=BCA" alt="BCA" className="h-8 w-8" />
                      <CardTitle className="text-base">Transfer Bank BCA</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Transfer ke rekening BCA kami dan konfirmasi pembayaran Anda
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/portal-pelanggan/tagihan/bayar/bca">Pilih</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <img src="/placeholder.svg?height=24&width=24&text=Mandiri" alt="Mandiri" className="h-8 w-8" />
                      <CardTitle className="text-base">Transfer Bank Mandiri</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Transfer ke rekening Mandiri kami dan konfirmasi pembayaran Anda
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/portal-pelanggan/tagihan/bayar/mandiri">Pilih</Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <img src="/placeholder.svg?height=24&width=24&text=QRIS" alt="QRIS" className="h-8 w-8" />
                      <CardTitle className="text-base">QRIS</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <p className="text-sm text-muted-foreground">
                      Bayar dengan scan QRIS melalui aplikasi e-wallet atau mobile banking
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href="/portal-pelanggan/tagihan/bayar/qris">Pilih</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="riwayat">
          <Card>
            <CardHeader>
              <CardTitle>Riwayat Pembayaran</CardTitle>
              <CardDescription>Riwayat pembayaran tagihan Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Metode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>10/03/2025</TableCell>
                    <TableCell>Tagihan Maret 2025</TableCell>
                    <TableCell>Transfer BCA</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Lunas
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">Rp 277.500</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Receipt className="h-4 w-4" />
                        <span className="sr-only">Invoice</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>08/02/2025</TableCell>
                    <TableCell>Tagihan Februari 2025</TableCell>
                    <TableCell>QRIS</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Lunas
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">Rp 277.500</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Receipt className="h-4 w-4" />
                        <span className="sr-only">Invoice</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>12/01/2025</TableCell>
                    <TableCell>Tagihan Januari 2025</TableCell>
                    <TableCell>Transfer Mandiri</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Lunas
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">Rp 277.500</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Receipt className="h-4 w-4" />
                        <span className="sr-only">Invoice</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                Lihat Semua Riwayat
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="metode">
          <Card>
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
              <CardDescription>Kelola metode pembayaran Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Auto Debit</h3>
                        <p className="text-sm text-muted-foreground">
                          Aktifkan auto debit untuk pembayaran otomatis setiap bulan
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">Aktifkan</Button>
                  </div>
                </div>

                <h3 className="font-semibold">Metode Pembayaran yang Tersedia</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <img src="/placeholder.svg?height=24&width=24&text=BCA" alt="BCA" className="h-8 w-8" />
                    <div>
                      <p className="font-medium">Transfer Bank BCA</p>
                      <p className="text-xs text-muted-foreground">No. Rek: 1234567890</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <img src="/placeholder.svg?height=24&width=24&text=Mandiri" alt="Mandiri" className="h-8 w-8" />
                    <div>
                      <p className="font-medium">Transfer Bank Mandiri</p>
                      <p className="text-xs text-muted-foreground">No. Rek: 0987654321</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <img src="/placeholder.svg?height=24&width=24&text=QRIS" alt="QRIS" className="h-8 w-8" />
                    <div>
                      <p className="font-medium">QRIS</p>
                      <p className="text-xs text-muted-foreground">Bayar dengan e-wallet atau mobile banking</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
