"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileUpdateForm } from "@/components/profile-update-form"
import { ProfilePasswordForm } from "@/components/profile-password-form"
import { ProfileInfoPrintForm } from "@/components/profile-info-print-form"
import { ProfileInfoWaForm } from "@/components/profile-info-wa-form"
import { ProfileSupportByForm } from "@/components/profile-support-by-form"
import { ProfilePpnForm } from "@/components/profile-ppn-form"
import { ProfileSliderForm } from "@/components/profile-slider-form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"
import Image from "next/image"

export function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState("info")
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)

  const handleProfileImageChange = (file: File | null) => {
    setProfileImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProfileImagePreview(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan Profil</h2>
        <Button variant="outline">Kembali ke Dashboard</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar Profile */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10">
                <Image
                  src={profileImagePreview || "/placeholder.svg?height=128&width=128"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <FileUpload
                id="profile-image"
                accept="image/*"
                onChange={handleProfileImageChange}
                file={profileImage}
                placeholder="Ganti foto profil"
                className="w-full"
              />
              <div className="text-center">
                <h3 className="font-medium text-lg">Afindo</h3>
                <p className="text-sm text-muted-foreground">Administrator</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium">Navigasi Cepat</h3>
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("info")}>
                  Informasi Akun
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("password")}>
                  Keamanan
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("print")}>
                  Info Print
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("wa")}>
                  Teks Info WA
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("support")}>
                  Support By
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("ppn")}>
                  PPN
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("slider")}>
                  Slider
                </Button>
              </nav>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <Card className="p-4">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                <TabsTrigger value="info">Informasi Akun</TabsTrigger>
                <TabsTrigger value="password">Keamanan</TabsTrigger>
                <TabsTrigger value="print">Info Print</TabsTrigger>
                <TabsTrigger value="wa">Teks Info WA</TabsTrigger>
                <TabsTrigger value="support">Support By</TabsTrigger>
                <TabsTrigger value="ppn">PPN</TabsTrigger>
                <TabsTrigger value="slider">Slider</TabsTrigger>
              </TabsList>
            </Card>

            <TabsContent value="info" className="space-y-4 mt-6">
              <ProfileUpdateForm />
            </TabsContent>

            <TabsContent value="password" className="space-y-4 mt-6">
              <ProfilePasswordForm />
            </TabsContent>

            <TabsContent value="print" className="space-y-4 mt-6">
              <ProfileInfoPrintForm />
            </TabsContent>

            <TabsContent value="wa" className="space-y-4 mt-6">
              <ProfileInfoWaForm />
            </TabsContent>

            <TabsContent value="support" className="space-y-4 mt-6">
              <ProfileSupportByForm />
            </TabsContent>

            <TabsContent value="ppn" className="space-y-4 mt-6">
              <ProfilePpnForm />
            </TabsContent>

            <TabsContent value="slider" className="space-y-4 mt-6">
              <ProfileSliderForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
