// Ubah pendekatan - buat komponen langsung di halaman
"use client"

import { useState } from "react"
import { Sidebar } from "../components/sidebar"
import { DashboardHeader } from "../components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useResponsive } from "@/hooks/use-responsive"

export default function Home() {
  const [showAmount, setShowAmount] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("April")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [activeTab, setActiveTab] = useState("overview")
  const { isMobile, isTablet } = useResponsive()

  const toggleAmount = () => {
    setShowAmount(!showAmount)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month)
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(year)
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader
          onSearch={handleSearch}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />

        <main className="flex-1 p-6 pt-4">
          <div className="mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Selamat datang di Afindo Dashboard</p>
              {searchTerm && <p className="text-sm text-muted-foreground mt-2">Hasil pencarian untuk: {searchTerm}</p>}
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={(v) => setActiveTab(v)}>
            <TabsList className={isMobile ? "flex flex-wrap" : ""}>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pelanggan-lunas">Pelanggan Lunas</TabsTrigger>
              <TabsTrigger value="pelanggan-belum-lunas">Pelanggan Belum Lunas</TabsTrigger>
              <TabsTrigger value="admin-lunas">Admin Lunas</TabsTrigger>
              <TabsTrigger value="admin-belum-lunas">Admin Belum Lunas</TabsTrigger>
              <TabsTrigger value="pengaduan">Pengaduan</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                  title="Pelanggan Lunas"
                  amount="Rp 15.750.000"
                  count="105"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  onClick={() => setActiveTab("pelanggan-lunas")}
                />
                <DashboardCard
                  title="Pelanggan Belum Lunas"
                  amount="Rp 4.250.000"
                  count="28"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  onClick={() => setActiveTab("pelanggan-belum-lunas")}
                />
                <DashboardCard
                  title="Admin Lunas"
                  amount="Rp 3.150.000"
                  count="21"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  onClick={() => setActiveTab("admin-lunas")}
                />
                <DashboardCard
                  title="Admin Belum Lunas"
                  amount="Rp 850.000"
                  count="6"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  onClick={() => setActiveTab("admin-belum-lunas")}
                />
                <DashboardCard
                  title="Pengaduan"
                  amount=""
                  count="12"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  onClick={() => setActiveTab("pengaduan")}
                  hideAmount={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="pelanggan-lunas">
              <SimpleTable
                title={`Pelanggan Lunas - ${selectedMonth} ${selectedYear}`}
                headers={["Nama", "Paket", "Jumlah", "Tanggal Bayar", "Aksi"]}
                data={[
                  ["Ahmad Fauzi", "Home 20 Mbps", "Rp 250.000", "05/04/2025", ""],
                  ["Budi Santoso", "Home 50 Mbps", "Rp 350.000", "03/04/2025", ""],
                  ["Citra Dewi", "Business 100 Mbps", "Rp 750.000", "02/04/2025", ""],
                ]}
              />
            </TabsContent>

            <TabsContent value="pelanggan-belum-lunas">
              <SimpleTable
                title={`Pelanggan Belum Lunas - ${selectedMonth} ${selectedYear}`}
                headers={["Nama", "Paket", "Jumlah", "Jatuh Tempo", "Aksi"]}
                data={[
                  ["Faisal Rahman", "Home 20 Mbps", "Rp 250.000", "15/04/2025", ""],
                  ["Gita Nirmala", "Home 50 Mbps", "Rp 350.000", "20/04/2025", ""],
                  ["Hadi Wijaya", "Business 100 Mbps", "Rp 750.000", "25/04/2025", ""],
                ]}
              />
            </TabsContent>

            <TabsContent value="admin-lunas">
              <SimpleTable
                title={`Admin Lunas - ${selectedMonth} ${selectedYear}`}
                headers={["Mitra", "Jumlah", "Tanggal Bayar", "Aksi"]}
                data={[
                  ["Mitra Sejahtera", "Rp 150.000", "05/04/2025", ""],
                  ["Cahaya Net", "Rp 200.000", "04/04/2025", ""],
                  ["Cepat Internet", "Rp 175.000", "03/04/2025", ""],
                ]}
              />
            </TabsContent>

            <TabsContent value="admin-belum-lunas">
              <SimpleTable
                title={`Admin Belum Lunas - ${selectedMonth} ${selectedYear}`}
                headers={["Mitra", "Jumlah", "Jatuh Tempo", "Aksi"]}
                data={[
                  ["Mitra Bersama", "Rp 150.000", "15/04/2025", ""],
                  ["Lancar Jaya", "Rp 200.000", "20/04/2025", ""],
                ]}
              />
            </TabsContent>

            <TabsContent value="pengaduan">
              <SimpleTable
                title={`Pengaduan - ${selectedMonth} ${selectedYear}`}
                headers={["Pelanggan", "Masalah", "Status", "Tanggal", "Aksi"]}
                data={[
                  ["Ahmad Fauzi", "Koneksi lambat", "Open", "05/04/2025", ""],
                  ["Budi Santoso", "Tidak bisa browsing", "In Progress", "04/04/2025", ""],
                  ["Citra Dewi", "Koneksi terputus", "Closed", "03/04/2025", ""],
                ]}
              />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Komponen DashboardCard inline
function DashboardCard({ title, amount, count, showAmount, onToggle, onClick, hideAmount = false }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">{title}</p>
            {!hideAmount && <h3 className="text-2xl font-bold mt-2">{showAmount ? amount : "Rp *****"}</h3>}
            <p className="text-sm text-muted-foreground mt-1">
              {showAmount ? count : "****"} {hideAmount ? "Pengaduan" : "Pelanggan"}
            </p>
          </div>
          {!hideAmount && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
              aria-label={showAmount ? "Sembunyikan jumlah" : "Tampilkan jumlah"}
            >
              {showAmount ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" className="w-full justify-start p-0 h-auto text-sm font-medium" onClick={onClick}>
          Detail
        </Button>
      </CardFooter>
    </Card>
  )
}

// Komponen SimpleTable inline
function SimpleTable({ title, headers, data }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>
                    {cellIndex === row.length - 1 && cell === "" ? (
                      <Button variant="ghost" size="sm">
                        Detail
                      </Button>
                    ) : (
                      cell
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
