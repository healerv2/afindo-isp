"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Check, Clock, X } from "lucide-react"

export function WithdrawNotification() {
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Penarikan Saldo Berhasil",
      description: "Penarikan saldo sebesar Rp 1.000.000 telah berhasil dikirim ke rekening BCA Anda.",
      time: "Baru saja",
      isNew: true,
      type: "success",
    },
    {
      id: "notif-2",
      title: "Penarikan Saldo Diproses",
      description: "Penarikan saldo sebesar Rp 500.000 sedang diproses dan akan dikirim dalam 24 jam kerja.",
      time: "2 jam yang lalu",
      isNew: true,
      type: "processing",
    },
    {
      id: "notif-3",
      title: "Penarikan Saldo Gagal",
      description: "Penarikan saldo sebesar Rp 300.000 gagal. Silakan periksa rekening bank Anda dan coba lagi.",
      time: "1 hari yang lalu",
      isNew: false,
      type: "failed",
    },
  ])

  const markAsRead = (id) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, isNew: false } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, isNew: false })))
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "failed":
        return <X className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Notifikasi Penarikan</h2>
        {notifications.some((notif) => notif.isNew) && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead}>
            Tandai semua telah dibaca
          </Button>
        )}
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={notification.isNew ? "border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800" : ""}
            >
              <CardHeader className="pb-2 pt-4 flex flex-row items-start justify-between space-y-0">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div>
                    <CardTitle className="text-base flex items-center">
                      {notification.title}
                      {notification.isNew && <Badge className="ml-2 bg-blue-500">Baru</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-1">{notification.time}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm">{notification.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                {notification.isNew && (
                  <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                    Tandai telah dibaca
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Bell className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-1">Tidak ada notifikasi</h3>
          <p className="text-sm text-muted-foreground">
            Anda akan menerima notifikasi saat ada aktivitas penarikan saldo
          </p>
        </div>
      )}
    </div>
  )
}
