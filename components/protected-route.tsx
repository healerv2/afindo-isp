"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { validateToken } from "@/lib/auth"
import { logWarn } from "@/lib/logging"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")

      if (!token) {
        logWarn("Unauthorized access attempt", { path: window.location.pathname })
        router.push("/login")
        return
      }

      try {
        const isValid = await validateToken(token)

        if (isValid) {
          setIsAuthenticated(true)
        } else {
          logWarn("Invalid token detected", { path: window.location.pathname })
          localStorage.removeItem("token")
          router.push("/login")
        }
      } catch (error) {
        console.error("Error validating token:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
