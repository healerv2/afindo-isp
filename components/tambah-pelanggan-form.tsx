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
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CalendarIcon, MapPin } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { OdpPortSelector } from "./odp-port-selector"
import { FileUpload } from "./file-upload"
import { MiniMap } from "./mini-map"

interface TambahPelangganFormProps {
  onSuccess?: () => void
}

// Tambahkan state untuk file upload dan lokasi
export function TambahPelangganForm({ onSuccess }: TambahPelangganFormProps) {
  const [step, setStep] = useState(1)
  const [tanggalDaftar, setTanggalDaftar] = useState<Date>()
  const [tanggalBayar, setTanggalBayar] = useState<Date>()
  const [tanggalIsolir, setTanggalIsolir] = useState<Date>()
  const [prorata, setProrata] = useState(false)
  const [selectedPort, setSelectedPort] = useState<number | null>(null)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [ktpFile, setKtpFile] = useState<File | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Dummy data untuk dropdown
  const paketOptions = [
    { value: "basic", label: "Basic - Rp 150.000" },
    { value: "standard", label: "Standard - Rp 250.000" },
    { value: "premium", label: "Premium - Rp 350.000" },
    { value: "business", label: "Business - Rp 750.000" },
    { value: "enterprise", label: "Enterprise - Rp 1.500.000" },
  ]

  const areaOptions = [
    { value: "jakarta-pusat", label: "Jakarta Pusat" },
    { value: "jakarta-barat", label: "Jakarta Barat" },
    { value: "jakarta-selatan", label: "Jakarta Selatan" },
    { value: "jakarta-timur", label: "Jakarta Timur" },
    { value: "jakarta-utara", label: "Jakarta Utara" },
    { value: "bogor", label: "Bogor" },
    { value: "depok", label: "Depok" },
    { value: "tangerang", label: "Tangerang" },
    { value: "bekasi", label: "Bekasi" },
  ]

  const mikrotikOptions = [
    { value: "mikrotik-1", label: "Mikrotik Router 1" },
    { value: "mikrotik-2", label: "Mikrotik Router 2" },
    { value: "mikrotik-3", label: "Mikrotik Router 3" },
  ]

  const odpOptions = [
    { value: "odp-1", label: "ODP-01 (16 Port)" },
    { value: "odp-2", label: "ODP-02 (16 Port)" },
    { value: "odp-3", label: "ODP-03 (16 Port)" },
    { value: "odp-4", label: "ODP-04 (16 Port)" },
  ]

  // Dummy data untuk port yang sudah terpakai
  const usedPorts = [2, 5, 7, 10, 13]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log("Data pelanggan disimpan")
    // Reset form dan tutup dialog
    if (onSuccess) {
      onSuccess()
    }
  }

  const nextStep = () => {
    setStep(2)
  }

  const prevStep = () => {
    setStep(1)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {step === 1 ? (
        <>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama" className="text-right">
                Nama
              </Label>
              <Input id="nama" placeholder="Nama pelanggan" className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat" className="text-right">
                Alamat
              </Label>
              <Textarea id="alamat" placeholder="Alamat lengkap" className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lokasi" className="text-right">
                Lokasi
              </Label>
              <div className="col-span-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <MapPin className="mr-2 h-4 w-4" />
                      {location ? "Lokasi dipilih" : "Pilih lokasi di peta"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Pilih Lokasi Pelanggan</DialogTitle>
                    </DialogHeader>
                    <MiniMap onSelectLocation={setLocation} selectedLocation={location} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="selfie" className="text-right">
                Upload Selfie
              </Label>
              <div className="col-span-3">
                <FileUpload
                  id="selfie"
                  accept="image/*"
                  onChange={setSelfieFile}
                  file={selfieFile}
                  placeholder="Upload foto selfie pelanggan"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ktp" className="text-right">
                Upload KTP
              </Label>
              <div className="col-span-3">
                <FileUpload
                  id="ktp"
                  accept="image/*"
                  onChange={setKtpFile}
                  file={ktpFile}
                  placeholder="Upload foto KTP pelanggan"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal-daftar" className="text-right">
                Tanggal Daftar
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !tanggalDaftar && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tanggalDaftar ? format(tanggalDaftar, "PPP", { locale: id }) : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={tanggalDaftar} onSelect={setTanggalDaftar} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal-bayar" className="text-right">
                Tanggal Terakhir Bayar
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !tanggalBayar && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tanggalBayar ? format(tanggalBayar, "PPP", { locale: id }) : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={tanggalBayar} onSelect={setTanggalBayar} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal-isolir" className="text-right">
                Tanggal Isolir
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !tanggalIsolir && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {tanggalIsolir ? format(tanggalIsolir, "PPP", { locale: id }) : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={tanggalIsolir} onSelect={setTanggalIsolir} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paket" className="text-right">
                Pilih Paket
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih paket" />
                </SelectTrigger>
                <SelectContent>
                  {paketOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="area" className="text-right">
                Pilih Area
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih area" />
                </SelectTrigger>
                <SelectContent>
                  {areaOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="biaya-tambah-1" className="text-right">
                Biaya Tambah 1
              </Label>
              <Input id="biaya-tambah-1" type="number" placeholder="Rp 0" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="biaya-tambah-2" className="text-right">
                Biaya Tambah 2
              </Label>
              <Input id="biaya-tambah-2" type="number" placeholder="Rp 0" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="diskon" className="text-right">
                Diskon
              </Label>
              <Input id="diskon" type="number" placeholder="Rp 0" className="col-span-3" />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prorata" className="text-right">
                Prorata
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="prorata" checked={prorata} onCheckedChange={setProrata} />
                <Label htmlFor="prorata" className="text-sm text-muted-foreground">
                  {prorata ? "Aktif" : "Tidak Aktif"}
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onSuccess?.()}>
              Batal
            </Button>
            <Button type="button" onClick={nextStep}>
              Lanjut
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mikrotik" className="text-right">
                Mikrotik
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih mikrotik" />
                </SelectTrigger>
                <SelectContent>
                  {mikrotikOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">PPPoE</Label>
              <div className="col-span-3 text-sm text-muted-foreground">Point-to-Point Protocol over Ethernet</div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secret" className="text-right">
                Secret
              </Label>
              <Input id="secret" placeholder="Username PPPoE" className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input id="password" type="password" placeholder="Password PPPoE" className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="odp" className="text-right">
                ODP
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih ODP" />
                </SelectTrigger>
                <SelectContent>
                  {odpOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="port" className="text-right pt-2">
                Port
              </Label>
              <div className="col-span-3">
                <OdpPortSelector
                  totalPorts={16}
                  usedPorts={usedPorts}
                  selectedPort={selectedPort}
                  onSelectPort={setSelectedPort}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={prevStep}>
              Kembali
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </>
      )}
    </form>
  )
}
