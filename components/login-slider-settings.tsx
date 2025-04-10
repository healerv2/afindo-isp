"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { format } from "date-fns"
import Image from "next/image"
import { Trash2, GripVertical, CalendarIcon, Plus, ExternalLink, Settings, Eye } from "lucide-react"

// Tipe data untuk slider
interface SliderItem {
  id: string
  file: File | null
  preview: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  displayTime: number
  transition: string
  startDate: Date | null
  endDate: Date | null
  active: boolean
}

// Tipe data untuk statistik
interface SliderStats {
  views: number
  clicks: number
  conversionRate: string
}

export function LoginSliderSettings() {
  const [enabled, setEnabled] = useState(true)
  const [activeTab, setActiveTab] = useState("pelanggan")
  const [advancedMode, setAdvancedMode] = useState(false)

  // State untuk slider pelanggan
  const [pelangganSliders, setPelangganSliders] = useState<SliderItem[]>([
    {
      id: "p1",
      file: null,
      preview: "/placeholder.svg?height=400&width=800",
      title: "Selamat Datang di Afindo",
      description: "Platform manajemen layanan internet terbaik",
      ctaText: "Pelajari Lebih Lanjut",
      ctaLink: "#",
      displayTime: 5,
      transition: "fade",
      startDate: null,
      endDate: null,
      active: true,
    },
    {
      id: "p2",
      file: null,
      preview: "/placeholder.svg?height=400&width=800",
      title: "Promo Spesial",
      description: "Dapatkan diskon 10% untuk pelanggan baru",
      ctaText: "Daftar Sekarang",
      ctaLink: "#",
      displayTime: 5,
      transition: "slide",
      startDate: null,
      endDate: null,
      active: true,
    },
    {
      id: "p3",
      file: null,
      preview: "/placeholder.svg?height=400&width=800",
      title: "Layanan 24/7",
      description: "Tim support kami siap membantu Anda kapan saja",
      ctaText: "Hubungi Kami",
      ctaLink: "#",
      displayTime: 5,
      transition: "zoom",
      startDate: null,
      endDate: null,
      active: true,
    },
  ])

  // State untuk slider karyawan
  const [karyawanSliders, setKaryawanSliders] = useState<SliderItem[]>([
    {
      id: "k1",
      file: null,
      preview: "/placeholder.svg?height=400&width=800",
      title: "Portal Karyawan Afindo",
      description: "Akses semua tools dan informasi dalam satu platform",
      ctaText: "Lihat Panduan",
      ctaLink: "#",
      displayTime: 5,
      transition: "fade",
      startDate: null,
      endDate: null,
      active: true,
    },
    {
      id: "k2",
      file: null,
      preview: "/placeholder.svg?height=400&width=800",
      title: "Target Bulan Ini",
      description: "Kita telah mencapai 85% dari target bulanan",
      ctaText: "Lihat Dashboard",
      ctaLink: "#",
      displayTime: 5,
      transition: "slide",
      startDate: null,
      endDate: null,
      active: true,
    },
    {
      id: "k3",
      file: null,
      preview: "/placeholder.svg?height=400&width=800",
      title: "Meeting Mingguan",
      description: "Jangan lupa meeting tim setiap Senin jam 9 pagi",
      ctaText: "Tambah ke Kalender",
      ctaLink: "#",
      displayTime: 5,
      transition: "zoom",
      startDate: null,
      endDate: null,
      active: true,
    },
  ])

  // Statistik dummy untuk demo
  const [stats, setStats] = useState<{ [key: string]: SliderStats }>({
    p1: { views: 245, clicks: 32, conversionRate: "13.1%" },
    p2: { views: 189, clicks: 41, conversionRate: "21.7%" },
    p3: { views: 203, clicks: 27, conversionRate: "13.3%" },
    k1: { views: 87, clicks: 23, conversionRate: "26.4%" },
    k2: { views: 92, clicks: 18, conversionRate: "19.6%" },
    k3: { views: 76, clicks: 15, conversionRate: "19.7%" },
  })

  // Tema warna
  const [themeColor, setThemeColor] = useState("#0f172a")

  // Pengaturan global
  const [globalSettings, setGlobalSettings] = useState({
    compression: true,
    lazyLoading: true,
    preloading: true,
    darkMode: false,
    accessibilityFeatures: true,
  })

  const handleFileChange = (file: File | null, sliderId: string) => {
    const sliders = activeTab === "pelanggan" ? [...pelangganSliders] : [...karyawanSliders]
    const index = sliders.findIndex((s) => s.id === sliderId)

    if (index === -1) return

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        sliders[index] = {
          ...sliders[index],
          file: file,
          preview: reader.result as string,
        }

        if (activeTab === "pelanggan") {
          setPelangganSliders(sliders)
        } else {
          setKaryawanSliders(sliders)
        }
      }
      reader.readAsDataURL(file)
    } else {
      sliders[index] = {
        ...sliders[index],
        file: null,
        preview: "/placeholder.svg?height=400&width=800",
      }

      if (activeTab === "pelanggan") {
        setPelangganSliders(sliders)
      } else {
        setKaryawanSliders(sliders)
      }
    }
  }

  const handleSliderChange = (sliderId: string, field: keyof SliderItem, value: any) => {
    const sliders = activeTab === "pelanggan" ? [...pelangganSliders] : [...karyawanSliders]
    const index = sliders.findIndex((s) => s.id === sliderId)

    if (index === -1) return

    sliders[index] = {
      ...sliders[index],
      [field]: value,
    }

    if (activeTab === "pelanggan") {
      setPelangganSliders(sliders)
    } else {
      setKaryawanSliders(sliders)
    }
  }

  const handleRemoveSlider = (sliderId: string) => {
    if (activeTab === "pelanggan") {
      setPelangganSliders(pelangganSliders.filter((s) => s.id !== sliderId))
    } else {
      setKaryawanSliders(karyawanSliders.filter((s) => s.id !== sliderId))
    }
  }

  const handleAddSlider = () => {
    const newId = activeTab === "pelanggan" ? `p${pelangganSliders.length + 1}` : `k${karyawanSliders.length + 1}`
    const newSlider: SliderItem = {
      id: newId,
      file: null,
      preview: "/placeholder.svg?height=400&width=800",
      title: "Judul Baru",
      description: "Deskripsi slider baru",
      ctaText: "Tombol Aksi",
      ctaLink: "#",
      displayTime: 5,
      transition: "fade",
      startDate: null,
      endDate: null,
      active: true,
    }

    if (activeTab === "pelanggan") {
      setPelangganSliders([...pelangganSliders, newSlider])
    } else {
      setKaryawanSliders([...karyawanSliders, newSlider])
    }
  }

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = activeTab === "pelanggan" ? [...pelangganSliders] : [...karyawanSliders]
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    if (activeTab === "pelanggan") {
      setPelangganSliders(items)
    } else {
      setKaryawanSliders(items)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      enabled,
      themeColor,
      globalSettings,
      pelangganSliders,
      karyawanSliders,
    })
    alert("Pengaturan slider gambar berhasil disimpan!")
  }

  const currentSliders = activeTab === "pelanggan" ? pelangganSliders : karyawanSliders

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Slider Gambar Custom</CardTitle>
              <CardDescription>Atur gambar slider yang akan ditampilkan pada aplikasi</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="advanced-mode" className="text-sm">
                Mode Lanjutan
              </Label>
              <Switch id="advanced-mode" checked={advancedMode} onCheckedChange={setAdvancedMode} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="slider-enabled" className="font-medium">
              Aktifkan Slider Gambar
            </Label>
            <Switch id="slider-enabled" checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <div className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pelanggan">Halaman Pelanggan</TabsTrigger>
                  <TabsTrigger value="karyawan">Halaman Karyawan</TabsTrigger>
                </TabsList>
                <TabsContent value="pelanggan" className="mt-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Atur gambar slider yang akan ditampilkan pada halaman login pelanggan
                  </div>
                </TabsContent>
                <TabsContent value="karyawan" className="mt-4">
                  <div className="text-sm text-muted-foreground mb-4">
                    Atur gambar slider yang akan ditampilkan pada halaman login karyawan
                  </div>
                </TabsContent>
              </Tabs>

              {/* Pengaturan tema warna */}
              {advancedMode && (
                <div className="p-4 border rounded-lg space-y-4">
                  <h3 className="font-medium flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Pengaturan Global
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme-color">Tema Warna</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="theme-color"
                          type="color"
                          value={themeColor}
                          onChange={(e) => setThemeColor(e.target.value)}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={themeColor}
                          onChange={(e) => setThemeColor(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Optimasi</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="compression"
                            checked={globalSettings.compression}
                            onCheckedChange={(checked) =>
                              setGlobalSettings({ ...globalSettings, compression: checked as boolean })
                            }
                          />
                          <Label htmlFor="compression" className="text-sm">
                            Kompresi Otomatis
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="lazy-loading"
                            checked={globalSettings.lazyLoading}
                            onCheckedChange={(checked) =>
                              setGlobalSettings({ ...globalSettings, lazyLoading: checked as boolean })
                            }
                          />
                          <Label htmlFor="lazy-loading" className="text-sm">
                            Lazy Loading
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="preloading"
                            checked={globalSettings.preloading}
                            onCheckedChange={(checked) =>
                              setGlobalSettings({ ...globalSettings, preloading: checked as boolean })
                            }
                          />
                          <Label htmlFor="preloading" className="text-sm">
                            Preloading
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="sliders">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {currentSliders.map((slider, index) => (
                        <Draggable key={slider.id} draggableId={slider.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="border p-4 rounded-lg space-y-4"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                  <h3 className="font-medium">Slider {index + 1}</h3>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id={`active-${slider.id}`}
                                    checked={slider.active}
                                    onCheckedChange={(checked) => handleSliderChange(slider.id, "active", checked)}
                                  />
                                  <Label htmlFor={`active-${slider.id}`} className="text-sm">
                                    Aktif
                                  </Label>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveSlider(slider.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                  <FileUpload
                                    id={`slider-${slider.id}`}
                                    accept="image/*"
                                    onChange={(file) => handleFileChange(file, slider.id)}
                                    file={slider.file}
                                    placeholder={`Upload gambar slider ${index + 1}`}
                                  />

                                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border">
                                    <Image
                                      src={slider.preview || "/placeholder.svg"}
                                      alt={`Slider ${index + 1} Preview`}
                                      fill
                                      className="object-cover"
                                    />

                                    {/* Teks overlay preview */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                                      <h3 className="text-xl font-bold">{slider.title}</h3>
                                      <p className="text-sm opacity-90">{slider.description}</p>
                                      {slider.ctaText && (
                                        <div className="mt-2">
                                          <span className="px-3 py-1 bg-white text-black text-sm rounded-md inline-block">
                                            {slider.ctaText}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`title-${slider.id}`}>Judul</Label>
                                    <Input
                                      id={`title-${slider.id}`}
                                      value={slider.title}
                                      onChange={(e) => handleSliderChange(slider.id, "title", e.target.value)}
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`description-${slider.id}`}>Deskripsi</Label>
                                    <Textarea
                                      id={`description-${slider.id}`}
                                      value={slider.description}
                                      onChange={(e) => handleSliderChange(slider.id, "description", e.target.value)}
                                      rows={2}
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-2">
                                      <Label htmlFor={`cta-text-${slider.id}`}>Teks Tombol</Label>
                                      <Input
                                        id={`cta-text-${slider.id}`}
                                        value={slider.ctaText}
                                        onChange={(e) => handleSliderChange(slider.id, "ctaText", e.target.value)}
                                      />
                                    </div>

                                    <div className="space-y-2">
                                      <Label htmlFor={`cta-link-${slider.id}`}>Link Tombol</Label>
                                      <div className="flex">
                                        <Input
                                          id={`cta-link-${slider.id}`}
                                          value={slider.ctaLink}
                                          onChange={(e) => handleSliderChange(slider.id, "ctaLink", e.target.value)}
                                        />
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="icon"
                                          className="ml-1"
                                          onClick={() => window.open(slider.ctaLink, "_blank")}
                                        >
                                          <ExternalLink className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>

                                  {advancedMode && (
                                    <>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                          <Label htmlFor={`display-time-${slider.id}`}>Waktu Tampil (detik)</Label>
                                          <Input
                                            id={`display-time-${slider.id}`}
                                            type="number"
                                            min="1"
                                            max="20"
                                            value={slider.displayTime}
                                            onChange={(e) =>
                                              handleSliderChange(
                                                slider.id,
                                                "displayTime",
                                                Number.parseInt(e.target.value),
                                              )
                                            }
                                          />
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor={`transition-${slider.id}`}>Efek Transisi</Label>
                                          <Select
                                            value={slider.transition}
                                            onValueChange={(value) =>
                                              handleSliderChange(slider.id, "transition", value)
                                            }
                                          >
                                            <SelectTrigger id={`transition-${slider.id}`}>
                                              <SelectValue placeholder="Pilih efek" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="fade">Fade</SelectItem>
                                              <SelectItem value="slide">Slide</SelectItem>
                                              <SelectItem value="zoom">Zoom</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>

                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                          <Label htmlFor={`start-date-${slider.id}`}>Tanggal Mulai</Label>
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                              >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {slider.startDate ? format(slider.startDate, "PPP") : "Pilih tanggal"}
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                              <Calendar
                                                mode="single"
                                                selected={slider.startDate || undefined}
                                                onSelect={(date) => handleSliderChange(slider.id, "startDate", date)}
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        </div>

                                        <div className="space-y-2">
                                          <Label htmlFor={`end-date-${slider.id}`}>Tanggal Berakhir</Label>
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                              >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {slider.endDate ? format(slider.endDate, "PPP") : "Pilih tanggal"}
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                              <Calendar
                                                mode="single"
                                                selected={slider.endDate || undefined}
                                                onSelect={(date) => handleSliderChange(slider.id, "endDate", date)}
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        </div>
                                      </div>

                                      {/* Statistik */}
                                      <div className="mt-4 p-3 bg-muted rounded-md">
                                        <h4 className="text-sm font-medium mb-2 flex items-center">
                                          <Eye className="h-3 w-3 mr-1" /> Statistik Interaksi
                                        </h4>
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                          <div>
                                            <p className="text-xs text-muted-foreground">Dilihat</p>
                                            <p className="font-medium">{stats[slider.id]?.views || 0}</p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground">Diklik</p>
                                            <p className="font-medium">{stats[slider.id]?.clicks || 0}</p>
                                          </div>
                                          <div>
                                            <p className="text-xs text-muted-foreground">Konversi</p>
                                            <p className="font-medium">{stats[slider.id]?.conversionRate || "0%"}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <Button type="button" variant="outline" className="w-full mt-2" onClick={handleAddSlider}>
                <Plus className="h-4 w-4 mr-2" /> Tambah Slider Baru
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Batal
          </Button>
          <Button type="submit">Simpan Pengaturan</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
