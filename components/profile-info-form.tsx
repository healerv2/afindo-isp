"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileInfoForm() {
  const [namaLengkap, setNamaLengkap] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [nomorTelepon, setNomorTelepon] = useState("081234567890")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      namaLengkap,
      email,
      nomorTelepon,
    })
    alert("Profil berhasil diperbarui!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Informasi Akun</CardTitle>
          <CardDescription>Perbarui informasi akun Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama-lengkap">Nama Lengkap</Label>
            <Input id="nama-lengkap" value={namaLengkap} onChange={(e) => setNamaLengkap(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomor-telepon">Nomor Telepon</Label>
            <Input
              id="nomor-telepon"
              type="tel"
              value={nomorTelepon}
              onChange={(e) => setNomorTelepon(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Simpan</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
