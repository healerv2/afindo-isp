"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { DashboardHeader } from "./dashboard-header"
import { DashboardCard } from "./dashboard-card"
import {
  PaidCustomersTable,
  UnpaidCustomersTable,
  PaidAdminFeesTable,
  UnpaidAdminFeesTable,
  ComplaintsTable,
} from "./dashboard-tables"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, CheckCircle, AlertCircle, Receipt, AlertTriangle, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

export function AfindoDashboard() {
  const [showAmount, setShowAmount] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonth, setSelectedMonth] = useState("April")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [activeTab, setActiveTab] = useState("overview")

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

  const tabItems = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4 mr-2" /> },
    { id: "pelanggan-lunas", label: "Pelanggan Lunas", icon: <CheckCircle className="h-4 w-4 mr-2" /> },
    { id: "pelanggan-belum-lunas", label: "Pelanggan Belum Lunas", icon: <AlertCircle className="h-4 w-4 mr-2" /> },
    { id: "admin-lunas", label: "Admin Lunas", icon: <Receipt className="h-4 w-4 mr-2" /> },
    { id: "admin-belum-lunas", label: "Admin Belum Lunas", icon: <AlertTriangle className="h-4 w-4 mr-2" /> },
    { id: "pengaduan", label: "Pengaduan", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  ]

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

          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <div className="bg-background sticky top-0 z-10 pb-4">
              <TabsList className="w-full h-auto p-1 bg-muted/50 rounded-lg grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
                {tabItems.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "flex items-center justify-center py-2.5 px-3 text-sm font-medium transition-all",
                      "data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-foreground",
                      "data-[state=active]:font-semibold",
                    )}
                  >
                    {tab.icon}
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4 mt-2">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <DashboardCard
                  title="Pelanggan Lunas"
                  amount="Rp 15.750.000"
                  count="105"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  detailHref="#pelanggan-lunas"
                  onClick={() => setActiveTab("pelanggan-lunas")}
                />
                <DashboardCard
                  title="Pelanggan Belum Lunas"
                  amount="Rp 4.250.000"
                  count="28"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  detailHref="#pelanggan-belum-lunas"
                  onClick={() => setActiveTab("pelanggan-belum-lunas")}
                />
                <DashboardCard
                  title="Admin Lunas"
                  amount="Rp 3.150.000"
                  count="21"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  detailHref="#admin-lunas"
                  onClick={() => setActiveTab("admin-lunas")}
                />
                <DashboardCard
                  title="Admin Belum Lunas"
                  amount="Rp 850.000"
                  count="6"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  detailHref="#admin-belum-lunas"
                  onClick={() => setActiveTab("admin-belum-lunas")}
                />
                <DashboardCard
                  title="Pengaduan"
                  amount=""
                  count="12"
                  showAmount={showAmount}
                  onToggle={toggleAmount}
                  detailHref="#pengaduan"
                  onClick={() => setActiveTab("pengaduan")}
                  hideAmount={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="pelanggan-lunas">
              <PaidCustomersTable month={selectedMonth} year={selectedYear} searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="pelanggan-belum-lunas">
              <UnpaidCustomersTable month={selectedMonth} year={selectedYear} searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="admin-lunas">
              <PaidAdminFeesTable month={selectedMonth} year={selectedYear} searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="admin-belum-lunas">
              <UnpaidAdminFeesTable month={selectedMonth} year={selectedYear} searchTerm={searchTerm} />
            </TabsContent>

            <TabsContent value="pengaduan">
              <ComplaintsTable month={selectedMonth} year={selectedYear} searchTerm={searchTerm} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
