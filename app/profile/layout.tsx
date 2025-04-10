"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { AppHeader } from "@/components/app-header"
import { useState } from "react"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Use the new AppHeader component */}
        <AppHeader
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          showMonthYearSelector={false}
          title="Profile"
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
