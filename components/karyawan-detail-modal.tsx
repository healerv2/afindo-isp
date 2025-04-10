"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface KaryawanDetailModalProps {
  isOpen: boolean
  onClose: () => void
  karyawan: any
}

export function KaryawanDetailModal({ isOpen, onClose, karyawan }: KaryawanDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Karyawan</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="info">Informasi Pribadi</TabsTrigger>
            <TabsTrigger value="pekerjaan">Data Pekerjaan</TabsTrigger>
            <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
            <TabsTrigger value="riwayat">Riwayat</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={karyawan?.foto || "/placeholder.svg?height=128&width=128"}
                      alt={karyawan?.nama || "Foto Karyawan"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Nama Lengkap</Label>
                  <Input value={karyawan?.nama || "John Doe"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>NIK</Label>
                  <Input value={karyawan?.nik || "3201234567890001"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Tempat, Tanggal Lahir</Label>
                  <Input value={karyawan?.tempatTanggalLahir || "Jakarta, 15 Januari 1990"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Jenis Kelamin</Label>
                  <Input value={karyawan?.jenisKelamin || "Laki-laki"} readOnly />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Alamat</Label>
                  <Textarea value={karyawan?.alamat || "Jl. Contoh No. 123, Jakarta Selatan"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>No. Telepon</Label>
                  <Input value={karyawan?.noTelepon || "081234567890"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input value={karyawan?.email || "johndoe@example.com"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Status Pernikahan</Label>
                  <Input value={karyawan?.statusPernikahan || "Menikah"} readOnly />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pekerjaan" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Posisi</Label>
                  <Input value={karyawan?.posisi || "Teknisi Lapangan"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Departemen</Label>
                  <Input value={karyawan?.departemen || "Teknis"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Tanggal Masuk</Label>
                  <Input value={karyawan?.tanggalMasuk || "01 Maret 2020"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Status Karyawan</Label>
                  <Input value={karyawan?.statusKaryawan || "Karyawan Tetap"} readOnly />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Gaji Pokok</Label>
                  <Input value={karyawan?.gajiPokok || "Rp 4.500.000"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>No. Rekening</Label>
                  <Input value={karyawan?.noRekening || "1234567890"} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Bank</Label>
                  <Input value={karyawan?.bank || "Bank XYZ"} readOnly />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dokumen" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Dokumen Identitas</h3>
                <div className="space-y-2">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">KTP</p>
                        <p className="text-sm text-muted-foreground">Uploaded on 15 Mar 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">NPWP</p>
                        <p className="text-sm text-muted-foreground">Uploaded on 15 Mar 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Dokumen Pendukung</h3>
                <div className="space-y-2">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">CV</p>
                        <p className="text-sm text-muted-foreground">Uploaded on 15 Mar 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Kontrak Kerja</p>
                        <p className="text-sm text-muted-foreground">Uploaded on 15 Mar 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="riwayat" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">Riwayat Kehadiran</h3>
              <div className="border rounded-md p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">April 2023</p>
                    <p>22/22 hari</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Maret 2023</p>
                    <p>21/23 hari</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Februari 2023</p>
                    <p>20/20 hari</p>
                  </div>
                </div>
              </div>

              <h3 className="font-medium">Riwayat Gaji</h3>
              <div className="border rounded-md p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">April 2023</p>
                    <p>Rp 4.500.000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Maret 2023</p>
                    <p>Rp 4.500.000</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Februari 2023</p>
                    <p>Rp 4.500.000</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
          <Button>Edit Data</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
