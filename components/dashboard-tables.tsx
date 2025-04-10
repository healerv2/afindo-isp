"use client"

import type React from "react"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DownloadIcon,
  EyeIcon,
  SearchIcon,
  RefreshCw,
  ChevronDown,
  Filter,
  Printer,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Receipt,
  AlertTriangle,
  MessageSquare,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Dummy data for paid customers - menambahkan lebih banyak data untuk pagination
const paidCustomersData = [
  { id: 1, name: "Ahmad Fauzi", package: "Home 20 Mbps", amount: "Rp 250.000", date: "05/04/2025" },
  { id: 2, name: "Budi Santoso", package: "Home 50 Mbps", amount: "Rp 350.000", date: "03/04/2025" },
  { id: 3, name: "Citra Dewi", package: "Business 100 Mbps", amount: "Rp 750.000", date: "02/04/2025" },
  { id: 4, name: "Dian Purnama", package: "Home 20 Mbps", amount: "Rp 250.000", date: "01/04/2025" },
  { id: 5, name: "Eko Prasetyo", package: "Home 10 Mbps", amount: "Rp 150.000", date: "01/04/2025" },
  { id: 6, name: "Fajar Nugraha", package: "Home 20 Mbps", amount: "Rp 250.000", date: "05/04/2025" },
  { id: 7, name: "Gita Lestari", package: "Home 50 Mbps", amount: "Rp 350.000", date: "04/04/2025" },
  { id: 8, name: "Hendra Wijaya", package: "Business 100 Mbps", amount: "Rp 750.000", date: "03/04/2025" },
  { id: 9, name: "Indah Permata", package: "Home 20 Mbps", amount: "Rp 250.000", date: "02/04/2025" },
  { id: 10, name: "Joko Susilo", package: "Home 10 Mbps", amount: "Rp 150.000", date: "01/04/2025" },
  { id: 11, name: "Kartika Sari", package: "Home 20 Mbps", amount: "Rp 250.000", date: "05/04/2025" },
  { id: 12, name: "Lukman Hakim", package: "Home 50 Mbps", amount: "Rp 350.000", date: "04/04/2025" },
  { id: 13, name: "Maya Anggraini", package: "Business 100 Mbps", amount: "Rp 750.000", date: "03/04/2025" },
  { id: 14, name: "Nanda Pratama", package: "Home 20 Mbps", amount: "Rp 250.000", date: "02/04/2025" },
  { id: 15, name: "Oki Gunawan", package: "Home 10 Mbps", amount: "Rp 150.000", date: "01/04/2025" },
]

// Dummy data for unpaid customers - menambahkan lebih banyak data
const unpaidCustomersData = [
  { id: 1, name: "Faisal Rahman", package: "Home 20 Mbps", amount: "Rp 250.000", dueDate: "15/04/2025" },
  { id: 2, name: "Gita Nirmala", package: "Home 50 Mbps", amount: "Rp 350.000", dueDate: "20/04/2025" },
  { id: 3, name: "Hadi Wijaya", package: "Business 100 Mbps", amount: "Rp 750.000", dueDate: "25/04/2025" },
  { id: 4, name: "Indah Permata", package: "Home 20 Mbps", amount: "Rp 250.000", dueDate: "30/04/2025" },
  { id: 5, name: "Joko Susilo", package: "Home 10 Mbps", amount: "Rp 150.000", dueDate: "15/04/2025" },
  { id: 6, name: "Kartika Dewi", package: "Home 20 Mbps", amount: "Rp 250.000", dueDate: "20/04/2025" },
  { id: 7, name: "Lukman Hakim", package: "Home 50 Mbps", amount: "Rp 350.000", dueDate: "25/04/2025" },
  { id: 8, name: "Maya Anggraini", package: "Business 100 Mbps", amount: "Rp 750.000", dueDate: "30/04/2025" },
  { id: 9, name: "Nanda Pratama", package: "Home 20 Mbps", amount: "Rp 250.000", dueDate: "15/04/2025" },
  { id: 10, name: "Oki Gunawan", package: "Home 10 Mbps", amount: "Rp 150.000", dueDate: "20/04/2025" },
]

// Dummy data for paid admin fees - menambahkan lebih banyak data
const paidAdminFeesData = [
  { id: 1, partner: "Mitra Sejahtera", amount: "Rp 150.000", date: "05/04/2025" },
  { id: 2, partner: "Cahaya Net", amount: "Rp 200.000", date: "04/04/2025" },
  { id: 3, partner: "Cepat Internet", amount: "Rp 175.000", date: "03/04/2025" },
  { id: 4, partner: "Desa Online", amount: "Rp 125.000", date: "02/04/2025" },
  { id: 5, partner: "Eka Koneksi", amount: "Rp 100.000", date: "01/04/2025" },
  { id: 6, partner: "Fiber Cepat", amount: "Rp 150.000", date: "05/04/2025" },
  { id: 7, partner: "Gema Internet", amount: "Rp 200.000", date: "04/04/2025" },
  { id: 8, partner: "Hasta Koneksi", amount: "Rp 175.000", date: "03/04/2025" },
]

