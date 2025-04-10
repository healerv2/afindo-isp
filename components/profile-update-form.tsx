"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileUpdateForm() {
  const [username, setUsername] = useState("afindo")
  const [nickname, setNickname] = useState("Afindo")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      username,
      nickname,
    })
    alert("Profil berhasil diperbarui!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <CardDescription>Perbarui informasi profil akun Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input id="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} required />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Simpan</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
