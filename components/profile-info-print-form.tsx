"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function ProfileInfoPrintForm() {
  const [enabled, setEnabled] = useState(true)
  const [infoText, setInfoText] = useState(
    "Terima kasih telah menggunakan layanan kami. Untuk informasi lebih lanjut, hubungi customer service kami di 081234567890.",
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      enabled,
      infoText,
    })
    alert("Info Print berhasil diperbarui!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Info Print</CardTitle>
          <CardDescription>Atur teks informasi yang akan ditampilkan pada cetakan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="info-print-enabled" className="font-medium">
              Aktifkan Info Print
            </Label>
            <Switch id="info-print-enabled" checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <div className="space-y-2">
              <Label htmlFor="info-text">Info Teks</Label>
              <Textarea
                id="info-text"
                value={infoText}
                onChange={(e) => setInfoText(e.target.value)}
                rows={5}
                placeholder="Masukkan teks informasi yang akan ditampilkan pada cetakan"
                required={enabled}
              />
              <p className="text-sm text-muted-foreground">
                Teks ini akan ditampilkan pada bagian bawah cetakan invoice atau kwitansi.
              </p>
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