// Dummy data for unpaid admin fees - menambahkan lebih banyak data
const unpaidAdminFeesData = [
  { id: 1, partner: "Mitra Bersama", amount: "Rp 150.000", dueDate: "15/04/2025" },
  { id: 2, partner: "Lancar Jaya", amount: "Rp 200.000", dueDate: "20/04/2025" },
  { id: 3, partner: "Nusa Digital", amount: "Rp 175.000", dueDate: "25/04/2025" },
  { id: 4, partner: "Optima Net", amount: "Rp 125.000", dueDate: "30/04/2025" },
  { id: 5, partner: "Prima Koneksi", amount: "Rp 100.000", dueDate: "15/04/2025" },
  { id: 6, partner: "Quantum Internet", amount: "Rp 150.000", dueDate: "20/04/2025" },
]

// Dummy data for complaints - menambahkan lebih banyak data
const complaintsData = [
  { id: 1, customer: "Ahmad Fauzi", issue: "Koneksi lambat", status: "Open", date: "05/04/2025" },
  { id: 2, customer: "Budi Santoso", issue: "Tidak bisa browsing", status: "In Progress", date: "04/04/2025" },
  { id: 3, customer: "Citra Dewi", issue: "Koneksi terputus", status: "Closed", date: "03/04/2025" },
  { id: 4, customer: "Dian Purnama", issue: "Billing error", status: "Open", date: "02/04/2025" },
  { id: 5, customer: "Eko Prasetyo", issue: "Router bermasalah", status: "In Progress", date: "01/04/2025" },
  { id: 6, customer: "Fajar Nugraha", issue: "Koneksi lambat", status: "Open", date: "05/04/2025" },
  { id: 7, customer: "Gita Lestari", issue: "Tidak bisa browsing", status: "In Progress", date: "04/04/2025" },
  { id: 8, customer: "Hendra Wijaya", issue: "Koneksi terputus", status: "Closed", date: "03/04/2025" },
  { id: 9, customer: "Indah Permata", issue: "Billing error", status: "Open", date: "02/04/2025" },
  { id: 10, customer: "Joko Susilo", issue: "Router bermasalah", status: "In Progress", date: "01/04/2025" },
  { id: 11, customer: "Kartika Sari", issue: "Koneksi lambat", status: "Open", date: "05/04/2025" },
  { id: 12, customer: "Lukman Hakim", issue: "Tidak bisa browsing", status: "In Progress", date: "04/04/2025" },
]

interface TableProps {
  month: string
  year: string
  searchTerm: string
}

// Konstanta untuk pagination
const ITEMS_PER_PAGE = 5

// Komponen untuk status badge
function StatusBadge({ status }: { status: string }) {
  let variant: "default" | "secondary" | "destructive" | "outline" = "outline"

  if (status === "Open") {
    variant = "destructive"
  } else if (status === "In Progress") {
    variant = "default"
  } else if (status === "Closed") {
    variant = "secondary"
  }

  return <Badge variant={variant}>{status}</Badge>
}

