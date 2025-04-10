"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { loginUser } from "@/lib/auth"
import { checkRateLimit, getRateLimitWaitTime } from "@/lib/rate-limit"
import { logInfo, logWarn, logError } from "@/lib/logging"
import { sanitizeInput } from "@/lib/validation"
import { useAppRole } from "@/lib/app-role"

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

export default function LoginPage() {
  const searchParams = useSearchParams()
  const roleParam = searchParams.get("role")

  // Use role from URL parameter if available, otherwise use from environment
  const appRoleFromHook = useAppRole()
  const defaultAppRole = roleParam || appRoleFromHook
  const [activeTab, setActiveTab] = useState(defaultAppRole)
  const router = useRouter()

  // Set tab aktif berdasarkan jenis aplikasi atau parameter URL
  useEffect(() => {
    setActiveTab(defaultAppRole)
  }, [defaultAppRole])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Form state
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [waitTime, setWaitTime] = useState(0)

  // Rate limit countdown
  useEffect(() => {
    if (waitTime > 0) {
      const timer = setTimeout(() => {
        setWaitTime((prev) => Math.max(0, prev - 1000))
      }, 1000)

      return () => clearTimeout(timer)
    } else if (waitTime === 0 && isRateLimited) {
      setIsRateLimited(false)
    }
  }, [waitTime, isRateLimited])

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

  const mitraSliders: SliderItem[] = [
    {
      id: "m1",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Portal Mitra Afindo",
      description: "Kelola kerjasama dan pendapatan Anda dengan mudah",
      ctaText: "Pelajari Program Mitra",
      ctaLink: "#",
      transition: "fade",
      displayTime: 5,
    },
    {
      id: "m2",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Peluang Pendapatan",
      description: "Dapatkan komisi dari setiap pelanggan yang Anda referensikan",
      ctaText: "Lihat Skema Komisi",
      ctaLink: "#",
      transition: "slide",
      displayTime: 5,
    },
    {
      id: "m3",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Laporan Real-time",
      description: "Pantau pendapatan dan aktivitas mitra Anda kapan saja",
      ctaText: "Lihat Demo",
      ctaLink: "#",
      transition: "zoom",
      displayTime: 5,
    },
  ]

  const adminSliders: SliderItem[] = [
    {
      id: "a1",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Admin Dashboard Afindo",
      description: "Kontrol penuh atas seluruh sistem dan pengguna",
      ctaText: "Lihat Panduan Admin",
      ctaLink: "#",
      transition: "fade",
      displayTime: 5,
    },
    {
      id: "a2",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Keamanan Sistem",
      description: "Monitor aktivitas dan keamanan sistem secara real-time",
      ctaText: "Lihat Log Keamanan",
      ctaLink: "#",
      transition: "slide",
      displayTime: 5,
    },
    {
      id: "a3",
      preview: "/placeholder.svg?height=400&width=800",
      title: "Pengaturan Sistem",
      description: "Konfigurasi semua aspek sistem dari satu dashboard",
      ctaText: "Buka Pengaturan",
      ctaLink: "#",
      transition: "zoom",
      displayTime: 5,
    },
  ]

  const getCurrentSliders = () => {
    switch (activeTab) {
      case "pelanggan":
        return pelangganSliders
      case "karyawan":
        return karyawanSliders
      case "mitra":
        return mitraSliders
      case "admin":
        return adminSliders
      default:
        return pelangganSliders
    }
  }

  const currentSliders = getCurrentSliders()

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset error
    setError(null)

    // Sanitize inputs
    const sanitizedUsername = sanitizeInput(username)

    // Validate inputs
    if (!sanitizedUsername || !password) {
      setError("Username dan password harus diisi")
      return
    }

    // Check rate limiting
    const rateLimitKey = `login_${sanitizedUsername}`
    if (!checkRateLimit(rateLimitKey, 5, 60000)) {
      // 5 attempts per minute
      const waitTimeMs = getRateLimitWaitTime(rateLimitKey)
      setIsRateLimited(true)
      setWaitTime(waitTimeMs)
      setError(`Terlalu banyak percobaan login. Silakan coba lagi dalam ${Math.ceil(waitTimeMs / 1000)} detik.`)
      logWarn("Rate limit exceeded for login", { username: sanitizedUsername })
      return
    }

    try {
      setIsLoading(true)

      // Attempt login with user type
      const result = await loginUser(sanitizedUsername, password, activeTab)

      if (result.success && result.token) {
        // Store token and user role
        localStorage.setItem("token", result.token)
        localStorage.setItem("userRole", activeTab)

        // Log successful login
        logInfo("User logged in successfully", { username: sanitizedUsername, role: activeTab })

        // Redirect based on user role
        switch (activeTab) {
          case "admin":
            router.push("/dashboard")
            break
          case "karyawan":
            router.push("/dashboard")
            break
          case "mitra":
            router.push("/mitra")
            break
          case "pelanggan":
            router.push("/portal-pelanggan")
            break
          default:
            router.push("/")
        }
      } else {
        // Increment login attempts
        setLoginAttempts((prev) => prev + 1)

        // Set error message
        setError(result.message || "Login gagal. Periksa username dan password Anda.")

        // Log failed login attempt
        logWarn("Failed login attempt", {
          username: sanitizedUsername,
          role: activeTab,
          attempts: loginAttempts + 1,
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Terjadi kesalahan saat login. Silakan coba lagi.")

      // Log error
      logError("Login error", { username: sanitizedUsername, role: activeTab, error })
    } finally {
      setIsLoading(false)
    }
  }

  // Determine if we should show all tabs or just the specific role tab
  const showAllTabs = roleParam === "web" || (!roleParam && defaultAppRole === "web")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-4xl overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tampilkan semua tab jika parameter role=web atau tidak ada parameter dan default adalah web */}
          {showAllTabs ? (
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pelanggan">Login Pelanggan</TabsTrigger>
              <TabsTrigger value="karyawan">Login Karyawan</TabsTrigger>
              <TabsTrigger value="mitra">Login Mitra</TabsTrigger>
              <TabsTrigger value="admin">Login Admin</TabsTrigger>
            </TabsList>
          ) : (
            /* Tampilkan hanya tab yang sesuai dengan role */
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value={activeTab}>
                Login{" "}
                {activeTab === "pelanggan"
                  ? "Pelanggan"
                  : activeTab === "karyawan"
                    ? "Karyawan"
                    : activeTab === "mitra"
                      ? "Mitra"
                      : "Admin"}
              </TabsTrigger>
            </TabsList>
          )}

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
                <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                  <div className="text-center">
                    <div className="flex flex-col items-center justify-center mb-4">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Logo"
                        className="h-20 w-20 rounded-full border border-primary/20 mb-2"
                      />
                      <h2 className="text-2xl font-bold">Afindo ISP</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activeTab === "pelanggan"
                        ? "Login Pelanggan"
                        : activeTab === "karyawan"
                          ? "Login Karyawan"
                          : activeTab === "mitra"
                            ? "Login Mitra"
                            : "Login Admin"}
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="Masukkan username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading || isRateLimited}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Masukkan password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading || isRateLimited}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading || isRateLimited}>
                      {isLoading ? "Memproses..." : "Login"}
                    </Button>
                  </div>

                  {activeTab === "pelanggan" && (
                    <div className="text-center text-sm">
                      <a href="#" className="text-primary hover:underline">
                        Lupa password?
                      </a>
                    </div>
                  )}

                  {isRateLimited && waitTime > 0 && (
                    <div className="text-center text-sm text-muted-foreground">
                      Tunggu {Math.ceil(waitTime / 1000)} detik sebelum mencoba lagi
                    </div>
                  )}
                </form>
              </CardContent>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
