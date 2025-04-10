"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, CreditCard, FileText, Home, LifeBuoy, Menu, Package, Settings, Wifi, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function PortalPelangganSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  const routes = [
    {
      title: "Dashboard",
      href: "/portal-pelanggan",
      icon: Home,
      active: pathname === "/portal-pelanggan",
    },
    {
      title: "Tagihan & Pembayaran",
      href: "/portal-pelanggan/tagihan",
      icon: CreditCard,
      active: pathname === "/portal-pelanggan/tagihan",
    },
    {
      title: "Penggunaan Internet",
      href: "/portal-pelanggan/penggunaan",
      icon: Wifi,
      active: pathname === "/portal-pelanggan/penggunaan",
    },
    {
      title: "Paket Layanan",
      href: "/portal-pelanggan/paket",
      icon: Package,
      active: pathname === "/portal-pelanggan/paket",
    },
    {
      title: "Tiket Support",
      href: "/portal-pelanggan/tiket",
      icon: FileText,
      active: pathname === "/portal-pelanggan/tiket",
    },
    {
      title: "Riwayat Transaksi",
      href: "/portal-pelanggan/riwayat",
      icon: BarChart3,
      active: pathname === "/portal-pelanggan/riwayat",
    },
    {
      title: "Bantuan",
      href: "/portal-pelanggan/bantuan",
      icon: LifeBuoy,
      active: pathname === "/portal-pelanggan/bantuan",
    },
    {
      title: "Pengaturan",
      href: "/portal-pelanggan/pengaturan",
      icon: Settings,
      active: pathname === "/portal-pelanggan/pengaturan",
    },
  ]

  return (
    <>
      <div
        className={cn(
          "fixed inset-y-0 z-20 flex w-64 flex-col border-r bg-background transition-transform md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/portal-pelanggan" className="flex items-center gap-2">
            <img
              src="/placeholder.svg?height=30&width=30"
              alt="Logo"
              className="h-8 w-8 rounded-full border border-primary/20"
            />
            <span className="text-lg font-semibold">Portal Pelanggan</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Tutup sidebar</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="flex flex-col gap-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  route.active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-md bg-muted p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              AS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Ahmad Santoso</span>
              <span className="text-xs text-muted-foreground">ID: P-12345</span>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className={cn("fixed left-4 top-4 z-30 md:hidden", isOpen ? "hidden" : "flex")}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Buka sidebar</span>
      </Button>
    </>
  )
}
