"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface TambahTransaksiModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TambahTransaksiModal({ isOpen, onClose }: TambahTransaksiModalProps) {
  const [tanggalTransaksi, setTanggalTransaksi] = useState<Date>()
  const [jenisTransaksi, setJenisTransaksi] = useState("pendapatan")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log("Data transaksi disimpan")
    // Reset form dan tutup dialog
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-background p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Tambah Transaksi Baru</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jenis-transaksi">Jenis Transaksi</Label>
              <Select value={jenisTransaksi} onValueChange={setJenisTransaksi}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis transaksi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendapatan">Pendapatan</SelectItem>
                  <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal">Tanggal Transaksi</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tanggalTransaksi && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tanggalTransaksi ? format(tanggalTransaksi, "PPP", { locale: id }) : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={tanggalTransaksi} onSelect={setTanggalTransaksi} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {jenisTransaksi === "pendapatan" ? (
                    <>
                      <SelectItem value="layanan-internet">Layanan Internet</SelectItem>
                      <SelectItem value="instalasi">Instalasi</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="utilitas">Utilitas</SelectItem>
                      <SelectItem value="gaji">Gaji</SelectItem>
                      <SelectItem value="peralatan">Peralatan</SelectItem>
                      <SelectItem value="sewa">Sewa</SelectItem>
                      <SelectItem value="operasional">Operasional</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jumlah">Jumlah (Rp)</Label>
              <Input id="jumlah" type="number" placeholder="0" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea id="deskripsi" placeholder="Deskripsi transaksi" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="metode-pembayaran">Metode Pembayaran</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih metode pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="transfer-bank">Transfer Bank</SelectItem>
                  <SelectItem value="tunai">Tunai</SelectItem>
                  <SelectItem value="kartu-kredit">Kartu Kredit</SelectItem>
                  <SelectItem value="e-wallet">E-Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
