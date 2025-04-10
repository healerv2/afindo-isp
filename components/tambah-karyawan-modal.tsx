"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"

interface TambahKaryawanModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TambahKaryawanModal({ isOpen, onClose }: TambahKaryawanModalProps) {
  const [formData, setFormData] = useState({
    nama: "",
    nik: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "",
    alamat: "",
    noTelepon: "",
    email: "",
    posisi: "",
    departemen: "",
    tanggalMasuk: "",
    statusKaryawan: "",
    gajiPokok: "",
    noRekening: "",
    bank: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Karyawan Baru</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Data Pribadi */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Pribadi</h3>

              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nik">NIK</Label>
                <Input id="nik" value={formData.nik} onChange={(e) => handleChange("nik", e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tempatLahir">Tempat Lahir</Label>
                <Input
                  id="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={(e) => handleChange("tempatLahir", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                <Input
                  id="tanggalLahir"
                  type="date"
                  value={formData.tanggalLahir}
                  onChange={(e) => handleChange("tanggalLahir", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                <Select value={formData.jenisKelamin} onValueChange={(value) => handleChange("jenisKelamin", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Textarea
                  id="alamat"
                  value={formData.alamat}
                  onChange={(e) => handleChange("alamat", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noTelepon">No. Telepon</Label>
                <Input
                  id="noTelepon"
                  value={formData.noTelepon}
                  onChange={(e) => handleChange("noTelepon", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Data Pekerjaan */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Data Pekerjaan</h3>

              <div className="space-y-2">
                <Label htmlFor="posisi">Posisi</Label>
                <Input
                  id="posisi"
                  value={formData.posisi}
                  onChange={(e) => handleChange("posisi", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="departemen">Departemen</Label>
                <Select value={formData.departemen} onValueChange={(value) => handleChange("departemen", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih departemen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teknis">Teknis</SelectItem>
                    <SelectItem value="administrasi">Administrasi</SelectItem>
                    <SelectItem value="keuangan">Keuangan</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggalMasuk">Tanggal Masuk</Label>
                <Input
                  id="tanggalMasuk"
                  type="date"
                  value={formData.tanggalMasuk}
                  onChange={(e) => handleChange("tanggalMasuk", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="statusKaryawan">Status Karyawan</Label>
                <Select
                  value={formData.statusKaryawan}
                  onValueChange={(value) => handleChange("statusKaryawan", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tetap">Karyawan Tetap</SelectItem>
                    <SelectItem value="kontrak">Karyawan Kontrak</SelectItem>
                    <SelectItem value="magang">Magang</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gajiPokok">Gaji Pokok</Label>
                <Input
                  id="gajiPokok"
                  type="number"
                  value={formData.gajiPokok}
                  onChange={(e) => handleChange("gajiPokok", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noRekening">No. Rekening</Label>
                <Input
                  id="noRekening"
                  value={formData.noRekening}
                  onChange={(e) => handleChange("noRekening", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank">Bank</Label>
                <Input id="bank" value={formData.bank} onChange={(e) => handleChange("bank", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Foto Karyawan</Label>
                <FileUpload />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
