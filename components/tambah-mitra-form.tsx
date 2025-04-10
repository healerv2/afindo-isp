"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"
import { CalendarIcon, Check, Info } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"

export function TambahMitraForm() {
  // State untuk form
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [telepon, setTelepon] = useState("")
  const [alamat, setAlamat] = useState("")
  const [paket, setPaket] = useState("")
  const [biayaAdmin, setBiayaAdmin] = useState<number>(5000)
  const [tanggalBergabung, setTanggalBergabung] = useState<Date>()
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [xenditEnabled, setXenditEnabled] = useState(false)
  const [midtransEnabled, setMidtransEnabled] = useState(false)
  const [xenditApiKey, setXenditApiKey] = useState("")
  const [midtransClientKey, setMidtransClientKey] = useState("")
  const [midtransServerKey, setMidtransServerKey] = useState("")

  // Generate ID Mitra otomatis
  const generateMitraId = () => {
    const prefix = "MTR"
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")
    const timestamp = new Date().getTime().toString().slice(-4)
    return `${prefix}${randomNum}${timestamp}`
  }

  const [mitraId] = useState(generateMitraId())

  // Data paket
  const paketOptions = [
    {
      value: "basic",
      label: "Basic",
      harga: "Rp 500.000/bulan",
      maxPelanggan: 100,
      fitur: ["Dashboard Dasar", "Manajemen Pelanggan", "Penagihan Otomatis", "Laporan Bulanan"],
    },
    {
      value: "pro",
      label: "Professional",
      harga: "Rp 1.000.000/bulan",
      maxPelanggan: 500,
      fitur: [
        "Semua fitur Basic",
        "Integrasi Payment Gateway",
        "Notifikasi WhatsApp",
        "Laporan Lanjutan",
        "Dukungan Prioritas",
      ],
    },
    {
      value: "enterprise",
      label: "Enterprise",
      harga: "Rp 2.500.000/bulan",
      maxPelanggan: "Tidak terbatas",
      fitur: [
        "Semua fitur Professional",
        "White Label",
        "API Akses",
        "Dukungan 24/7",
        "Pelatihan Tim",
        "Setup Dedicated",
      ],
    },
  ]

  // Mendapatkan detail paket yang dipilih
  const selectedPaket = paketOptions.find((p) => p.value === paket)

  // Handle submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulasi pengiriman data ke server
    console.log({
      mitraId,
      nama,
      email,
      telepon,
      alamat,
      paket,
      biayaAdmin,
      tanggalBergabung,
      xenditEnabled,
      midtransEnabled,
      xenditApiKey: xenditEnabled ? xenditApiKey : null,
      midtransClientKey: midtransEnabled ? midtransClientKey : null,
      midtransServerKey: midtransEnabled ? midtransServerKey : null,
    })

    // Tampilkan pesan sukses
    alert(`Mitra berhasil ditambahkan dengan ID: ${mitraId}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Tambah Mitra Baru</CardTitle>
          <CardDescription>
            Tambahkan mitra baru yang akan menggunakan aplikasi Afindo untuk mengelola pelanggan mereka
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs defaultValue="informasi" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="informasi">Informasi Mitra</TabsTrigger>
              <TabsTrigger value="paket">Paket & Biaya</TabsTrigger>
              <TabsTrigger value="integrasi">Integrasi Pembayaran</TabsTrigger>
            </TabsList>

            {/* Tab Informasi Mitra */}
            <TabsContent value="informasi" className="space-y-4 pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="mitra-id">ID Mitra (Otomatis)</Label>
                  <Input id="mitra-id" value={mitraId} readOnly className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tanggal-bergabung">Tanggal Bergabung</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !tanggalBergabung && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {tanggalBergabung ? format(tanggalBergabung, "PPP", { locale: id }) : "Pilih tanggal"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={tanggalBergabung} onSelect={setTanggalBergabung} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Mitra/Perusahaan</Label>
                  <Input
                    id="nama"
                    placeholder="Nama mitra atau perusahaan"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email mitra"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telepon">Nomor Telepon</Label>
                  <Input
                    id="telepon"
                    placeholder="Nomor telepon mitra"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="alamat">Alamat</Label>
                  <Textarea
                    id="alamat"
                    placeholder="Alamat lengkap mitra"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="logo">Logo Perusahaan (Opsional)</Label>
                  <FileUpload
                    id="logo"
                    accept="image/*"
                    onChange={setLogoFile}
                    file={logoFile}
                    placeholder="Upload logo perusahaan"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab Paket & Biaya */}
            <TabsContent value="paket" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="paket">Pilih Paket</Label>
                  <Select value={paket} onValueChange={setPaket} required>
                    <SelectTrigger id="paket">
                      <SelectValue placeholder="Pilih paket langganan" />
                    </SelectTrigger>
                    <SelectContent>
                      {paketOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label} - {option.harga}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedPaket && (
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{selectedPaket.label}</CardTitle>
                      <CardDescription>{selectedPaket.harga}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Maksimal Pelanggan:</span> {selectedPaket.maxPelanggan}
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Fitur:</p>
                          <ul className="text-sm space-y-1">
                            {selectedPaket.fitur.map((fitur, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-primary" />
                                {fitur}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-2">
                  <Label htmlFor="biaya-admin">
                    Biaya Admin per Transaksi{" "}
                    <span className="text-xs text-muted-foreground">(dikenakan ke pelanggan mitra)</span>
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="biaya-admin"
                      type="number"
                      min={0}
                      value={biayaAdmin}
                      onChange={(e) => setBiayaAdmin(Number(e.target.value))}
                      required
                    />
                    <span className="text-sm font-medium">Rupiah</span>
                  </div>
                </div>

                <div className="rounded-md border p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    <h3 className="text-sm font-medium">Simulasi Pembagian Biaya</h3>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Contoh:</span> Pelanggan membayar tagihan Rp 300.000
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-md bg-muted p-3">
                        <p className="font-medium">Mitra menerima:</p>
                        <p className="text-lg font-bold">Rp 300.000</p>
                        <p className="text-xs text-muted-foreground">Nilai tagihan penuh</p>
                      </div>
                      <div className="rounded-md bg-muted p-3">
                        <p className="font-medium">Pelanggan membayar:</p>
                        <p className="text-lg font-bold">Rp {(300000 + biayaAdmin).toLocaleString("id-ID")}</p>
                        <p className="text-xs text-muted-foreground">
                          Tagihan + Biaya admin Rp {biayaAdmin.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      * Biaya admin akan otomatis ditambahkan ke saldo Afindo
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab Integrasi Pembayaran */}
            <TabsContent value="integrasi" className="space-y-4 pt-4">
              <div className="space-y-6">
                {/* Xendit Integration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="xendit-enabled" className="text-base">
                        Integrasi Xendit
                      </Label>
                      <p className="text-sm text-muted-foreground">Aktifkan untuk menerima pembayaran melalui Xendit</p>
                    </div>
                    <Switch id="xendit-enabled" checked={xenditEnabled} onCheckedChange={setXenditEnabled} />
                  </div>

                  {xenditEnabled && (
                    <div className="space-y-4 rounded-md border p-4">
                      <div className="space-y-2">
                        <Label htmlFor="xendit-api-key">API Key</Label>
                        <Input
                          id="xendit-api-key"
                          placeholder="xnd_development_..."
                          value={xenditApiKey}
                          onChange={(e) => setXenditApiKey(e.target.value)}
                          required={xenditEnabled}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="xendit-callback-url">Callback URL (Salin ke dashboard Xendit)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="xendit-callback-url"
                            value={`https://afindo.com/api/mitra/${mitraId}/xendit/callback`}
                            readOnly
                            className="bg-muted"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`https://afindo.com/api/mitra/${mitraId}/xendit/callback`)
                              alert("URL berhasil disalin!")
                            }}
                          >
                            Salin
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Midtrans Integration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="midtrans-enabled" className="text-base">
                        Integrasi Midtrans
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan untuk menerima pembayaran melalui Midtrans
                      </p>
                    </div>
                    <Switch id="midtrans-enabled" checked={midtransEnabled} onCheckedChange={setMidtransEnabled} />
                  </div>

                  {midtransEnabled && (
                    <div className="space-y-4 rounded-md border p-4">
                      <div className="space-y-2">
                        <Label htmlFor="midtrans-client-key">Client Key</Label>
                        <Input
                          id="midtrans-client-key"
                          placeholder="SB-Mid-client-..."
                          value={midtransClientKey}
                          onChange={(e) => setMidtransClientKey(e.target.value)}
                          required={midtransEnabled}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="midtrans-server-key">Server Key</Label>
                        <Input
                          id="midtrans-server-key"
                          type="password"
                          placeholder="SB-Mid-server-..."
                          value={midtransServerKey}
                          onChange={(e) => setMidtransServerKey(e.target.value)}
                          required={midtransEnabled}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="midtrans-callback-url">Callback URL (Salin ke dashboard Midtrans)</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="midtrans-callback-url"
                            value={`https://afindo.com/api/mitra/${mitraId}/midtrans/callback`}
                            readOnly
                            className="bg-muted"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(`https://afindo.com/api/mitra/${mitraId}/midtrans/callback`)
                              alert("URL berhasil disalin!")
                            }}
                          >
                            Salin
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-md border p-4 bg-muted/30">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Informasi Integrasi Pembayaran</h3>
                      <p className="text-sm text-muted-foreground">
                        Integrasi pembayaran memungkinkan pelanggan mitra untuk membayar tagihan secara online. Biaya
                        admin akan otomatis ditambahkan ke tagihan pelanggan dan masuk ke saldo Afindo.
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Pastikan API key yang dimasukkan sudah benar dan callback URL sudah dikonfigurasi di dashboard
                        Xendit/Midtrans.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Batal
          </Button>
          <Button type="submit">Simpan Mitra</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
