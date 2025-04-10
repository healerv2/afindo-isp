"use client"

import { useState } from "react"
import { Bell, ChevronDown, Download, Menu, Plus, Search, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KeuanganOverview } from "@/components/keuangan-overview"
import { KeuanganPendapatan } from "@/components/keuangan-pendapatan"
import { KeuanganPengeluaran } from "@/components/keuangan-pengeluaran"
import { KeuanganInvoice } from "@/components/keuangan-invoice"
import { KeuanganLaporan } from "@/components/keuangan-laporan"
import { TambahTransaksiModal } from "@/components/tambah-transaksi-modal"
// Tambahkan import untuk komponen baru
import { KeuanganPengaturan } from "@/components/keuangan-pengaturan"

export function KeuanganDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentMonth, setCurrentMonth] = useState("Januari")
  const [currentYear, setCurrentYear] = useState("2023")
  const [showTambahModal, setShowTambahModal] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 border-b bg-background">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{currentMonth}</span>
              <ChevronDown className="h-4 w-4" />
              <span className="text-sm font-medium">{currentYear}</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari cepat..."
                className="w-[200px] pl-8 md:w-[300px] rounded-full bg-muted"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Profile Perusahaan</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Keuangan</h1>
                <p className="text-muted-foreground">Kelola keuangan dan transaksi Anda</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" /> Export
                </Button>
                <Button className="gap-1" onClick={() => setShowTambahModal(true)}>
                  <Plus className="h-4 w-4" /> Tambah Transaksi
                </Button>
              </div>
            </div>

            {/* Ringkasan Keuangan */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rp 45,231,890</div>
                  <p className="text-xs text-muted-foreground">+8% dari bulan lalu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rp 12,543,200</div>
                  <p className="text-xs text-muted-foreground">+2% dari bulan lalu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Rp 32,688,690</div>
                  <p className="text-xs text-muted-foreground">+10% dari bulan lalu</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Invoice Belum Dibayar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Total Rp 8,450,000</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Keuangan */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pendapatan">Pendapatan</TabsTrigger>
                <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
                <TabsTrigger value="invoice">Invoice</TabsTrigger>
                <TabsTrigger value="laporan">Laporan</TabsTrigger>
                <TabsTrigger value="pengaturan">Pengaturan</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <KeuanganOverview />
              </TabsContent>
              <TabsContent value="pendapatan" className="space-y-4">
                <KeuanganPendapatan />
              </TabsContent>
              <TabsContent value="pengeluaran" className="space-y-4">
                <KeuanganPengeluaran />
              </TabsContent>
              <TabsContent value="invoice" className="space-y-4">
                <KeuanganInvoice />
              </TabsContent>
              <TabsContent value="laporan" className="space-y-4">
                <KeuanganLaporan />
              </TabsContent>
              <TabsContent value="pengaturan" className="space-y-4">
                <KeuanganPengaturan />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Modal Tambah Transaksi */}
      <TambahTransaksiModal isOpen={showTambahModal} onClose={() => setShowTambahModal(false)} />
    </div>
  )
}
