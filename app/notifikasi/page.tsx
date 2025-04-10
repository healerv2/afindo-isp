import type { Metadata } from "next"
import { NotifikasiDashboard } from "@/components/notifikasi-dashboard"

export const metadata: Metadata = {
  title: "Notifikasi | Afindo Dashboard",
  description: "Kelola semua notifikasi Anda",
}

export default function NotifikasiPage() {
  return <NotifikasiDashboard />
}
