"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <Alert variant="destructive" className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <WifiOff className="h-4 w-4" />
      <AlertTitle>Tidak ada koneksi internet</AlertTitle>
      <AlertDescription>
        Beberapa fitur mungkin tidak berfungsi dengan baik. Silakan periksa koneksi internet Anda.
      </AlertDescription>
    </Alert>
  )
}
