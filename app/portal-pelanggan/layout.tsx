import type React from "react"
import { PortalPelangganHeader } from "@/components/portal-pelanggan/header"
import { PortalPelangganSidebar } from "@/components/portal-pelanggan/sidebar"

export default function PortalPelangganLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <PortalPelangganSidebar />
      <div className="flex-1">
        <PortalPelangganHeader />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
