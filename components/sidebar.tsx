"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Users, CreditCard, Settings, LifeBuoy, ChevronLeft, ChevronRight } from "lucide-react"
import { useResponsive } from "@/hooks/use-responsive"

interface SidebarProps {
  className?: string
}

const mainNavItems = [
  {
    href: "/dashboard",
    title: "Dashboard",
    icon: BarChart3,
    active: true,
  },
  {
    href: "/customers",
    title: "Customers",
    icon: Users,
    active: false,
  },
  {
    href: "/billing",
    title: "Billing",
    icon: CreditCard,
    active: false,
  },
]

const utilityNavItems = [
  {
    href: "/settings",
    title: "Settings",
    icon: Settings,
    active: false,
  },
  {
    href: "/support",
    title: "Support",
    icon: LifeBuoy,
    active: false,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  const { isMobile } = useResponsive()

  // Otomatis collapse sidebar di mobile
  useEffect(() => {
    if (isMobile) {
      setExpanded(false)
    } else {
      setExpanded(true)
    }
  }, [isMobile])

  // Tambahkan toggle button untuk mobile
  const toggleSidebar = () => {
    setExpanded(!expanded)
  }

  return (
    <div
      className={cn(
        "pb-12 transition-all duration-300",
        expanded ? "w-64" : "w-20",
        isMobile && !expanded ? "absolute -left-20" : "",
        className,
      )}
    >
      <div className="space-y-4 py-4">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Logo"
              className="h-12 w-12 rounded-full border border-primary/20"
            />
            {expanded && <h2 className="ml-2 text-base font-semibold tracking-tight">Afindo ISP</h2>}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-accent"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
        <div className="px-3">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  item.active ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {expanded && <span>{item.title}</span>}
              </Link>
            ))}
          </div>
        </div>
        <div className="px-3">
          <h2 className={cn("mb-2 px-4 text-lg font-semibold tracking-tight", !expanded && "text-center")}>
            {expanded ? "Utilitas" : ""}
          </h2>
          <div className="space-y-1">
            {utilityNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  item.active ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {expanded && <span>{item.title}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
