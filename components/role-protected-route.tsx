"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { validateToken, getUserRole } from "@/lib/auth"
import { logWarn } from "@/lib/logging"

interface RoleProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: string[]
  redirectTo?: string
}

export function RoleProtectedRoute({ children, allowedRoles, redirectTo = "/login" }: RoleProtectedRouteProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        logWarn("Unauthorized access attempt", { path: window.location.pathname })
        router.push(redirectTo)
        return
      }

      try {
        // Validasi token
        const isValid = await validateToken(token)

        if (!isValid) {
          logWarn("Invalid token detected", { path: window.location.pathname })
          localStorage.removeItem("token")
          router.push(redirectTo)
          return
        }

        // Dapatkan peran pengguna
        const userRole = await getUserRole(token)

        if (userRole && allowedRoles.includes(userRole)) {
          setIsAuthorized(true)
        } else {
          logWarn("Unauthorized role access attempt", {
            path: window.location.pathname,
            userRole,
            requiredRoles: allowedRoles,
          })

          // Redirect ke halaman yang sesuai dengan peran pengguna
          if (userRole === "admin") {
            router.push("/dashboard")
          } else if (userRole === "karyawan") {
            router.push("/dashboard")
          } else if (userRole === "mitra") {
            router.push("/mitra")
          } else if (userRole === "pelanggan") {
            router.push("/portal-pelanggan")
          } else {
            router.push(redirectTo)
          }
        }
      } catch (error) {
        console.error("Error validating access:", error)
        router.push(redirectTo)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, allowedRoles, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}
