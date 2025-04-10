"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import { Building, FileText, Globe } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export function ProfilePerusahaanDashboard() {
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  // Dummy function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Data perusahaan berhasil disimpan")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Profil Perusahaan</h2>
      </div>

      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Informasi Dasar</span>
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Informasi Legal</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Branding</span>
          </TabsTrigger>
        </TabsList>

        {/* Informasi Dasar */}
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar Perusahaan</CardTitle>
              <CardDescription>
                Informasi dasar tentang perusahaan Anda yang akan ditampilkan di invoice dan laporan.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Nama Perusahaan</Label>
                    <Input id="company-name" placeholder="PT. Nama Perusahaan" defaultValue="PT. Afindo Network" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email Perusahaan</Label>
                    <Input
                      id="company-email"
                      type="email"
                      placeholder="info@perusahaan.com"
                      defaultValue="info@afindo.co.id"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Nomor Telepon</Label>
                    <Input id="company-phone" placeholder="021-1234567" defaultValue="021-7654321" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input
                      id="company-website"
                      placeholder="https://www.perusahaan.com"
                      defaultValue="https://www.afindo.co.id"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">Alamat</Label>
                  <Textarea
                    id="company-address"
                    placeholder="Jl. Nama Jalan No. 123, Kota"
                    defaultValue="Jl. Raya Bogor No. 99, Jakarta Timur"
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Simpan Perubahan</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Informasi Legal */}
        <TabsContent value="legal">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Legal</CardTitle>
              <CardDescription>Informasi legal perusahaan untuk keperluan perpajakan dan administrasi.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="npwp">NPWP</Label>
                    <Input id="npwp" placeholder="00.000.000.0-000.000" defaultValue="12.345.678.9-012.345" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siup">SIUP</Label>
                    <Input id="siup" placeholder="000/00/SIUP/TAHUN" defaultValue="123/45/SIUP/2022" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tdp">TDP</Label>
                    <Input id="tdp" placeholder="000000000000" defaultValue="123456789012" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank-account">Rekening Bank</Label>
                    <Input id="bank-account" placeholder="Bank - Nomor Rekening" defaultValue="BCA - 1234567890" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legal-address">Alamat Terdaftar (jika berbeda)</Label>
                  <Textarea id="legal-address" placeholder="Jl. Nama Jalan No. 123, Kota" rows={3} />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Simpan Perubahan</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding Perusahaan</CardTitle>
              <CardDescription>Atur logo dan elemen visual perusahaan Anda.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label>Logo Perusahaan</Label>
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                    <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      {logoPreview ? (
                        <img
                          src={logoPreview || "/placeholder.svg"}
                          alt="Logo Preview"
                          className="max-w-full max-h-full"
                        />
                      ) : (
                        <img
                          src="/placeholder.svg?height=160&width=160"
                          alt="Current Logo"
                          className="max-w-full max-h-full"
                        />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload logo perusahaan (format PNG atau JPG, ukuran maksimal 2MB)
                    </p>
                    <FileUpload />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Warna Utama</Label>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <div className="h-10 rounded-md bg-blue-600"></div>
                      <p className="text-xs text-center">Biru</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 rounded-md bg-green-600"></div>
                      <p className="text-xs text-center">Hijau</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 rounded-md bg-red-600"></div>
                      <p className="text-xs text-center">Merah</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 rounded-md bg-purple-600"></div>
                      <p className="text-xs text-center">Ungu</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-slogan">Slogan Perusahaan</Label>
                  <Input
                    id="company-slogan"
                    placeholder="Slogan perusahaan Anda"
                    defaultValue="Koneksi Cepat, Layanan Terpercaya"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit">Simpan Perubahan</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
