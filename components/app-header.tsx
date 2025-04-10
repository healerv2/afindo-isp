"use client"
import { Bell, ChevronDown, Menu, Search, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useState } from "react"

interface AppHeaderProps {
  sidebarOpen?: boolean
  toggleSidebar?: () => void
  showMonthYearSelector?: boolean
  currentMonth?: string
  setCurrentMonth?: (month: string) => void
  currentYear?: string
  setCurrentYear?: (year: string) => void
  onSearch?: (term: string) => void
  title?: string
}

export function AppHeader({
  sidebarOpen = false,
  toggleSidebar = () => {},
  showMonthYearSelector = true,
  currentMonth = "Januari",
  setCurrentMonth = () => {},
  currentYear = "2025",
  setCurrentYear = () => {},
  onSearch,
  title,
}: AppHeaderProps) {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ]

  const years = ["2025", "2024", "2023", "2022", "2021"]

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Pembayaran baru",
      message: "Pelanggan A telah melakukan pembayaran",
      read: false,
      time: "5 menit yang lalu",
      type: "success",
    },
    {
      id: 2,
      title: "Pelanggan baru",
      message: "Pelanggan B telah mendaftar",
      read: false,
      time: "30 menit yang lalu",
      type: "info",
    },
    {
      id: 3,
      title: "Pengaduan masuk",
      message: "Pelanggan C melaporkan masalah koneksi",
      read: false,
      time: "1 jam yang lalu",
      type: "warning",
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center">
        {toggleSidebar && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        )}
        <div className="hidden md:flex md:items-center md:mr-4">
          <div className="flex flex-col items-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Logo"
              className="h-10 w-10 rounded-full border border-primary/20"
            />
            <span className="text-xs font-medium mt-1">Afindo ISP</span>
          </div>
        </div>
        {title && <h1 className="text-xl font-semibold">{title}</h1>}
        {showMonthYearSelector && (
          <div className="flex items-center space-x-2 ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2">
                  <span className="text-sm font-medium">{currentMonth}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {months.map((month) => (
                  <DropdownMenuItem key={month} onClick={() => setCurrentMonth(month)}>
                    {month}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8 px-2">
                  <span className="text-sm font-medium">{currentYear}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {years.map((year) => (
                  <DropdownMenuItem key={year} onClick={() => setCurrentYear(year)}>
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-4">
        {onSearch && (
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari cepat..."
              className="w-[200px] pl-8 md:w-[300px] rounded-full bg-muted"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-background border rounded-md shadow-lg z-50">
              <div className="flex justify-between items-center p-3 border-b">
                <h3 className="font-medium">Notifikasi</h3>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-7">
                    Tandai semua dibaca
                  </Button>
                )}
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 border-b hover:bg-muted cursor-pointer ${!notif.read ? "bg-muted/50" : ""}`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex justify-between items-start">
                        <span
                          className={`w-2 h-2 mt-1 rounded-full ${
                            notif.type === "success"
                              ? "bg-green-500"
                              : notif.type === "warning"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        ></span>
                        <div className="flex-1 ml-2">
                          <p className="text-sm font-medium">{notif.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-muted-foreground">Tidak ada notifikasi</div>
                )}
              </div>

              <div className="p-2 border-t text-center">
                <Link href="/notifikasi" className="text-xs text-primary hover:underline">
                  Lihat semua notifikasi
                </Link>
              </div>
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile-perusahaan">Profile Perusahaan</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </header>
  )
}
