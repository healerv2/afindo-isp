"use client"

import { useState } from "react"
import { Bell, ChevronDown, Menu, Search, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
// Periksa import Sidebar
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Periksa import MitraList
import { MitraList } from "@/components/mitra-list"
import { MitraTransaksi } from "@/components/mitra-transaksi"
import Link from "next/link"
// Tambahkan import untuk MitraWithdraw
import { MitraWithdraw } from "@/components/mitra-withdraw"

export function MitraDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentMonth, setCurrentMonth] = useState("Januari")
  const [currentYear, setCurrentYear] = useState("2023")

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
                <h1 className="text-2xl font-bold tracking-tight">Mitra</h1>
                <p className="text-muted-foreground">Kelola data mitra Anda</p>
              </div>
            </div>

            {/* Tabs Mitra */}
            <Tabs defaultValue="daftar" className="space-y-4">
              {/* Dalam TabsList, tambahkan TabsTrigger untuk "withdraw" setelah "keuangan" */}
              <TabsList>
                <TabsTrigger value="daftar">Daftar Mitra</TabsTrigger>
                <TabsTrigger value="keuangan">Keuangan</TabsTrigger>
                <TabsTrigger value="withdraw">Penarikan Saldo</TabsTrigger>
              </TabsList>
              <TabsContent value="daftar" className="space-y-4">
                <MitraList />
              </TabsContent>
              {/* Tambahkan TabsContent untuk "withdraw" setelah TabsContent "keuangan" */}
              <TabsContent value="keuangan" className="space-y-4">
                <MitraTransaksi />
              </TabsContent>
              <TabsContent value="withdraw" className="space-y-4">
                <MitraWithdraw />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
