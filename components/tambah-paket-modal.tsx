"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"

export function TambahPaketModal() {
  const [open, setOpen] = useState(false)
  const [nama, setNama] = useState("")
  const [harga, setHarga] = useState("")
  const [kecepatan, setKecepatan] = useState("")
  const [deskripsi, setDeskripsi] = useState("")
  const [status, setStatus] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simpan data paket
    console.log({
      nama,
      harga,
      kecepatan,
      deskripsi,
      status: status ? "Aktif" : "Tidak Aktif",
    })

    // Reset form dan tutup modal
    setNama("")
    setHarga("")
    setKecepatan("")
    setDeskripsi("")
    setStatus(true)
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Tambah Paket
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Paket Baru</DialogTitle>
          </DialogHeader>
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
              <Label htmlFor="harga">Harga (Rp)</Label>
              <Input
                id="harga"
                type="number"
                value={harga}
                onChange={(e) => setHarga(e.target.value)}
                placeholder="Masukkan harga paket"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kecepatan">Kecepatan (Mbps)</Label>
              <Input
                id="kecepatan"
                type="number"
                value={kecepatan}
                onChange={(e) => setKecepatan(e.target.value)}
                placeholder="Masukkan kecepatan paket"
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
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="status" className="font-medium">
                Status Aktif
              </Label>
              <Switch id="status" checked={status} onCheckedChange={setStatus} />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
