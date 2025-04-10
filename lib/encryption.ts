// Fungsi untuk mengenkripsi data sensitif
// Catatan: Dalam implementasi sebenarnya, enkripsi yang kuat harus dilakukan di server
// Ini hanya contoh sederhana untuk demo

// Fungsi untuk mengenkripsi teks
export function encryptData(data: string, key = "default-key"): string {
  if (!data) return ""

  // Implementasi enkripsi sederhana (tidak aman untuk produksi)
  // Dalam produksi, gunakan library enkripsi yang kuat seperti CryptoJS

  // Contoh enkripsi sangat sederhana (hanya untuk demo)
  const encoded = btoa(data)
  return encoded
}

// Fungsi untuk mendekripsi teks
export function decryptData(encryptedData: string, key = "default-key"): string {
  if (!encryptedData) return ""

  try {
    // Implementasi dekripsi sederhana (tidak aman untuk produksi)
    const decoded = atob(encryptedData)
    return decoded
  } catch (error) {
    console.error("Error decrypting data:", error)
    return ""
  }
}

// Fungsi untuk mengaburkan data sensitif (misalnya untuk logging)
export function maskSensitiveData(data: string, visibleChars = 4): string {
  if (!data || data.length <= visibleChars) return data

  const visiblePart = data.slice(-visibleChars)
  const maskedPart = "*".repeat(data.length - visibleChars)

  return maskedPart + visiblePart
}
