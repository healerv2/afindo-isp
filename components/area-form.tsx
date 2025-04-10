"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

interface AreaFormProps {
  onSubmit: (data: any) => void
}

export function AreaForm({ onSubmit }: AreaFormProps) {
  const [nama, setNama] = useState("")
  const [kode, setKode] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [status, setStatus] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit({
      nama,
      kode,
      deskripsi,
      status: status ? "Aktif" : "Tidak Aktif",
    })

    // Reset form
    setNama("")
    setKode("")
    setDeskripsi("")
    setStatus(true)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="nama">Nama Area</Label>
        <Input
          id="nama"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Masukkan nama area"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kode">Kode Area</Label>
        <Input
          id="kode"
          value={kode}
          onChange={(e) => setKode(e.target.value)}
          placeholder="Masukkan kode area"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deskripsi">Deskripsi</Label>
        <Textarea
          id="deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Masukkan deskripsi area"
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
