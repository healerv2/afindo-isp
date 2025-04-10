"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export function ProfileInfoWaForm() {
  const [enabled, setEnabled] = useState(true)
  const [infoText, setInfoText] = useState(
    "Terima kasih telah melakukan pembayaran. Berikut adalah detail tagihan Anda:\n\nNama: {{nama}}\nPaket: {{paket}}\nPeriode: {{periode}}\nJumlah: {{jumlah}}\n\nUntuk informasi lebih lanjut, silakan hubungi kami di 081234567890.",
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      enabled,
      infoText,
    })
    alert("Teks Info WA berhasil diperbarui!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Teks Info WA</CardTitle>
          <CardDescription>Atur teks informasi yang akan dikirimkan melalui WhatsApp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="info-wa-enabled" className="font-medium">
              Aktifkan Info WA
            </Label>
            <Switch id="info-wa-enabled" checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <div className="space-y-2">
              <Label htmlFor="info-text">Info Teks</Label>
              <Textarea
                id="info-text"
                value={infoText}
                onChange={(e) => setInfoText(e.target.value)}
                rows={8}
                placeholder="Masukkan teks informasi yang akan dikirimkan melalui WhatsApp"
                required={enabled}
              />
              <p className="text-sm text-muted-foreground">
                Anda dapat menggunakan variabel berikut: <code>{`{{nama}}`}</code>, <code>{`{{paket}}`}</code>,{" "}
                <code>{`{{periode}}`}</code>, <code>{`{{jumlah}}`}</code>. Variabel akan diganti dengan data pelanggan
                yang sesuai.
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
