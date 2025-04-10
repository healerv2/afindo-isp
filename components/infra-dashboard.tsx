"use client"

import { useState } from "react"
import { Bell, ChevronDown, Menu, Search, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfraMikrotik } from "@/components/infra-mikrotik"
import { InfraOlt } from "@/components/infra-olt"
import { InfraOdc } from "@/components/infra-odc"
import { InfraOdp } from "@/components/infra-odp"
import { InfraMap } from "@/components/infra-map"
import { PelangganMap } from "@/components/pelanggan-map"

export function InfraDashboard() {
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
                <h1 className="text-2xl font-bold tracking-tight">Infrastruktur</h1>
                <p className="text-muted-foreground">Kelola infrastruktur jaringan Anda</p>
              </div>
            </div>

            {/* Tabs Infrastruktur */}
            <Tabs defaultValue="mikrotik" className="space-y-4">
              <TabsList className="grid grid-cols-6 w-full">
                <TabsTrigger value="mikrotik">Mikrotik</TabsTrigger>
                <TabsTrigger value="olt">OLT</TabsTrigger>
                <TabsTrigger value="odc">ODC</TabsTrigger>
                <TabsTrigger value="odp">ODP</TabsTrigger>
                <TabsTrigger value="infra-map">Map Infra</TabsTrigger>
                <TabsTrigger value="pelanggan-map">Map Pelanggan</TabsTrigger>
              </TabsList>
              <TabsContent value="mikrotik" className="space-y-4">
                <InfraMikrotik />
              </TabsContent>
              <TabsContent value="olt" className="space-y-4">
                <InfraOlt />
              </TabsContent>
              <TabsContent value="odc" className="space-y-4">
                <InfraOdc />
              </TabsContent>
              <TabsContent value="odp" className="space-y-4">
                <InfraOdp />
              </TabsContent>
              <TabsContent value="infra-map" className="space-y-4">
                <InfraMap />
              </TabsContent>
              <TabsContent value="pelanggan-map" className="space-y-4">
                <PelangganMap />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
