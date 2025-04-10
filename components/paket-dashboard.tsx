"use client"

import { useState } from "react"
import { Bell, ChevronDown, Menu, Search, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export function PaketDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentMonth, setCurrentMonth] = useState("Januari")
  const [currentYear, setCurrentYear] = useState("2023")
  const [searchTerm, setSearchTerm] = useState("")

  // Data dummy untuk paket
  const [paketData, setPaketData] = useState([
    {
      id: "PKT001",
      nama: "Basic",
      harga: "Rp 150.000",
      kecepatan: "10 Mbps",
      deskripsi: "Paket internet dasar untuk kebutuhan browsing dan sosial media",
      status: "Aktif",
    },
    {
      id: "PKT002",
      nama: "Standard",
      harga: "Rp 250.000",
      kecepatan: "20 Mbps",
      deskripsi: "Paket internet standar untuk kebutuhan streaming dan gaming ringan",
      status: "Aktif",
    },
    {
      id: "PKT003",
      nama: "Premium",
      harga: "Rp 350.000",
      kecepatan: "50 Mbps",
      deskripsi: "Paket internet premium untuk kebutuhan streaming HD dan gaming",
      status: "Aktif",
    },
    {
      id: "PKT004",
      nama: "Business",
      harga: "Rp 750.000",
      kecepatan: "100 Mbps",
      deskripsi: "Paket internet bisnis untuk kebutuhan kantor dan usaha kecil",
      status: "Aktif",
    },
    {
      id: "PKT005",
      nama: "Enterprise",
      harga: "Rp 1.500.000",
      kecepatan: "200 Mbps",
      deskripsi: "Paket internet enterprise untuk kebutuhan bisnis skala besar",
      status: "Tidak Aktif",
    },
  ])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Filter data berdasarkan pencarian
  const filteredData = paketData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/update">Update Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/password">Update Password</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/info-print">Info Print</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/info-wa">Teks Info WA</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/support-by">Teks Support By</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/ppn">PPN</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/slider">Slider Gambar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/paket">Paket</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/area">Area</Link>
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
                <h1 className="text-2xl font-bold tracking-tight">Paket</h1>
                <p className="text-muted-foreground">Kelola paket internet yang tersedia</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari paket..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Daftar Paket</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nama Paket</TableHead>
                      <TableHead>Harga</TableHead>
                      <TableHead>Kecepatan</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell>{item.nama}</TableCell>
                        <TableCell>{item.harga}</TableCell>
                        <TableCell>{item.kecepatan}</TableCell>
                        <TableCell className="max-w-xs truncate">{item.deskripsi}</TableCell>
                        <TableCell>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              item.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500">
                              Hapus
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
