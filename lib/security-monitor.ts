// Sistem monitoring keamanan untuk mendeteksi aktivitas mencurigakan
// Catatan: Dalam implementasi sebenarnya, ini harus terintegrasi dengan backend
// Ini hanya contoh sederhana untuk demo

import { logWarn, logError } from "./logging"

interface SecurityEvent {
  type: string
  timestamp: number
  data: any
  severity: "low" | "medium" | "high" | "critical"
}

const securityEvents: SecurityEvent[] = []
const MAX_EVENTS = 100

// Fungsi untuk menambahkan event keamanan
export function addSecurityEvent(
  type: string,
  data: any,
  severity: "low" | "medium" | "high" | "critical" = "medium",
): void {
  const event: SecurityEvent = {
    type,
    timestamp: Date.now(),
    data,
    severity,
  }

  securityEvents.push(event)

  // Batasi jumlah event yang disimpan
  if (securityEvents.length > MAX_EVENTS) {
    securityEvents.shift()
  }

  // Log event berdasarkan severity
  if (severity === "critical" || severity === "high") {
    logError(`Security event: ${type}`, data)
  } else {
    logWarn(`Security event: ${type}`, data)
  }

  // Dalam implementasi sebenarnya, kirim notifikasi ke admin untuk event dengan severity tinggi
  if (severity === "critical") {
    // Contoh: kirim notifikasi ke admin
    console.error("CRITICAL SECURITY EVENT:", type, data)
  }
}

// Fungsi untuk mendapatkan semua event keamanan
export function getSecurityEvents(): SecurityEvent[] {
  return [...securityEvents]
}

// Fungsi untuk mendeteksi multiple login dari lokasi berbeda
export function detectMultipleLogins(userId: string, ipAddress: string, userAgent: string): boolean {
  // Dalam implementasi sebenarnya, ini akan memeriksa database untuk login dari lokasi berbeda
  // Ini hanya contoh sederhana

  // Simulasi deteksi
  const recentLogins = securityEvents.filter((event) => event.type === "user_login" && event.data.userId === userId)

  if (recentLogins.length > 0) {
    const lastLogin = recentLogins[recentLogins.length - 1]

    // Jika IP atau user agent berbeda, catat sebagai event keamanan
    if (lastLogin.data.ipAddress !== ipAddress || lastLogin.data.userAgent !== userAgent) {
      addSecurityEvent(
        "suspicious_login",
        {
          userId,
          currentIp: ipAddress,
          previousIp: lastLogin.data.ipAddress,
          currentUserAgent: userAgent,
          previousUserAgent: lastLogin.data.userAgent,
        },
        "high",
      )
      return true
    }
  }

  return false
}

// Fungsi untuk mendeteksi percobaan akses ke rute terlarang
export function detectUnauthorizedAccess(userId: string, route: string): void {
  // Dalam implementasi sebenarnya, ini akan memeriksa izin pengguna
  // Ini hanya contoh sederhana

  // Daftar rute yang memerlukan izin admin
  const adminRoutes = ["/admin", "/settings", "/users/manage"]

  // Jika pengguna mencoba mengakses rute admin tanpa izin
  if (adminRoutes.some((r) => route.startsWith(r)) && userId !== "admin") {
    addSecurityEvent("unauthorized_access_attempt", { userId, route }, "high")
  }
}

// Fungsi untuk mendeteksi aktivitas mencurigakan lainnya
export function detectSuspiciousActivity(data: any): boolean {
  // Dalam implementasi sebenarnya, ini akan menggunakan algoritma yang lebih kompleks
  // Ini hanya contoh sederhana

  // Contoh: deteksi percobaan SQL injection
  const sqlInjectionPatterns = ["'--", "OR 1=1", "DROP TABLE", "UNION SELECT"]

  // Periksa semua string dalam data
  const checkForSqlInjection = (obj: any): boolean => {
    if (typeof obj === "string") {
      return sqlInjectionPatterns.some((pattern) => obj.toUpperCase().includes(pattern))
    }

    if (typeof obj === "object" && obj !== null) {
      return Object.values(obj).some((value) => checkForSqlInjection(value))
    }

    return false
  }

  if (checkForSqlInjection(data)) {
    addSecurityEvent("possible_sql_injection", { data }, "critical")
    return true
  }

  return false
}
