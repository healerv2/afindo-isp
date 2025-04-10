"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Eye, Download, Send, Link, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// Tambahkan import untuk InvoiceDetailModal
import { InvoiceDetailModal } from "@/components/invoice-detail-modal"

export function KeuanganInvoice() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("semua")
  const [scheduledDate, setScheduledDate] = useState<Date>()

  // Tambahkan state untuk modal detail invoice
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)

  // Data dummy untuk invoice
  const invoiceData = [
    {
      id: "INV001",
      tanggal: "25 Jan 2023",
      pelanggan: "PT Maju Jaya",
      deskripsi: "Layanan Internet Bulan Februari 2023",
      jumlah: "Rp 2,500,000",
      jatuhTempo: "10 Feb 2023",
      status: "Belum Dibayar",
    },
    {
      id: "INV002",
      tanggal: "25 Jan 2023",
      pelanggan: "CV Sentosa",
      deskripsi: "Layanan Internet Bulan Februari 2023",
      jumlah: "Rp 1,800,000",
      jatuhTempo: "10 Feb 2023",
      status: "Belum Dibayar",
    },
    {
      id: "INV003",
      tanggal: "25 Jan 2023",
      pelanggan: "Toko Bahagia",
      deskripsi: "Layanan Internet Bulan Februari 2023",
      jumlah: "Rp 750,000",
      jatuhTempo: "10 Feb 2023",
      status: "Belum Dibayar",
    },
    {
      id: "INV004",
      tanggal: "15 Jan 2023",
      pelanggan: "PT Maju Jaya",
      deskripsi: "Layanan Internet Bulan Januari 2023",
      jumlah: "Rp 2,500,000",
      jatuhTempo: "31 Jan 2023",
      status: "Dibayar",
    },
    {
      id: "INV005",
      tanggal: "15 Jan 2023",
      pelanggan: "CV Sentosa",
      deskripsi: "Layanan Internet Bulan Januari 2023",
      jumlah: "Rp 1,800,000",
      jatuhTempo: "31 Jan 2023",
      status: "Dibayar",
    },
    {
      id: "INV006",
      tanggal: "15 Jan 2023",
      pelanggan: "Toko Bahagia",
      deskripsi: "Layanan Internet Bulan Januari 2023",
      jumlah: "Rp 750,000",
      jatuhTempo: "31 Jan 2023",
      status: "Dibayar",
    },
  ]

  // Filter data berdasarkan pencarian dan status
  const filteredData = invoiceData.filter((item) => {
    const matchSearch =
      item.pelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = filterStatus === "semua" || item.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleSendNotification = (invoiceId: string, type: "manual" | "scheduled") => {
    console.log(`Mengirim notifikasi untuk invoice ${invoiceId} (${type})`)
    // Implementasi pengiriman notifikasi
  }

  const handleCreatePaymentLink = (invoiceId: string) => {
    console.log(`Membuat link pembayaran untuk invoice ${invoiceId}`)
    // Implementasi pembuatan link pembayaran
    alert(`Link pembayaran untuk invoice ${invoiceId} telah dibuat: https://pay.afindo.com/${invoiceId}`)
  }

  // Tambahkan fungsi untuk menampilkan detail invoice
  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setShowDetailModal(true)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Invoice</CardTitle>
          <CardDescription>Ringkasan status invoice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Invoice</p>
              <p className="text-2xl font-bold">30</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Belum Dibayar</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Dibayar</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari invoice..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua Status</SelectItem>
              <SelectItem value="Belum Dibayar">Belum Dibayar</SelectItem>
              <SelectItem value="Dibayar">Dibayar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="gap-1">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Jatuh Tempo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notifikasi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.pelanggan}</TableCell>
                <TableCell>{item.deskripsi}</TableCell>
                <TableCell>{item.jumlah}</TableCell>
                <TableCell>{item.jatuhTempo}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      item.status === "Dibayar" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendNotification(item.id, "manual")}
                      title="Kirim notifikasi sekarang"
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Kirim
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" title="Jadwalkan pengiriman notifikasi">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          Jadwal
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={scheduledDate}
                          onSelect={(date) => {
                            setScheduledDate(date)
                            if (date) {
                              handleSendNotification(item.id, "scheduled")
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    {/* Modifikasi tombol Eye untuk membuka modal detail invoice */}
                    <Button variant="ghost" size="icon" title="Lihat invoice" onClick={() => handleViewInvoice(item)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Unduh invoice">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Buat link pembayaran"
                      onClick={() => handleCreatePaymentLink(item.id)}
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Tambahkan modal detail invoice di akhir komponen, sebelum tag penutup terakhir */}
      {selectedInvoice && (
        <InvoiceDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  )
}
