// Implementasi rate limiting sederhana untuk mencegah brute force attack
// Catatan: Dalam implementasi sebenarnya, rate limiting harus dilakukan di server
// Ini hanya contoh sederhana untuk demo di sisi klien

interface RateLimitRecord {
  count: number
  timestamp: number
}

const rateLimitStore: Record<string, RateLimitRecord> = {}

// Fungsi untuk memeriksa rate limit
export function checkRateLimit(key: string, maxAttempts = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitStore[key]

  // Jika tidak ada record atau record sudah kedaluwarsa, buat record baru
  if (!record || now - record.timestamp > windowMs) {
    rateLimitStore[key] = {
      count: 1,
      timestamp: now,
    }
    return true
  }

  // Jika masih dalam window dan sudah melebihi batas, tolak
  if (record.count >= maxAttempts) {
    return false
  }

  // Jika masih dalam window dan belum melebihi batas, increment counter
  record.count++
  return true
}

// Fungsi untuk mendapatkan sisa waktu tunggu dalam milidetik
export function getRateLimitWaitTime(key: string, windowMs = 60000): number {
  const record = rateLimitStore[key]
  if (!record) return 0

  const now = Date.now()
  const elapsed = now - record.timestamp

  if (elapsed >= windowMs) return 0

  return windowMs - elapsed
}

// Fungsi untuk mereset rate limit
export function resetRateLimit(key: string): void {
  delete rateLimitStore[key]
}
