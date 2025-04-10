"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { FileUpload } from "@/components/file-upload"
import { Textarea } from "@/components/ui/textarea"

export function KeuanganPengaturan() {
  const [xenditEnabled, setXenditEnabled] = useState(false)
  const [midtransEnabled, setMidtransEnabled] = useState(false)
  const [qrCodeFile, setQrCodeFile] = useState<File | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight">Pengaturan Keuangan</h2>
        <p className="text-muted-foreground">Konfigurasi integrasi pembayaran dan notifikasi</p>
      </div>

      <Tabs defaultValue="payment-gateway" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment-gateway">Payment Gateway</TabsTrigger>
          <TabsTrigger value="rekening">Rekening Bank</TabsTrigger>
          <TabsTrigger value="notifikasi">Notifikasi</TabsTrigger>
        </TabsList>

        <TabsContent value="payment-gateway" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Xendit</CardTitle>
              <CardDescription>Integrasi dengan Xendit untuk menerima pembayaran online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="xendit-enabled" className="font-medium">
                  Aktifkan Xendit
                </Label>
                <Switch id="xendit-enabled" checked={xenditEnabled} onCheckedChange={setXenditEnabled} />
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="xendit-api-key">API Key</Label>
                  <Input id="xendit-api-key" placeholder="xnd_development_..." disabled={!xenditEnabled} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="xendit-secret-key">Secret Key</Label>
                  <Input
                    id="xendit-secret-key"
                    type="password"
                    placeholder="••••••••••••••••••••••"
                    disabled={!xenditEnabled}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="xendit-callback-url">Callback URL</Label>
                  <Input
                    id="xendit-callback-url"
                    value="https://afindo.com/api/xendit/callback"
                    readOnly
                    disabled={!xenditEnabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    Salin URL ini ke dashboard Xendit Anda untuk mengatur webhook callback
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button disabled={!xenditEnabled}>Simpan Konfigurasi Xendit</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Midtrans</CardTitle>
              <CardDescription>Integrasi dengan Midtrans untuk menerima pembayaran online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="midtrans-enabled" className="font-medium">
                  Aktifkan Midtrans
                </Label>
                <Switch id="midtrans-enabled" checked={midtransEnabled} onCheckedChange={setMidtransEnabled} />
              </div>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="midtrans-client-key">Client Key</Label>
                  <Input id="midtrans-client-key" placeholder="SB-Mid-client-..." disabled={!midtransEnabled} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="midtrans-server-key">Server Key</Label>
                  <Input
                    id="midtrans-server-key"
                    type="password"
                    placeholder="••••••••••••••••••••••"
                    disabled={!midtransEnabled}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="midtrans-merchant-id">Merchant ID</Label>
                  <Input id="midtrans-merchant-id" placeholder="G123456789" disabled={!midtransEnabled} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="midtrans-callback-url">Callback URL</Label>
                  <Input
                    id="midtrans-callback-url"
                    value="https://afindo.com/api/midtrans/callback"
                    readOnly
                    disabled={!midtransEnabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    Salin URL ini ke dashboard Midtrans Anda untuk mengatur webhook callback
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button disabled={!midtransEnabled}>Simpan Konfigurasi Midtrans</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rekening" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rekening Bank</CardTitle>
              <CardDescription>Tambahkan rekening bank untuk menerima pembayaran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="bank-name">Nama Bank</Label>
                  <Input id="bank-name" placeholder="BCA, Mandiri, BNI, dll." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-number">Nomor Rekening</Label>
                  <Input id="account-number" placeholder="1234567890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="account-name">Nama Pemilik Rekening</Label>
                  <Input id="account-name" placeholder="PT Afindo Sukses Mandiri" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="branch">Cabang</Label>
                  <Input id="branch" placeholder="Jakarta Pusat" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="qr-code">QR Code Statis</Label>
                <FileUpload
                  id="qr-code"
                  accept="image/*"
                  onChange={setQrCodeFile}
                  file={qrCodeFile}
                  placeholder="Upload QR Code pembayaran statis"
                />
                <p className="text-xs text-muted-foreground">
                  Upload QR Code QRIS atau QR Code bank Anda untuk memudahkan pelanggan melakukan pembayaran
                </p>
              </div>

              <div className="flex justify-end">
                <Button>Tambah Rekening</Button>
              </div>

              <div className="mt-6 rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-medium">Bank</th>
                      <th className="px-4 py-2 text-left font-medium">Nomor Rekening</th>
                      <th className="px-4 py-2 text-left font-medium">Nama Pemilik</th>
                      <th className="px-4 py-2 text-left font-medium">QR Code</th>
                      <th className="px-4 py-2 text-left font-medium">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2">BCA</td>
                      <td className="px-4 py-2">1234567890</td>
                      <td className="px-4 py-2">PT Afindo Sukses Mandiri</td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm">
                          Lihat QR
                        </Button>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Mandiri</td>
                      <td className="px-4 py-2">0987654321</td>
                      <td className="px-4 py-2">PT Afindo Sukses Mandiri</td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm">
                          Lihat QR
                        </Button>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm">
                            Hapus
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifikasi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Konfigurasi notifikasi tagihan dan pembayaran</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifikasi WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi tagihan dan pembayaran melalui WhatsApp
                    </p>
                  </div>
                  <Switch id="whatsapp-enabled" defaultChecked />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="whatsapp-api-key">WhatsApp API Key</Label>
                  <Input id="whatsapp-api-key" placeholder="Masukkan API key WhatsApp Business API" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="whatsapp-template-tagihan">Template Pesan Tagihan</Label>
                  <Textarea
                    id="whatsapp-template-tagihan"
                    placeholder="Template pesan tagihan"
                    defaultValue="Yth. {{nama_pelanggan}}, tagihan internet Anda untuk periode {{periode}} sebesar {{jumlah_tagihan}} telah terbit. Silakan lakukan pembayaran sebelum {{tanggal_jatuh_tempo}}. Klik {{link_pembayaran}} untuk melakukan pembayaran. Terima kasih."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="whatsapp-template-pembayaran">Template Pesan Konfirmasi Pembayaran</Label>
                  <Textarea
                    id="whatsapp-template-pembayaran"
                    placeholder="Template pesan konfirmasi pembayaran"
                    defaultValue="Terima kasih {{nama_pelanggan}}, pembayaran tagihan internet Anda untuk periode {{periode}} sebesar {{jumlah_tagihan}} telah kami terima. Invoice dapat diakses melalui {{link_invoice}}. Terima kasih."
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifikasi Email</h3>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi tagihan dan pembayaran melalui Email
                    </p>
                  </div>
                  <Switch id="email-enabled" defaultChecked />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-sender">Email Pengirim</Label>
                  <Input id="email-sender" placeholder="billing@afindo.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-subject-tagihan">Subjek Email Tagihan</Label>
                  <Input
                    id="email-subject-tagihan"
                    placeholder="Subjek email tagihan"
                    defaultValue="[Afindo] Tagihan Internet Periode {{periode}}"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-template-tagihan">Template Email Tagihan</Label>
                  <Textarea
                    id="email-template-tagihan"
                    placeholder="Template email tagihan"
                    className="min-h-[100px]"
                    defaultValue="Yth. {{nama_pelanggan}},

Tagihan internet Anda untuk periode {{periode}} sebesar {{jumlah_tagihan}} telah terbit.
Silakan lakukan pembayaran sebelum {{tanggal_jatuh_tempo}}.

Klik {{link_pembayaran}} untuk melakukan pembayaran.

Terima kasih,
Tim Afindo"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-subject-pembayaran">Subjek Email Konfirmasi Pembayaran</Label>
                  <Input
                    id="email-subject-pembayaran"
                    placeholder="Subjek email konfirmasi pembayaran"
                    defaultValue="[Afindo] Konfirmasi Pembayaran Internet Periode {{periode}}"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-template-pembayaran">Template Email Konfirmasi Pembayaran</Label>
                  <Textarea
                    id="email-template-pembayaran"
                    placeholder="Template email konfirmasi pembayaran"
                    className="min-h-[100px]"
                    defaultValue="Yth. {{nama_pelanggan}},

Terima kasih, pembayaran tagihan internet Anda untuk periode {{periode}} sebesar {{jumlah_tagihan}} telah kami terima.

Invoice dapat diakses melalui {{link_invoice}}.

Terima kasih,
Tim Afindo"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Simpan Pengaturan Notifikasi</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
