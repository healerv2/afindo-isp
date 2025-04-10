"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Info, AlertTriangle } from "lucide-react"

export function NotifikasiDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("semua")

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Pembayaran baru",
      message: "Pelanggan A telah melakukan pembayaran sebesar Rp 350.000",
      read: false,
      time: "5 menit yang lalu",
      type: "success",
      category: "keuangan",
    },
    {
      id: 2,
      title: "Pelanggan baru",
      message: "Pelanggan B telah mendaftar dengan paket 20 Mbps",
      read: false,
      time: "30 menit yang lalu",
      type: "info",
      category: "pelanggan",
    },
    {
      id: 3,
      title: "Pengaduan masuk",
      message: "Pelanggan C melaporkan masalah koneksi di area Bandung Selatan",
      read: false,
      time: "1 jam yang lalu",
      type: "warning",
      category: "pengaduan",
    },
    {
      id: 4,
      title: "Tagihan jatuh tempo",
      message: "10 pelanggan memiliki tagihan yang jatuh tempo hari ini",
      read: true,
      time: "3 jam yang lalu",
      type: "warning",
      category: "keuangan",
    },
    {
      id: 5,
      title: "Maintenance terjadwal",
      message: "Maintenance jaringan akan dilakukan besok pukul 01.00 - 03.00 WIB",
      read: true,
      time: "5 jam yang lalu",
      type: "info",
      category: "infra",
    },
    {
      id: 6,
      title: "Laporan bulanan",
      message: "Laporan keuangan bulan Maret telah tersedia",
      read: true,
      time: "1 hari yang lalu",
      type: "success",
      category: "keuangan",
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const deleteAllNotifications = () => {
    setNotifications([])
  }

  const filteredNotifications =
    activeTab === "semua"
      ? notifications
      : activeTab === "belum-dibaca"
        ? notifications.filter((notif) => !notif.read)
        : notifications.filter((notif) => notif.category === activeTab)

  const unreadCount = notifications.filter((notif) => !notif.read).length

  return (
    <div className="flex h-screen bg-background">
      <Sidebar open={sidebarOpen} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <AppHeader
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          showMonthYearSelector={false}
          title="Notifikasi"
        />
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <h1 className="text-2xl font-bold">Notifikasi</h1>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount} belum dibaca
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button variant="outline" size="sm" onClick={markAllAsRead}>
                    Tandai semua dibaca
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button variant="outline" size="sm" onClick={deleteAllNotifications}>
                    Hapus semua
                  </Button>
                )}
              </div>
            </div>

            <Tabs defaultValue="semua" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="semua">Semua</TabsTrigger>
                <TabsTrigger value="belum-dibaca">Belum Dibaca</TabsTrigger>
                <TabsTrigger value="keuangan">Keuangan</TabsTrigger>
                <TabsTrigger value="pelanggan">Pelanggan</TabsTrigger>
                <TabsTrigger value="pengaduan">Pengaduan</TabsTrigger>
                <TabsTrigger value="infra">Infrastruktur</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-0">
                {filteredNotifications.length > 0 ? (
                  <div className="space-y-4">
                    {filteredNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border rounded-lg hover:bg-muted/50 ${!notif.read ? "bg-muted/30 border-l-4 border-l-primary" : ""}`}
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {notif.type === "success" ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : notif.type === "warning" ? (
                              <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <Info className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{notif.title}</h3>
                              <span className="text-xs text-muted-foreground">{notif.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                            <div className="flex justify-between items-center mt-2">
                              <Badge variant="outline" className="text-xs">
                                {notif.category === "keuangan"
                                  ? "Keuangan"
                                  : notif.category === "pelanggan"
                                    ? "Pelanggan"
                                    : notif.category === "pengaduan"
                                      ? "Pengaduan"
                                      : "Infrastruktur"}
                              </Badge>
                              <div className="flex gap-2">
                                {!notif.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7"
                                    onClick={() => markAsRead(notif.id)}
                                  >
                                    Tandai dibaca
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 text-destructive"
                                  onClick={() => deleteNotification(notif.id)}
                                >
                                  Hapus
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Tidak ada notifikasi</h3>
                    <p className="text-muted-foreground mt-1">
                      {activeTab === "semua"
                        ? "Anda belum memiliki notifikasi apapun"
                        : activeTab === "belum-dibaca"
                          ? "Semua notifikasi telah dibaca"
                          : `Anda belum memiliki notifikasi untuk kategori ${activeTab}`}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