// Komponen untuk table actions
function TableActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <EyeIcon className="mr-2 h-4 w-4" />
          <span>View Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Printer className="mr-2 h-4 w-4" />
          <span>Print</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function PaidCustomersTable({ month, year, searchTerm }: TableProps) {
  const [localSearch, setLocalSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const [showAll, setShowAll] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    setVisibleItems(ITEMS_PER_PAGE)
    setShowAll(false)
  }

  const filteredData = paidCustomersData.filter((customer) => {
    const search = (searchTerm || localSearch).toLowerCase()
    return customer.name.toLowerCase().includes(search) || customer.package.toLowerCase().includes(search)
  })

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredData.length))
  }

  const handleLoadAll = () => {
    setVisibleItems(filteredData.length)
    setShowAll(true)
  }

  // Menentukan data yang akan ditampilkan berdasarkan pagination
  const displayedData = filteredData.slice(0, visibleItems)

  // Menentukan apakah tombol Load More harus ditampilkan
  const showLoadMore = !showAll && visibleItems < filteredData.length

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
            Pelanggan Lunas - {month} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pelanggan..."
                className="pl-8 w-[250px]"
                value={localSearch}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Semua Paket</DropdownMenuItem>
                <DropdownMenuItem>Home 10 Mbps</DropdownMenuItem>
                <DropdownMenuItem>Home 20 Mbps</DropdownMenuItem>
                <DropdownMenuItem>Home 50 Mbps</DropdownMenuItem>
                <DropdownMenuItem>Business 100 Mbps</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Export</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Export PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Excel</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Nama</TableHead>
                <TableHead className="font-medium">Paket</TableHead>
                <TableHead className="font-medium">Jumlah</TableHead>
                <TableHead className="font-medium">Tanggal Bayar</TableHead>
                <TableHead className="text-right font-medium">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.length > 0 ? (
                displayedData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.package}</TableCell>
                    <TableCell>{customer.amount}</TableCell>
                    <TableCell>{customer.date}</TableCell>
                    <TableCell className="text-right">
                      <TableActions />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {displayedData.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan {displayedData.length} dari {filteredData.length} data
            </div>
            <div className="flex gap-2">
              {showLoadMore && (
                <Button variant="outline" onClick={handleLoadMore} size="sm">
                  Load More
                </Button>
              )}
              {!showAll && filteredData.length > ITEMS_PER_PAGE && (
                <Button variant="default" onClick={handleLoadAll} size="sm">
                  Load All
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function UnpaidCustomersTable({ month, year, searchTerm }: TableProps) {
  const [localSearch, setLocalSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const [showAll, setShowAll] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    setVisibleItems(ITEMS_PER_PAGE)
    setShowAll(false)
  }

  const filteredData = unpaidCustomersData.filter((customer) => {
    const search = (searchTerm || localSearch).toLowerCase()
    return customer.name.toLowerCase().includes(search) || customer.package.toLowerCase().includes(search)
  })

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredData.length))
  }

  const handleLoadAll = () => {
    setVisibleItems(filteredData.length)
    setShowAll(true)
  }

  // Menentukan data yang akan ditampilkan berdasarkan pagination
  const displayedData = filteredData.slice(0, visibleItems)

  // Menentukan apakah tombol Load More harus ditampilkan
  const showLoadMore = !showAll && visibleItems < filteredData.length

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-orange-500" />
            Pelanggan Belum Lunas - {month} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pelanggan..."
                className="pl-8 w-[250px]"
                value={localSearch}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Semua Paket</DropdownMenuItem>
                <DropdownMenuItem>Home 10 Mbps</DropdownMenuItem>
                <DropdownMenuItem>Home 20 Mbps</DropdownMenuItem>
                <DropdownMenuItem>Home 50 Mbps</DropdownMenuItem>
                <DropdownMenuItem>Business 100 Mbps</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Export</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Export PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Excel</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Nama</TableHead>
                <TableHead className="font-medium">Paket</TableHead>
                <TableHead className="font-medium">Jumlah</TableHead>
                <TableHead className="font-medium">Jatuh Tempo</TableHead>
                <TableHead className="text-right font-medium">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.length > 0 ? (
                displayedData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.package}</TableCell>
                    <TableCell>{customer.amount}</TableCell>
                    <TableCell>{customer.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <TableActions />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {displayedData.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan {displayedData.length} dari {filteredData.length} data
            </div>
            <div className="flex gap-2">
              {showLoadMore && (
                <Button variant="outline" onClick={handleLoadMore} size="sm">
                  Load More
                </Button>
              )}
              {!showAll && filteredData.length > ITEMS_PER_PAGE && (
                <Button variant="default" onClick={handleLoadAll} size="sm">
                  Load All
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function PaidAdminFeesTable({ month, year, searchTerm }: TableProps) {
  const [localSearch, setLocalSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const [showAll, setShowAll] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    setVisibleItems(ITEMS_PER_PAGE)
    setShowAll(false)
  }

  const filteredData = paidAdminFeesData.filter((fee) => {
    const search = (searchTerm || localSearch).toLowerCase()
    return fee.partner.toLowerCase().includes(search)
  })

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredData.length))
  }

  const handleLoadAll = () => {
    setVisibleItems(filteredData.length)
    setShowAll(true)
  }

  // Menentukan data yang akan ditampilkan berdasarkan pagination
  const displayedData = filteredData.slice(0, visibleItems)

  // Menentukan apakah tombol Load More harus ditampilkan
  const showLoadMore = !showAll && visibleItems < filteredData.length

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <Receipt className="h-5 w-5 mr-2 text-green-500" />
            Admin Lunas - {month} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari mitra..."
                className="pl-8 w-[250px]"
                value={localSearch}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Export</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Export PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Excel</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Mitra</TableHead>
                <TableHead className="font-medium">Jumlah</TableHead>
                <TableHead className="font-medium">Tanggal Bayar</TableHead>
                <TableHead className="text-right font-medium">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.length > 0 ? (
                displayedData.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.partner}</TableCell>
                    <TableCell>{fee.amount}</TableCell>
                    <TableCell>{fee.date}</TableCell>
                    <TableCell className="text-right">
                      <TableActions />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {displayedData.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan {displayedData.length} dari {filteredData.length} data
            </div>
            <div className="flex gap-2">
              {showLoadMore && (
                <Button variant="outline" onClick={handleLoadMore} size="sm">
                  Load More
                </Button>
              )}
              {!showAll && filteredData.length > ITEMS_PER_PAGE && (
                <Button variant="default" onClick={handleLoadAll} size="sm">
                  Load All
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function UnpaidAdminFeesTable({ month, year, searchTerm }: TableProps) {
  const [localSearch, setLocalSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const [showAll, setShowAll] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    setVisibleItems(ITEMS_PER_PAGE)
    setShowAll(false)
  }

  const filteredData = unpaidAdminFeesData.filter((fee) => {
    const search = (searchTerm || localSearch).toLowerCase()
    return fee.partner.toLowerCase().includes(search)
  })

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredData.length))
  }

  const handleLoadAll = () => {
    setVisibleItems(filteredData.length)
    setShowAll(true)
  }

  // Menentukan data yang akan ditampilkan berdasarkan pagination
  const displayedData = filteredData.slice(0, visibleItems)

  // Menentukan apakah tombol Load More harus ditampilkan
  const showLoadMore = !showAll && visibleItems < filteredData.length

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
            Admin Belum Lunas - {month} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari mitra..."
                className="pl-8 w-[250px]"
                value={localSearch}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Export</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Export PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Excel</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Mitra</TableHead>
                <TableHead className="font-medium">Jumlah</TableHead>
                <TableHead className="font-medium">Jatuh Tempo</TableHead>
                <TableHead className="text-right font-medium">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.length > 0 ? (
                displayedData.map((fee) => (
                  <TableRow key={fee.id}>
                    <TableCell className="font-medium">{fee.partner}</TableCell>
                    <TableCell>{fee.amount}</TableCell>
                    <TableCell>{fee.dueDate}</TableCell>
                    <TableCell className="text-right">
                      <TableActions />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {displayedData.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan {displayedData.length} dari {filteredData.length} data
            </div>
            <div className="flex gap-2">
              {showLoadMore && (
                <Button variant="outline" onClick={handleLoadMore} size="sm">
                  Load More
                </Button>
              )}
              {!showAll && filteredData.length > ITEMS_PER_PAGE && (
                <Button variant="default" onClick={handleLoadAll} size="sm">
                  Load All
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function ComplaintsTable({ month, year, searchTerm }: TableProps) {
  const [localSearch, setLocalSearch] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE)
  const [showAll, setShowAll] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value)
    setVisibleItems(ITEMS_PER_PAGE)
    setShowAll(false)
  }

  const filteredData = complaintsData.filter((complaint) => {
    const search = (searchTerm || localSearch).toLowerCase()
    return (
      complaint.customer.toLowerCase().includes(search) ||
      complaint.issue.toLowerCase().includes(search) ||
      complaint.status.toLowerCase().includes(search)
    )
  })

  const handleLoadMore = () => {
    setVisibleItems((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredData.length))
  }

  const handleLoadAll = () => {
    setVisibleItems(filteredData.length)
    setShowAll(true)
  }

  // Menentukan data yang akan ditampilkan berdasarkan pagination
  const displayedData = filteredData.slice(0, visibleItems)

  // Menentukan apakah tombol Load More harus ditampilkan
  const showLoadMore = !showAll && visibleItems < filteredData.length

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
            Pengaduan - {month} {year}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pengaduan..."
                className="pl-8 w-[250px]"
                value={localSearch}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Semua Status</DropdownMenuItem>
                <DropdownMenuItem>Open</DropdownMenuItem>
                <DropdownMenuItem>In Progress</DropdownMenuItem>
                <DropdownMenuItem>Closed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-8 flex items-center gap-1">
                  <DownloadIcon className="h-3.5 w-3.5" />
                  <span>Export</span>
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem>Export PDF</DropdownMenuItem>
                <DropdownMenuItem>Export Excel</DropdownMenuItem>
                <DropdownMenuItem>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Pelanggan</TableHead>
                <TableHead className="font-medium">Masalah</TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="font-medium">Tanggal</TableHead>
                <TableHead className="text-right font-medium">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedData.length > 0 ? (
                displayedData.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.customer}</TableCell>
                    <TableCell>{complaint.issue}</TableCell>
                    <TableCell>
                      <StatusBadge status={complaint.status} />
                    </TableCell>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell className="text-right">
                      <TableActions />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Tidak ada data yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        {displayedData.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Menampilkan {displayedData.length} dari {filteredData.length} data
            </div>
            <div className="flex gap-2">
              {showLoadMore && (
                <Button variant="outline" onClick={handleLoadMore} size="sm">
                  Load More
                </Button>
              )}
              {!showAll && filteredData.length > ITEMS_PER_PAGE && (
                <Button variant="default" onClick={handleLoadAll} size="sm">
                  Load All
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
