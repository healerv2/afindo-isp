// Sistem logging sederhana untuk aktivitas pengguna dan error
// Catatan: Dalam implementasi sebenarnya, logging harus disimpan di server
// Ini hanya contoh sederhana untuk demo

enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

interface LogEntry {
  timestamp: number
  level: LogLevel
  message: string
  data?: any
  userId?: string
}

// Simpan log di localStorage untuk demo
const LOG_STORAGE_KEY = "app_logs"
const MAX_LOGS = 1000 // Batasi jumlah log yang disimpan

// Fungsi untuk menyimpan log
function storeLog(entry: LogEntry): void {
  try {
    // Ambil log yang sudah ada
    const existingLogsJson = localStorage.getItem(LOG_STORAGE_KEY) || "[]"
    const existingLogs: LogEntry[] = JSON.parse(existingLogsJson)

    // Tambahkan log baru
    existingLogs.push(entry)

    // Batasi jumlah log
    if (existingLogs.length > MAX_LOGS) {
      existingLogs.splice(0, existingLogs.length - MAX_LOGS)
    }

    // Simpan kembali ke localStorage
    localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(existingLogs))
  } catch (error) {
    console.error("Error storing log:", error)
  }
}

// Fungsi untuk membuat log
export function log(level: LogLevel, message: string, data?: any, userId?: string): void {
  const entry: LogEntry = {
    timestamp: Date.now(),
    level,
    message,
    data,
    userId,
  }

  // Simpan log
  storeLog(entry)

  // Juga log ke console untuk debugging
  switch (level) {
    case LogLevel.DEBUG:
      console.debug(message, data)
      break
    case LogLevel.INFO:
      console.info(message, data)
      break
    case LogLevel.WARN:
      console.warn(message, data)
      break
    case LogLevel.ERROR:
      console.error(message, data)
      break
  }

  // Dalam implementasi sebenarnya, kirim log ke server untuk analisis
}

// Helper functions
export const logDebug = (message: string, data?: any, userId?: string) => log(LogLevel.DEBUG, message, data, userId)
export const logInfo = (message: string, data?: any, userId?: string) => log(LogLevel.INFO, message, data, userId)
export const logWarn = (message: string, data?: any, userId?: string) => log(LogLevel.WARN, message, data, userId)
export const logError = (message: string, data?: any, userId?: string) => log(LogLevel.ERROR, message, data, userId)

// Fungsi untuk mendapatkan semua log
export function getLogs(): LogEntry[] {
  try {
    const logsJson = localStorage.getItem(LOG_STORAGE_KEY) || "[]"
    return JSON.parse(logsJson)
  } catch (error) {
    console.error("Error getting logs:", error)
    return []
  }
}

// Fungsi untuk menghapus semua log
export function clearLogs(): void {
  localStorage.removeItem(LOG_STORAGE_KEY)
}
