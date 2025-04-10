import { LoginSliderSettings } from "@/components/login-slider-settings"
import { LoginPreview } from "@/components/login-preview"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function LoginSettingsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1">
        <DashboardHeader
          onSearch={() => {}}
          onMonthChange={() => {}}
          onYearChange={() => {}}
          selectedMonth="April"
          selectedYear="2025"
        />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Pengaturan Halaman Login</h1>
            <p className="text-muted-foreground">Konfigurasi tampilan halaman login untuk pelanggan dan karyawan</p>
          </div>

          <div className="grid gap-6">
            <LoginSliderSettings />
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Preview Halaman Login</h2>
              <LoginPreview />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
