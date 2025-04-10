"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function ProfilePpnForm() {
  const [enabled, setEnabled] = useState(true)
  const [ppnPercentage, setPpnPercentage] = useState(11)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      enabled,
      ppnPercentage,
    })
    alert("Pengaturan PPN berhasil diperbarui!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Pengaturan PPN</CardTitle>
          <CardDescription>Atur persentase PPN yang akan dikenakan pada transaksi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="ppn-enabled" className="font-medium">
              Aktifkan PPN
            </Label>
            <Switch id="ppn-enabled" checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <div className="space-y-2">
              <Label htmlFor="ppn-percentage">Persentase PPN (%)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="ppn-percentage"
                  type="number"
                  min={0}
                  max={100}
                  value={ppnPercentage}
                  onChange={(e) => setPpnPercentage(Number(e.target.value))}
                  required={enabled}
                />
                <span className="text-sm font-medium">%</span>
              </div>
              <p className="text-sm text-muted-foreground">PPN akan ditambahkan ke total tagihan pelanggan.</p>
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
