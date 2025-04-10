"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Fungsi untuk memvalidasi token dengan API
export async function validateToken(token: string): Promise<boolean> {
  try {
    // Dalam implementasi sebenarnya, ini akan memanggil API untuk memvalidasi token
    // Contoh implementasi sederhana untuk demo
    if (!token || token === "invalid") {
      return false
    }

    // Simulasi validasi token
    return true
  } catch (error) {
    console.error("Error validating token:", error)
    return false
  }
}

// Higher-order component untuk melindungi rute yang memerlukan autentikasi
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      // Verifikasi token
      const checkAuth = async () => {
        const token = localStorage.getItem("token")
        if (!token) {
          router.push("/login")
          return
        }

        // Validasi token
        const isValid = await validateToken(token)
        if (isValid) {
          setIsAuthenticated(true)
        } else {
          // Token tidak valid, hapus dari localStorage dan redirect ke login
          localStorage.removeItem("token")
          router.push("/login")
        }
        setIsLoading(false)
      }

      checkAuth()
    }, [router])

    // Tampilkan loading state saat memeriksa autentikasi
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )
    }

    // Jika sudah terautentikasi, render komponen
    if (isAuthenticated) {
      return <Component {...props} />
    }

    // Jika tidak terautentikasi dan tidak loading, tidak render apapun
    // (router.push akan mengarahkan ke halaman login)
    return null
  }
}

// Fungsi untuk login
export async function loginUser(
  username: string,
  password: string,
  role = "pelanggan",
): Promise<{ success: boolean; token?: string; message?: string }> {
  try {
    // Dalam implementasi sebenarnya, ini akan memanggil API untuk login
    // Contoh implementasi sederhana untuk demo

    // Simulasi validasi kredensial berdasarkan peran
    switch (role) {
      case "admin":
        if (username === "admin" && password === "admin123") {
          const token = "admin-token-" + Math.random().toString(36).substring(2)
          return { success: true, token }
        }
        break
      case "karyawan":
        if (username === "karyawan" && password === "karyawan123") {
          const token = "karyawan-token-" + Math.random().toString(36).substring(2)
          return { success: true, token }
        }
        break
      case "mitra":
        if (username === "mitra" && password === "mitra123") {
          const token = "mitra-token-" + Math.random().toString(36).substring(2)
          return { success: true, token }
        }
        break
      case "pelanggan":
        if (username === "pelanggan" && password === "pelanggan123") {
          const token = "pelanggan-token-" + Math.random().toString(36).substring(2)
          return { success: true, token }
        }
        break
      default:
        // Fallback untuk kompatibilitas
        if (username === "admin" && password === "password") {
          const token = "valid-token-" + Math.random().toString(36).substring(2)
          return { success: true, token }
        }
    }

    return { success: false, message: "Username atau password salah" }
  } catch (error) {
    console.error("Error during login:", error)
    return { success: false, message: "Terjadi kesalahan saat login" }
  }
}

// Fungsi untuk mendapatkan peran pengguna dari token
export async function getUserRole(token: string): Promise<string | null> {
  try {
    // Dalam implementasi sebenarnya, ini akan mendekode token atau memanggil API
    // Contoh implementasi sederhana untuk demo

    if (token.startsWith("admin-token-")) {
      return "admin"
    } else if (token.startsWith("karyawan-token-")) {
      return "karyawan"
    } else if (token.startsWith("mitra-token-")) {
      return "mitra"
    } else if (token.startsWith("pelanggan-token-")) {
      return "pelanggan"
    } else if (token.startsWith("valid-token-")) {
      // Fallback untuk kompatibilitas
      return "admin"
    }

    return null
  } catch (error) {
    console.error("Error getting user role:", error)
    return null
  }
}

// Fungsi untuk logout
export function logoutUser() {
  localStorage.removeItem("token")
  // Hapus semua data sesi lainnya jika ada
}
