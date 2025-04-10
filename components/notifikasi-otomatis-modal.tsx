"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { CalendarIcon, Check, Clock, Mail, MessageSquare, Send } from "lucide-react"

interface NotifikasiOtomatisModalProps {
  isOpen: boolean
  onClose: () => void
  type: "tagihan" | "info"
  preselectedRecipients?: Array<{
    id: string
    nama: string
    email?: string
    whatsapp?: string
  }>
}

export function NotifikasiOtomatisModal({
  isOpen,
  onClose,
  type,
  preselectedRecipients = [],
}: NotifikasiOtomatisModalProps) {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "email">("whatsapp")
  const [jadwalkan, setJadwalkan] = useState(false)
  const [tanggal, setTanggal] = useState<Date | undefined>(new Date())
  const [waktu, setWaktu] = useState("08:00")
  const [penerima, setPenerima] = useState<"selected" | "all" | "filter">(
    preselectedRecipients.length > 0 ? "selected" : "all",
  )
  const [filter, setFilter] = useState<"aktif" | "isolir" | "baru" | "karyawan" | "semua">("aktif")
  const [useTemplate, setUseTemplate] = useState(true)
  const [pesan, setPesan] = useState("")
  const [subject, setSubject] = useState(type === "tagihan" ? "Tagihan Internet Bulan Ini" : "Informasi Penting")

  // Template pesan default
  const getDefaultTemplate = () => {
    if (type === "tagihan") {
      return activeTab === "whatsapp"
        ? "Yth. {nama_pelanggan},\n\nIni adalah pemberitahuan tagihan internet Anda untuk bulan ini. Silakan klik link berikut untuk melihat dan membayar tagihan Anda:\n\n{link_tagihan}\n\nTerima kasih atas kerjasamanya.\n\nSalam,\nTim Layanan Pelanggan"
        : "Yth. {nama_pelanggan},\n\nIni adalah pemberitahuan tagihan internet Anda untuk bulan ini. Silakan klik tombol di bawah untuk melihat dan membayar tagihan Anda.\n\nJumlah tagihan: {jumlah_tagihan}\nTanggal jatuh tempo: {tanggal_jatuh_tempo}\n\nTerima kasih atas kerjasamanya.\n\nSalam,\nTim Layanan Pelanggan"
    } else {
      return activeTab === "whatsapp"
        ? "Yth. {nama_pelanggan},\n\nKami ingin menginformasikan bahwa {informasi_penting}.\n\nUntuk informasi lebih lanjut, silakan hubungi tim layanan pelanggan kami.\n\nSalam,\nTim Layanan Pelanggan"
        : "Yth. {nama_pelanggan},\n\nKami ingin menginformasikan bahwa {informasi_penting}.\n\nUntuk informasi lebih lanjut, silakan hubungi tim layanan pelanggan kami.\n\nSalam,\nTim Layanan Pelanggan"
    }
  }

  // Reset pesan saat tab atau template berubah
  const resetPesan = () => {
    if (useTemplate) {
      setPesan(getDefaultTemplate())
    }
  }

  // Inisialisasi pesan saat komponen dimuat
  useState(() => {
    resetPesan()
  })

  // Mendapatkan preview pesan dengan variabel yang diganti
  const getPreviewPesan = () => {
    const sampleData = {
      nama_pelanggan: preselectedRecipients.length > 0 ? preselectedRecipients[0].nama : "PT Maju Jaya",
      link_tagihan: "https://tagihan.example.com/invoice/123456",
      jumlah_tagihan: "Rp 1.500.000",
      tanggal_jatuh_tempo: "25 Januari 2025",
      informasi_penting: "akan ada pemeliharaan jaringan pada tanggal 20 Januari 2025 pukul 01:00-03:00 WIB",
    }

    let previewText = pesan || getDefaultTemplate()

    // Ganti semua variabel dengan nilai sampel
    Object.entries(sampleData).forEach(([key, value]) => {
      previewText = previewText.replace(new RegExp(`{${key}}`, "g"), value)
    })

    return previewText
  }

  // Mendapatkan jumlah penerima
  const getJumlahPenerima = () => {
    if (penerima === "selected") {
      return preselectedRecipients.length
    } else if (penerima === "all") {
      return 20 // Jumlah dummy untuk semua pelanggan
    } else {
      // Jumlah dummy berdasarkan filter
      const filterCounts = {
        aktif: 7,
        isolir: 3,
        baru: 5,
        karyawan: 5,
        semua: 20,
      }
      return filterCounts[filter]
    }
  }

  // Menangani pengiriman notifikasi
  const handleSubmit = () => {
    const notifikasiData = {
      channel: activeTab,
      jadwalkan,
      tanggal: jadwalkan ? tanggal : new Date(),
      waktu: jadwalkan ? waktu : format(new Date(), "HH:mm"),
      penerima,
      filter: penerima === "filter" ? filter : undefined,
      preselectedIds: penerima === "selected" ? preselectedRecipients.map((r) => r.id) : [],
      pesan: pesan || getDefaultTemplate(),
      subject: activeTab === "email" ? subject : undefined,
    }

    console.log("Mengirim notifikasi:", notifikasiData)

    // Di sini akan ada kode untuk mengirim atau menjadwalkan notifikasi
    // Untuk demo, kita hanya menampilkan alert
    alert(
      `Notifikasi ${jadwalkan ? "dijadwalkan" : "dikirim"} ke ${getJumlahPenerima()} penerima melalui ${
        activeTab === "whatsapp" ? "WhatsApp" : "Email"
      }`,
    )

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{type === "tagihan" ? "Kirim Notifikasi Tagihan" : "Kirim Informasi"}</DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value as "whatsapp" | "email")
            resetPesan()
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="jadwalkan-wa"
                  checked={jadwalkan}
                  onCheckedChange={(checked) => setJadwalkan(!!checked)}
                />
                <Label htmlFor="jadwalkan-wa">Jadwalkan pengiriman</Label>
              </div>

              {jadwalkan && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tanggal">Tanggal</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal" id="tanggal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {tanggal ? format(tanggal, "PPP", { locale: id }) : "Pilih tanggal"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={tanggal} onSelect={setTanggal} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waktu">Waktu</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="waktu"
                        type="time"
                        value={waktu}
                        onChange={(e) => setWaktu(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Penerima</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="selected-wa"
                      name="penerima-wa"
                      checked={penerima === "selected"}
                      onChange={() => setPenerima("selected")}
                      disabled={preselectedRecipients.length === 0}
                    />
                    <Label htmlFor="selected-wa" className="cursor-pointer">
                      Pelanggan terpilih ({preselectedRecipients.length})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="all-wa"
                      name="penerima-wa"
                      checked={penerima === "all"}
                      onChange={() => setPenerima("all")}
                    />
                    <Label htmlFor="all-wa" className="cursor-pointer">
                      Semua pelanggan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="filter-wa"
                      name="penerima-wa"
                      checked={penerima === "filter"}
                      onChange={() => setPenerima("filter")}
                    />
                    <Label htmlFor="filter-wa" className="cursor-pointer">
                      Berdasarkan filter
                    </Label>
                  </div>
                </div>
              </div>

              {penerima === "filter" && (
                <div className="space-y-2">
                  <Label htmlFor="filter-type-wa">Filter</Label>
                  <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
                    <SelectTrigger id="filter-type-wa">
                      <SelectValue placeholder="Pilih filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aktif">Pelanggan Aktif</SelectItem>
                      <SelectItem value="isolir">Pelanggan Isolir</SelectItem>
                      <SelectItem value="baru">Pelanggan Baru</SelectItem>
                      <SelectItem value="karyawan">Karyawan</SelectItem>
                      <SelectItem value="semua">Semua</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pesan-wa">Pesan</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="template-wa"
                      checked={useTemplate}
                      onCheckedChange={(checked) => {
                        setUseTemplate(!!checked)
                        if (checked) {
                          setPesan(getDefaultTemplate())
                        }
                      }}
                    />
                    <Label htmlFor="template-wa" className="text-sm">
                      Gunakan template
                    </Label>
                  </div>
                </div>
                <Textarea
                  id="pesan-wa"
                  placeholder="Masukkan pesan..."
                  rows={6}
                  value={pesan || getDefaultTemplate()}
                  onChange={(e) => setPesan(e.target.value)}
                />
                <div className="text-xs text-muted-foreground">
                  Variabel yang tersedia: {"{nama_pelanggan}"}, {"{link_tagihan}"}, {"{jumlah_tagihan}"},{" "}
                  {"{tanggal_jatuh_tempo}"}, {"{informasi_penting}"}
                </div>
              </div>

              <div className="space-y-2 border rounded-md p-3 bg-muted/30">
                <Label className="text-sm font-medium">Preview Pesan:</Label>
                <div className="whitespace-pre-wrap text-sm p-2 bg-white rounded border">{getPreviewPesan()}</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="jadwalkan-email"
                  checked={jadwalkan}
                  onCheckedChange={(checked) => setJadwalkan(!!checked)}
                />
                <Label htmlFor="jadwalkan-email">Jadwalkan pengiriman</Label>
              </div>

              {jadwalkan && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tanggal-email">Tanggal</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="tanggal-email"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {tanggal ? format(tanggal, "PPP", { locale: id }) : "Pilih tanggal"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={tanggal} onSelect={setTanggal} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="waktu-email">Waktu</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="waktu-email"
                        type="time"
                        value={waktu}
                        onChange={(e) => setWaktu(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Penerima</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="selected-email"
                      name="penerima-email"
                      checked={penerima === "selected"}
                      onChange={() => setPenerima("selected")}
                      disabled={preselectedRecipients.length === 0}
                    />
                    <Label htmlFor="selected-email" className="cursor-pointer">
                      Pelanggan terpilih ({preselectedRecipients.length})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="all-email"
                      name="penerima-email"
                      checked={penerima === "all"}
                      onChange={() => setPenerima("all")}
                    />
                    <Label htmlFor="all-email" className="cursor-pointer">
                      Semua pelanggan
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="filter-email"
                      name="penerima-email"
                      checked={penerima === "filter"}
                      onChange={() => setPenerima("filter")}
                    />
                    <Label htmlFor="filter-email" className="cursor-pointer">
                      Berdasarkan filter
                    </Label>
                  </div>
                </div>
              </div>

              {penerima === "filter" && (
                <div className="space-y-2">
                  <Label htmlFor="filter-type-email">Filter</Label>
                  <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
                    <SelectTrigger id="filter-type-email">
                      <SelectValue placeholder="Pilih filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aktif">Pelanggan Aktif</SelectItem>
                      <SelectItem value="isolir">Pelanggan Isolir</SelectItem>
                      <SelectItem value="baru">Pelanggan Baru</SelectItem>
                      <SelectItem value="karyawan">Karyawan</SelectItem>
                      <SelectItem value="semua">Semua</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Subject email..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pesan-email">Isi Email</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="template-email"
                      checked={useTemplate}
                      onCheckedChange={(checked) => {
                        setUseTemplate(!!checked)
                        if (checked) {
                          setPesan(getDefaultTemplate())
                        }
                      }}
                    />
                    <Label htmlFor="template-email" className="text-sm">
                      Gunakan template
                    </Label>
                  </div>
                </div>
                <Textarea
                  id="pesan-email"
                  placeholder="Masukkan isi email..."
                  rows={6}
                  value={pesan || getDefaultTemplate()}
                  onChange={(e) => setPesan(e.target.value)}
                />
                <div className="text-xs text-muted-foreground">
                  Variabel yang tersedia: {"{nama_pelanggan}"}, {"{link_tagihan}"}, {"{jumlah_tagihan}"},{" "}
                  {"{tanggal_jatuh_tempo}"}, {"{informasi_penting}"}
                </div>
              </div>

              <div className="space-y-2 border rounded-md p-3 bg-muted/30">
                <Label className="text-sm font-medium">Preview Email:</Label>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Subject: {subject}</div>
                  <div className="whitespace-pre-wrap text-sm p-2 bg-white rounded border">{getPreviewPesan()}</div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-muted/50 p-3 rounded-md flex items-center gap-2 text-sm">
          <Check className="h-4 w-4 text-green-500" />
          <span>
            {getJumlahPenerima()} penerima akan menerima notifikasi ini
            {jadwalkan
              ? ` pada ${format(tanggal || new Date(), "d MMMM yyyy", { locale: id })} pukul ${waktu}`
              : " segera"}
          </span>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit} className="gap-2">
            <Send className="h-4 w-4" />
            {jadwalkan ? "Jadwalkan" : "Kirim Sekarang"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
