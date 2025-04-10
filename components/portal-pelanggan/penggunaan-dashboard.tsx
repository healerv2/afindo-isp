"use client"

import { useState } from "react"
import { Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PenggunaanDashboard() {
  const [period, setPeriod] = useState("april2025")

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Penggunaan Internet</h1>
          <p className="text-muted-foreground">Pantau penggunaan internet Anda</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="april2025">April 2025</SelectItem>
            <SelectItem value="maret2025">Maret 2025</SelectItem>
            <SelectItem value="februari2025">Februari 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Penggunaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">750 GB</div>
            <div className="mt-2">
              <Progress value={75} className="h-2" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">75% dari kuota 1000 GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rata-rata Harian</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25 GB</div>
            <p className="mt-2 text-xs text-muted-foreground">Penggunaan rata-rata per hari</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sisa Kuota</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250 GB</div>
            <div className="mt-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Tersisa 10 hari dalam periode ini</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Harian</TabsTrigger>
          <TabsTrigger value="hourly">Per Jam</TabsTrigger>
          <TabsTrigger value="devices">Perangkat</TabsTrigger>
        </TabsList>
        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Harian</CardTitle>
              <CardDescription>Penggunaan internet per hari dalam periode April 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border">
                {/* Placeholder untuk grafik penggunaan harian */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Grafik Penggunaan Harian</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto gap-1">
                <Download className="h-4 w-4" />
                <span>Download Data</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="hourly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Per Jam</CardTitle>
              <CardDescription>Penggunaan internet per jam dalam 24 jam terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border">
                {/* Placeholder untuk grafik penggunaan per jam */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Grafik Penggunaan Per Jam</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto gap-1">
                <Download className="h-4 w-4" />
                <span>Download Data</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Per Perangkat</CardTitle>
              <CardDescription>Penggunaan internet berdasarkan perangkat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border">
                {/* Placeholder untuk grafik penggunaan per perangkat */}
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">Grafik Penggunaan Per Perangkat</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto gap-1">
                <Download className="h-4 w-4" />
                <span>Download Data</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Tips Menghemat Kuota</CardTitle>
          <CardDescription>Cara mengoptimalkan penggunaan internet Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold">Atur Kualitas Streaming</h3>
              <p className="mt-1 text-sm">
                Kurangi kualitas video streaming pada platform seperti YouTube, Netflix, atau platform streaming lainnya
                untuk menghemat kuota.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold">Matikan Auto-Update</h3>
              <p className="mt-1 text-sm">
                Nonaktifkan fitur auto-update pada perangkat dan aplikasi Anda untuk menghindari penggunaan data yang
                tidak perlu.
              </p>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold">Gunakan Wi-Fi Analyzer</h3>
              <p className="mt-1 text-sm">
                Gunakan aplikasi Wi-Fi analyzer untuk menemukan channel Wi-Fi yang paling optimal dan mengurangi
                interferensi.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
