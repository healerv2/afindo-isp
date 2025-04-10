"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertTriangle, CalendarIcon, Info } from 'lucide-react'
import { format, addMonths } from "date-fns"
import { id } from "date-fns/locale"

interface IsolirPelangganModalProps {
  isOpen: boolean
  onClose: () => void
  pelangganId: string
  pelangganNama: string
}

export function IsolirPelangganModal({
  isOpen,
  onClose,
  pelangganId,
  pelangganNama,
}: IsolirPelangganModalProps) {
  const [tanggalIsolir, setTanggalIsolir] = useState<Date | undefined>(undefined)
  const [alasanIsolir, setAlasanIsolir] = useState("tunggakan")
  const [keterangan, setKeterangan] = useState("")
  const [notifikasiWA, setNotifikasiWA] = useState(true)
  const [notifikasiEmail, setNotifikasiEmail] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!tanggalIsolir) return

    setIsLoading(true)

    // Simulasi proses isolir
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log({
      pelangganId,
      pelangganNama,
      tanggalIsolir: format(tanggalIsolir, "yyyy-MM-dd"),
      alasanIsolir,
      keterangan,
      notifikasiWA,
      notifikasiEmail,
    })

    setIsLoading(false)
    onClose()

    // Tampilkan notifikasi sukses
    alert(`Pelanggan ${pelangganNama} berhasil dijadwalkan untuk diisolir pada tanggal ${format(tanggalIsolir, "dd MMMM yyyy", { locale: id })}.`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="h-5 w-5" />
            Isolir Pelanggan
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <Label>ID Pelanggan</Label>
            <div className="rounded-md border px-3 py-2 text-sm">{pelangganId}</div>
          </div>

          <div className="space-y-1">
            <Label>Nama Pelanggan</Label>
            <div className="rounded-md border px-3 py-2 text-sm">{pelangganNama}</div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="tanggal-isolir">Tanggal Isolir</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="tanggal-isolir"
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {tanggalIsolir ? format(tanggalIsolir, "PPP", { locale: id }) : "Pilih tanggal isolir"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={tanggalIsolir}
                  onSelect={setTanggalIsolir}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <Label htmlFor="alasan-isolir">Alasan Isolir</Label>
            <Select value={alasanIsolir} onValueChange={setAlasanIsolir}>
              <SelectTrigger id="alasan-isolir">
                <SelectValue placeholder="Pilih alasan isolir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tunggakan">Tunggakan Pembayaran</SelectItem>
                <SelectItem value="permintaan">Permintaan Pelanggan</SelectItem>
                <SelectItem value="pelanggaran">Pelanggaran Ketentuan</SelectItem>
                <SelectItem value="lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="keterangan">Keterangan Tambahan</Label>
            <Textarea
              id="keterangan"
              placeholder="Masukkan keterangan tambahan (opsional)"
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Kirim Notifikasi</Label>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifikasi-wa" checked={notifikasiWA} onCheckedChange={(checked) => setNotifikasiWA(!!checked)} />
              <Label htmlFor="notifikasi-wa" className="cursor-pointer">
                WhatsApp
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="notifikasi-email" checked={notifikasiEmail} onCheckedChange={(checked) => setNotifikasiEmail(!!checked)} />
              <Label htmlFor="notifikasi-email" className="cursor-pointer">
                Email
              </Label>
            </div>
          </div>

          {tanggalIsolir && (
            <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-medium">Informasi Jadwal Isolir</p>
                  <p className="mt-1">
                    Pelanggan akan diisolir pada tanggal {format(tanggalIsolir, "dd MMMM yyyy", { locale: id })}.
                  </p>
                  <p className="mt-1">
                    Isolir akan berlanjut otomatis pada tanggal {format(tanggalIsolir, "d", { locale: id })} di bulan-bulan berikutnya.
                  </p>
                  <p className="mt-1">
                    Contoh: {format(addMonths(tanggalIsolir, 1), "d MMMM yyyy", { locale: id })}, {format(addMonths(tanggalIsolir, 2), "d MMMM yyyy", { locale: id })}, dst.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Batal
          </Button>
          <Button
            variant="default"
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
            onClick={handleSubmit}
            disabled={isLoading || !tanggalIsolir}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                Memproses...
              </span>
            ) : (
              "Konfirmasi Isolir"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
