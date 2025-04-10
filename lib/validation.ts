// Fungsi untuk sanitasi input untuk mencegah XSS
export function sanitizeInput(input: string): string {
  if (!input) return ""

  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`/g, "&#96;")
}

// Fungsi untuk validasi email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Fungsi untuk validasi nomor telepon Indonesia
export function isValidPhoneNumber(phone: string): boolean {
  // Format: +62xxxxxxxxxx atau 08xxxxxxxxxx
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/
  return phoneRegex.test(phone)
}

// Fungsi untuk validasi password
export function isStrongPassword(password: string): boolean {
  // Minimal 8 karakter, harus mengandung huruf besar, huruf kecil, angka, dan karakter khusus
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// Fungsi untuk validasi form umum
export function validateForm(
  data: Record<string, any>,
  rules: Record<string, (value: any) => boolean | string>,
): Record<string, string> {
  const errors: Record<string, string> = {}

  for (const field in rules) {
    if (Object.prototype.hasOwnProperty.call(rules, field)) {
      const validator = rules[field]
      const value = data[field]

      const result = validator(value)

      if (typeof result === "string") {
        errors[field] = result
      } else if (result === false) {
        errors[field] = `Field ${field} tidak valid`
      }
    }
  }

  return errors
}
