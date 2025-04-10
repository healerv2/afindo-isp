"use client"

import { useState } from "react"
import { Bell, ChevronDown, Menu, Plus, Search, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KaryawanList } from "@/components/karyawan-list"
import { KaryawanKehadiran } from "@/components/karyawan-kehadiran"
import { KaryawanKinerja } from "@/components/karyawan-kinerja"
import { KaryawanGaji } from "@/components/karyawan-gaji"
import { TambahKaryawanModal } from "@/components/tambah-karyawan-modal"
import Link from "next/link"

export function KaryawanDashboard() {
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
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile-perusahaan">Profile Perusahaan</Link>
                </DropdownMenuItem>
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
                <h1 className="text-2xl font-bold tracking-tight">Karyawan</h1>
                <p className="text-muted-foreground">Kelola data karyawan Anda</p>
              </div>
              <Button className="gap-1" onClick={() => setShowTambahModal(true)}>
                <Plus className="h-4 w-4" /> Tambah Karyawan
              </Button>
            </div>

            {/* Ringkasan Karyawan */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Total Karyawan</h3>
                </div>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 karyawan baru bulan ini</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Kehadiran Hari Ini</h3>
                </div>
                <div className="text-2xl font-bold">22</div>
                <p className="text-xs text-muted-foreground">91.7% dari total karyawan</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Karyawan Lapangan</h3>
                </div>
                <div className="text-2xl font-bold">10</div>
                <p className="text-xs text-muted-foreground">41.7% dari total karyawan</p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">Karyawan Kantor</h3>
                </div>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">58.3% dari total karyawan</p>
              </div>
            </div>

            {/* Tabs Karyawan */}
            <Tabs defaultValue="daftar" className="space-y-4">
              <TabsList>
                <TabsTrigger value="daftar">Daftar Karyawan</TabsTrigger>
                <TabsTrigger value="kehadiran">Kehadiran</TabsTrigger>
                <TabsTrigger value="kinerja">Kinerja</TabsTrigger>
                <TabsTrigger value="gaji">Gaji</TabsTrigger>
              </TabsList>
              <TabsContent value="daftar" className="space-y-4">
                <KaryawanList />
              </TabsContent>
              <TabsContent value="kehadiran" className="space-y-4">
                <KaryawanKehadiran />
              </TabsContent>
              <TabsContent value="kinerja" className="space-y-4">
                <KaryawanKinerja />
              </TabsContent>
              <TabsContent value="gaji" className="space-y-4">
                <KaryawanGaji />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Modal Tambah Karyawan */}
      <TambahKaryawanModal isOpen={showTambahModal} onClose={() => setShowTambahModal(false)} />
    </div>
  )
}
