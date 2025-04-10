"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function ProfileSupportByForm() {
  const [enabled, setEnabled] = useState(true)
  const [supportText, setSupportText] = useState("Supported by Buke Fiber")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      enabled,
      supportText,
    })
    alert("Teks Support By berhasil diperbarui!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Teks Support By</CardTitle>
          <CardDescription>Atur teks dukungan yang akan ditampilkan pada aplikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="support-by-enabled" className="font-medium">
              Aktifkan Teks Support By
            </Label>
            <Switch id="support-by-enabled" checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <div className="space-y-2">
              <Label htmlFor="support-text">Teks Support By</Label>
              <Input
                id="support-text"
                value={supportText}
                onChange={(e) => setSupportText(e.target.value)}
                placeholder="Masukkan teks dukungan"
                required={enabled}
              />
              <p className="text-sm text-muted-foreground">Teks ini akan ditampilkan pada bagian footer aplikasi.</p>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit">Simpan</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
