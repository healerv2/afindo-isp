export type AppRole = "admin" | "pelanggan" | "karyawan" | "mitra"

export function getAppRole(): AppRole {
  // Dalam pengembangan, gunakan environment variable
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_APP_ROLE) {
    return process.env.NEXT_PUBLIC_APP_ROLE as AppRole
  }

  // Dalam produksi, deteksi berdasarkan app ID atau hostname
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname

    // Deteksi berdasarkan hostname
    if (hostname.includes("admin.afindo.com")) return "admin"
    if (hostname.includes("pelanggan.afindo.com")) return "pelanggan"
    if (hostname.includes("karyawan.afindo.com")) return "karyawan"
    if (hostname.includes("mitra.afindo.com")) return "mitra"

    // Deteksi berdasarkan user agent (untuk aplikasi mobile)
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.includes("afindo admin")) return "admin"
    if (userAgent.includes("afindopel")) return "pelanggan"
    if (userAgent.includes("afindowan")) return "karyawan"
    if (userAgent.includes("afindotra")) return "mitra"
  }

  // Default ke pelanggan jika tidak dapat mendeteksi
  return "pelanggan"
}

export function useAppRole(): AppRole {
  return getAppRole()
}
