"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface SliderItem {
  id: string
  preview: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  transition: string
  displayTime: number
}

export function LoginPreview() {
  const [activeTab, setActiveTab] = useState("pelanggan")
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Contoh data slider (dalam implementasi sebenarnya, ini akan diambil dari database)
  const pelangganSliders: SliderItem[] = [
    {
      id: "p1",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Selamat Datang di Afindo",
      description: "Platform manajemen layanan internet terbaik",
      ctaText: "Pelajari Lebih Lanjut",
      ctaLink: "#",
      transition: "fade",
      displayTime: 5,
    },
    {
      id: "p2",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Promo Spesial",
      description: "Dapatkan diskon 10% untuk pelanggan baru",
      ctaText: "Daftar Sekarang",
      ctaLink: "#",
      transition: "slide",
      displayTime: 5,
    },
    {
      id: "p3",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Layanan 24/7",
      description: "Tim support kami siap membantu Anda kapan saja",
      ctaText: "Hubungi Kami",
      ctaLink: "#",
      transition: "zoom",
      displayTime: 5,
    },
  ]

  const karyawanSliders: SliderItem[] = [
    {
      id: "k1",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Portal Karyawan Afindo",
      description: "Akses semua tools dan informasi dalam satu platform",
      ctaText: "Lihat Panduan",
      ctaLink: "#",
      transition: "fade",
      displayTime: 5,
    },
    {
      id: "k2",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Target Bulan Ini",
      description: "Kita telah mencapai 85% dari target bulanan",
      ctaText: "Lihat Dashboard",
      ctaLink: "#",
      transition: "slide",
      displayTime: 5,
    },
    {
      id: "k3",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Meeting Mingguan",
      description: "Jangan lupa meeting tim setiap Senin jam 9 pagi",
      ctaText: "Tambah ke Kalender",
      ctaLink: "#",
      transition: "zoom",
      displayTime: 5,
    },
  ]

  const currentSliders = activeTab === "pelanggan" ? pelangganSliders : karyawanSliders

  // Reset interval when tab changes
  useEffect(() => {
    setCurrentSlide(0)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    startAutoSlide()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [activeTab])

  // Auto-slide
  const startAutoSlide = () => {
    const currentDisplayTime = currentSliders[currentSlide]?.displayTime || 5

    intervalRef.current = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % currentSliders.length)
        setIsTransitioning(false)
      }, 500)
    }, currentDisplayTime * 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  useEffect(() => {
    startAutoSlide()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentSlide, currentSliders])

  const nextSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % currentSliders.length)
      setIsTransitioning(false)
    }, 500)
  }

  const prevSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + currentSliders.length) % currentSliders.length)
      setIsTransitioning(false)
    }, 500)
  }

  const getTransitionClass = (index: number) => {
    if (index !== currentSlide) return "opacity-0"

    const transition = currentSliders[currentSlide]?.transition || "fade"

    if (isTransitioning) {
      switch (transition) {
        case "fade":
          return "opacity-50"
        case "slide":
          return "opacity-50 translate-x-4"
        case "zoom":
          return "opacity-50 scale-95"
        default:
          return "opacity-50"
      }
    }

    return "opacity-100"
  }

  return (
    <Card className="overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pelanggan">Preview Pelanggan</TabsTrigger>
          <TabsTrigger value="karyawan">Preview Karyawan</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid md:grid-cols-2">
            {/* Slider */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              {currentSliders.map((slider, index) => (
                <div
                  key={slider.id}
                  className={`absolute inset-0 transition-all duration-500 ${getTransitionClass(index)}`}
                >
                  <Image
                    src={slider.preview || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                  />

                  {/* Teks overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <h3 className="text-xl font-bold">{slider.title}</h3>
                    <p className="text-sm opacity-90">{slider.description}</p>
                    {slider.ctaText && (
                      <div className="mt-2">
                        <a
                          href={slider.ctaLink}
                          className="px-3 py-1 bg-white text-black text-sm rounded-md inline-block"
                        >
                          {slider.ctaText}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Slider controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/20 text-white hover:bg-black/40"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/20 text-white hover:bg-black/40"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Dots indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {currentSliders.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-white w-4" : "bg-white/50"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>

            {/* Login form */}
            <CardContent className="flex items-center justify-center p-6">
              <div className="w-full max-w-sm space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Afindo</h2>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "pelanggan" ? "Login Pelanggan" : "Login Karyawan"}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Masukkan username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Masukkan password" />
                  </div>
                  <Button className="w-full">Login</Button>
                </div>

                {activeTab === "pelanggan" && (
                  <div className="text-center text-sm">
                    <a href="#" className="text-primary hover:underline">
                      Lupa password?
                    </a>
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
