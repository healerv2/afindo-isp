"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AutoActivationSettings } from "@/components/auto-activation-settings"
import { PaymentVerification } from "@/components/payment-verification"
import { ActivationHistory } from "@/components/activation-history"

export function ActivationDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Aktivasi Otomatis</h2>
          <p className="text-muted-foreground">
            Kelola pengaktifan internet otomatis setelah pelanggan melakukan pembayaran
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="settings">Pengaturan</TabsTrigger>
          <TabsTrigger value="verification">Verifikasi Pembayaran</TabsTrigger>
          <TabsTrigger value="history">Riwayat Aktivasi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Aktivasi Hari Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 dari kemarin</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waktu Respons Rata-rata</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 menit</div>
                <p className="text-xs text-muted-foreground">-0.5 menit dari minggu lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tingkat Keberhasilan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">+0.5% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menunggu Verifikasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Perlu tindakan</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Aktivasi Terbaru</CardTitle>
                <CardDescription>5 aktivasi internet terbaru</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "ACT12345",
                      pelanggan: "PT Maju Jaya",
                      waktu: "15 Jan 2025 14:35",
                      status: "success",
                    },
                    {
                      id: "ACT12346",
                      pelanggan: "CV Sentosa",
                      waktu: "15 Jan 2025 13:50",
                      status: "success",
                    },
                    {
                      id: "ACT12347",
                      pelanggan: "CV Mandiri",
                      waktu: "15 Jan 2025 12:25",
                      status: "success",
                    },
                    {
                      id: "ACT12348",
                      pelanggan: "Toko Elektronik",
                      waktu: "15 Jan 2025 11:25",
                      status: "success",
                    },
                    {
                      id: "ACT12349",
                      pelanggan: "PT Baru Jaya",
                      waktu: "Menunggu",
                      status: "pending",
                    },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.pelanggan}</p>
                        <p className="text-sm text-muted-foreground">{item.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{item.waktu}</p>
                        <p
                          className={`text-xs ${
                            item.status === "success"
                              ? "text-green-600"
                              : item.status === "pending"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {item.status === "success" ? "Berhasil" : item.status === "pending" ? "Menunggu" : "Gagal"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm">
                    Lihat Semua
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pembayaran Menunggu Verifikasi</CardTitle>
                <CardDescription>Pembayaran yang perlu diverifikasi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "PAY123456",
                      pelanggan: "PT Maju Jaya",
                      jumlah: "Rp 2.500.000",
                      waktu: "15 Jan 2025 14:30",
                    },
                    {
                      id: "PAY123461",
                      pelanggan: "Kafe Santai",
                      jumlah: "Rp 750.000",
                      waktu: "15 Jan 2025 14:15",
                    },
                    {
                      id: "PAY123462",
                      pelanggan: "Apotek Sehat",
                      jumlah: "Rp 1.800.000",
                      waktu: "15 Jan 2025 13:50",
                    },
                  ].map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.pelanggan}</p>
                        <p className="text-sm text-muted-foreground">{item.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.jumlah}</p>
                        <p className="text-sm text-muted-foreground">{item.waktu}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm">
                    Verifikasi Semua
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <AutoActivationSettings />
        </TabsContent>

        <TabsContent value="verification">
          <PaymentVerification />
        </TabsContent>

        <TabsContent value="history">
          <ActivationHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}
