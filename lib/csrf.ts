// Fungsi untuk mendapatkan CSRF token
export function getCsrfToken(): string {
  // Dalam implementasi sebenarnya, token akan diambil dari cookie yang ditetapkan oleh server
  // Untuk demo, kita akan menggunakan token statis atau generate sederhana
  let token = localStorage.getItem("csrfToken")

  if (!token) {
    // Generate token sederhana jika belum ada
    token = "csrf-" + Math.random().toString(36).substring(2)
    localStorage.setItem("csrfToken", token)
  }

  return token
}

// Fungsi untuk melakukan fetch dengan CSRF protection
export async function fetchWithCSRF(url: string, options: RequestInit = {}): Promise<Response> {
  const csrfToken = getCsrfToken()

  const headers = new Headers(options.headers || {})
  headers.append("X-CSRF-Token", csrfToken)

  return fetch(url, {
    ...options,
    headers,
  })
}

// Fungsi untuk memperbarui CSRF token secara berkala
export function setupCsrfRefresh(intervalMinutes = 30) {
  // Perbarui token setiap intervalMinutes
  const intervalMs = intervalMinutes * 60 * 1000

  setInterval(() => {
    const newToken = "csrf-" + Math.random().toString(36).substring(2)
    localStorage.setItem("csrfToken", newToken)
  }, intervalMs)
}
