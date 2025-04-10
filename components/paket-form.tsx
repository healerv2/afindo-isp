"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface PaketFormProps {
  onSubmit: (data: any) => void
}

export function PaketForm({ onSubmit }: PaketFormProps) {
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [kecepatan, setKecepatan] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [status, setStatus] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Format harga
    const formattedHarga = harga.startsWith("Rp") ? harga : `Rp ${harga}`

    onSubmit({
      nama,
      harga: formattedHarga,
      kecepatan,
      deskripsi,
      status: status ? "Aktif" : "Tidak Aktif",
    })

    // Reset form
    setNama("")
    setHarga("")
    setKecepatan("")
    setDeskripsi("")
    setStatus(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Paket</Label>
        <Input
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama paket"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="harga">Harga</Label>
        <Input
          id="harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          placeholder="Masukkan harga paket"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kecepatan">Kecepatan</Label>
        <Input
          id="kecepatan"
          value={kecepatan}
          onChange={(e) => setKecepatan(e.target.value)}
          placeholder="Contoh: 10 Mbps"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea
          id="deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Masukkan deskripsi paket"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="status" className="font-medium">
          Status Aktif
        </Label>
        <Switch id="status" checked={status} onCheckedChange={setStatus} />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="submit">Simpan</Button>
      </div>
    </form>
  )
}
