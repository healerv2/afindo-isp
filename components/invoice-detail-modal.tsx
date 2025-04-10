"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Copy, Download, Send, X } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"

interface InvoiceDetailModalProps {
  isOpen: boolean
  onClose: () => void
  invoice: any
}

export function InvoiceDetailModal({ isOpen, onClose, invoice }: InvoiceDetailModalProps) {
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [paymentLink, setPaymentLink] = useState("https://pay.afindo.com/INV001")

  if (!isOpen) return null

  const handleSendNotification = (type: "email" | "whatsapp", mode: "now" | "scheduled") => {
    console.log(`Mengirim notifikasi ${type} untuk invoice ${invoice.id} (${mode})`)
    // Implementasi pengiriman notifikasi
    alert(
      `Notifikasi ${type} untuk invoice ${invoice.id} telah dijadwalkan untuk dikirim pada ${scheduledDate ? format(scheduledDate, "dd MMMM yyyy", { locale: id }) : "hari ini"}`,
    )
  }

  const handleCopyPaymentLink = () => {
    navigator.clipboard.writeText(paymentLink)
    alert("Link pembayaran telah disalin ke clipboard")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-4xl rounded-lg bg-background p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Detail Invoice</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-medium">Invoice #{invoice.id}</h3>
              <p className="text-sm text-muted-foreground">Tanggal: {invoice.tanggal}</p>
              <p className="text-sm text-muted-foreground">Jatuh Tempo: {invoice.jatuhTempo}</p>
              <p className="mt-2">
                Status:{" "}
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    invoice.status === "Dibayar" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {invoice.status}
                </span>
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Pelanggan</h3>
              <p className="font-medium">{invoice.pelanggan}</p>
              <p className="text-sm">customer@example.com</p>
              <p className="text-sm">+62 812-3456-7890</p>
            </div>
          </div>

          <div className="mb-6 rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Deskripsi</th>
                  <th className="px-4 py-2 text-right font-medium">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">{invoice.deskripsi}</td>
                  <td className="px-4 py-2 text-right">{invoice.jumlah}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Pajak (11%)</td>
                  <td className="px-4 py-2 text-right">Rp 275,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Total</td>
                  <td className="px-4 py-2 text-right font-medium">Rp 2,775,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Tabs defaultValue="send" className="space-y-4">
            <TabsList>
              <TabsTrigger value="send">Kirim Invoice</TabsTrigger>
              <TabsTrigger value="payment">Link Pembayaran</TabsTrigger>
            </TabsList>

            <TabsContent value="send" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border p-4">
                  <h3 className="mb-4 text-sm font-medium">Kirim via Email</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm">Email Tujuan:</p>
                      <p className="font-medium">customer@example.com</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button className="w-full justify-start" onClick={() => handleSendNotification("email", "now")}>
                        <Send className="mr-2 h-4 w-4" /> Kirim Sekarang
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {scheduledDate ? format(scheduledDate, "PPP", { locale: id }) : "Jadwalkan Pengiriman"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
                          <div className="border-t p-3">
                            <Button
                              className="w-full"
                              disabled={!scheduledDate}
                              onClick={() => handleSendNotification("email", "scheduled")}
                            >
                              Konfirmasi Jadwal
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="mb-4 text-sm font-medium">Kirim via WhatsApp</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm">Nomor WhatsApp:</p>
                      <p className="font-medium">+62 812-3456-7890</p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        className="w-full justify-start"
                        onClick={() => handleSendNotification("whatsapp", "now")}
                      >
                        <Send className="mr-2 h-4 w-4" /> Kirim Sekarang
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {scheduledDate ? format(scheduledDate, "PPP", { locale: id }) : "Jadwalkan Pengiriman"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={scheduledDate} onSelect={setScheduledDate} initialFocus />
                          <div className="border-t p-3">
                            <Button
                              className="w-full"
                              disabled={!scheduledDate}
                              onClick={() => handleSendNotification("whatsapp", "scheduled")}
                            >
                              Konfirmasi Jadwal
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="mb-4 text-sm font-medium">Link Pembayaran</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={paymentLink}
                      readOnly
                      className="flex-1 rounded-md border px-3 py-2 text-sm"
                    />
                    <Button variant="outline" size="icon" onClick={handleCopyPaymentLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Link pembayaran ini dapat dibagikan kepada pelanggan untuk melakukan pembayaran online.
                    </p>
                    <p className="text-sm text-muted-foreground">Link akan aktif hingga tanggal jatuh tempo invoice.</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Send className="mr-2 h-4 w-4" /> Kirim Link via Email
                    </Button>
                    <Button className="flex-1">
                      <Send className="mr-2 h-4 w-4" /> Kirim Link via WhatsApp
                    </Button>
                  </div>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="mb-4 text-sm font-medium">Metode Pembayaran</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-3">
                      <h4 className="text-sm font-medium">Transfer Bank</h4>
                      <p className="text-sm">BCA: 1234567890</p>
                      <p className="text-sm">a.n. PT Afindo Sukses Mandiri</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <h4 className="text-sm font-medium">QRIS</h4>
                      <p className="text-sm">Scan QR Code untuk pembayaran</p>
                      <div className="mt-2 flex justify-center">
                        <div className="h-24 w-24 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                          QR Code
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Unduh Invoice
          </Button>
        </div>
      </div>
    </div>
  )
}
