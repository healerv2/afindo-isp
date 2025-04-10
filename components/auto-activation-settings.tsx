"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export function AutoActivationSettings() {
  const [enabled, setEnabled] = useState(true)
  const [activationDelay, setActivationDelay] = useState(5)
  const [paymentThreshold, setPaymentThreshold] = useState(100)
  const [notifyCustomer, setNotifyCustomer] = useState(true)
  const [notifyStaff, setNotifyStaff] = useState(true)
  const [activationHours, setActivationHours] = useState<"all" | "business">("all")
  const [paymentMethods, setPaymentMethods] = useState({
    bank: true,
    ecommerce: true,
    manual: false,
  })
  const [advancedSettings, setAdvancedSettings] = useState(false)

  const handleSave = () => {
    // Simulasi penyimpanan pengaturan
    alert("Pengaturan berhasil disimpan!")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pengaturan Aktivasi Otomatis</h2>
          <p className="text-muted-foreground">
            Konfigurasi pengaktifan internet otomatis setelah pelanggan melakukan pembayaran
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="auto-activation" checked={enabled} onCheckedChange={setEnabled} />
          <Label htmlFor="auto-activation">
            {enabled ? (
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                Aktif
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-gray-100 text-gray-500 hover:bg-gray-100">
                Nonaktif
              </Badge>
            )}
          </Label>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
          <TabsTrigger value="payment">Pembayaran</TabsTrigger>
          <TabsTrigger value="advanced">Lanjutan</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum</CardTitle>
              <CardDescription>Konfigurasi dasar untuk aktivasi otomatis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="activation-delay">Delay Aktivasi (menit)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="activation-delay"
                    min={0}
                    max={30}
                    step={1}
                    value={[activationDelay]}
                    onValueChange={(value) => setActivationDelay(value[0])}
                    disabled={!enabled}
                    className="flex-1"
                  />
                  <div className="w-12 text-center">{activationDelay}</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Waktu tunggu setelah pembayaran sebelum internet diaktifkan
                </p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="payment-threshold">Threshold Pembayaran (%)</Label>
                <div className="flex items-center space-x-4">
                  <Slider
                    id="payment-threshold"
                    min={10}
                    max={100}
                    step={5}
                    value={[paymentThreshold]}
                    onValueChange={(value) => setPaymentThreshold(value[0])}
                    disabled={!enabled}
                    className="flex-1"
                  />
                  <div className="w-12 text-center">{paymentThreshold}%</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Persentase minimum dari total tunggakan yang harus dibayar untuk aktivasi otomatis
                </p>
              </div>

              <div className="space-y-1">
                <Label htmlFor="activation-hours">Jam Aktivasi</Label>
                <Select
                  value={activationHours}
                  onValueChange={(value) => setActivationHours(value as "all" | "business")}
                  disabled={!enabled}
                >
                  <SelectTrigger id="activation-hours">
                    <SelectValue placeholder="Pilih jam aktivasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">24 Jam (Kapan Saja)</SelectItem>
                    <SelectItem value="business">Jam Kerja (08:00 - 17:00)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Tentukan kapan aktivasi otomatis dapat dilakukan</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Sistem</CardTitle>
              <CardDescription>Status terkini sistem aktivasi otomatis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Status Sistem</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Aktivasi Hari Ini</span>
                  <span>12 pelanggan</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Waktu Respons Rata-rata</span>
                  <span>2.3 menit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tingkat Keberhasilan</span>
                  <span>98.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>Konfigurasi notifikasi untuk pelanggan dan staf</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="notify-customer"
                    checked={notifyCustomer}
                    onCheckedChange={(checked) => setNotifyCustomer(!!checked)}
                    disabled={!enabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="notify-customer" className="font-medium">
                      Notifikasi Pelanggan
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi ke pelanggan saat internet berhasil diaktifkan
                    </p>
                  </div>
                </div>

                {notifyCustomer && (
                  <div className="ml-7 space-y-3 border-l-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-wa" checked={true} disabled={!enabled} />
                      <Label htmlFor="notify-wa">WhatsApp</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-email" checked={true} disabled={!enabled} />
                      <Label htmlFor="notify-email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-sms" checked={false} disabled={!enabled} />
                      <Label htmlFor="notify-sms">SMS</Label>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="notify-staff"
                    checked={notifyStaff}
                    onCheckedChange={(checked) => setNotifyStaff(!!checked)}
                    disabled={!enabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="notify-staff" className="font-medium">
                      Notifikasi Staf
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Kirim notifikasi ke staf saat internet pelanggan diaktifkan
                    </p>
                  </div>
                </div>

                {notifyStaff && (
                  <div className="ml-7 space-y-3 border-l-2 pl-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-staff-dashboard" checked={true} disabled={!enabled} />
                      <Label htmlFor="notify-staff-dashboard">Dashboard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="notify-staff-email" checked={true} disabled={!enabled} />
                      <Label htmlFor="notify-staff-email">Email</Label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Notifikasi</CardTitle>
              <CardDescription>Kustomisasi pesan notifikasi</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer-template">Template Notifikasi Pelanggan</Label>
                <Textarea
                  id="customer-template"
                  placeholder="Template notifikasi untuk pelanggan"
                  disabled={!enabled || !notifyCustomer}
                  defaultValue="Yth. {nama_pelanggan}, internet Anda telah diaktifkan kembali setelah pembayaran berhasil pada {tanggal_pembayaran}. Terima kasih atas pembayaran Anda."
                />
                <p className="text-xs text-muted-foreground">
                  Variabel yang tersedia: {"{nama_pelanggan}"}, {"{tanggal_pembayaran}"}, {"{jumlah_pembayaran}"},
                  {"{nomor_invoice}"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="staff-template">Template Notifikasi Staf</Label>
                <Textarea
                  id="staff-template"
                  placeholder="Template notifikasi untuk staf"
                  disabled={!enabled || !notifyStaff}
                  defaultValue="Internet pelanggan {nama_pelanggan} (ID: {id_pelanggan}) telah diaktifkan otomatis setelah pembayaran sebesar {jumlah_pembayaran} pada {tanggal_pembayaran}."
                />
                <p className="text-xs text-muted-foreground">
                  Variabel yang tersedia: {"{nama_pelanggan}"}, {"{id_pelanggan}"}, {"{tanggal_pembayaran}"},
                  {"{jumlah_pembayaran}"}, {"{nomor_invoice}"}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metode Pembayaran</CardTitle>
              <CardDescription>Konfigurasi metode pembayaran yang didukung untuk aktivasi otomatis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="payment-bank"
                    checked={paymentMethods.bank}
                    onCheckedChange={(checked) => setPaymentMethods({ ...paymentMethods, bank: !!checked })}
                    disabled={!enabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="payment-bank" className="font-medium">
                      Transfer Bank
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Aktivasi otomatis untuk pembayaran melalui transfer bank
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="payment-ecommerce"
                    checked={paymentMethods.ecommerce}
                    onCheckedChange={(checked) => setPaymentMethods({ ...paymentMethods, ecommerce: !!checked })}
                    disabled={!enabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="payment-ecommerce" className="font-medium">
                      E-Commerce & E-Wallet
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Aktivasi otomatis untuk pembayaran melalui e-commerce dan e-wallet
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="payment-manual"
                    checked={paymentMethods.manual}
                    onCheckedChange={(checked) => setPaymentMethods({ ...paymentMethods, manual: !!checked })}
                    disabled={!enabled}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="payment-manual" className="font-medium">
                      Pembayaran Manual
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Aktivasi otomatis untuk pembayaran manual yang diinput oleh staf
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Penanganan Kasus Khusus</CardTitle>
              <CardDescription>Konfigurasi penanganan kasus pembayaran khusus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="partial-payment">Pembayaran Parsial</Label>
                <Select defaultValue="threshold" disabled={!enabled}>
                  <SelectTrigger id="partial-payment">
                    <SelectValue placeholder="Pilih penanganan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="threshold">Aktifkan jika mencapai threshold</SelectItem>
                    <SelectItem value="never">Jangan pernah aktifkan</SelectItem>
                    <SelectItem value="always">Selalu aktifkan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Cara menangani pembayaran sebagian dari total tunggakan</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="multiple-invoices">Multiple Tunggakan</Label>
                <Select defaultValue="oldest" disabled={!enabled}>
                  <SelectTrigger id="multiple-invoices">
                    <SelectValue placeholder="Pilih penanganan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oldest">Bayar tunggakan terlama dahulu</SelectItem>
                    <SelectItem value="newest">Bayar tunggakan terbaru dahulu</SelectItem>
                    <SelectItem value="proportional">Bayar proporsional ke semua tunggakan</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Cara menangani pelanggan dengan beberapa tunggakan</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overpayment">Pembayaran Berlebih</Label>
                <Select defaultValue="credit" disabled={!enabled}>
                  <SelectTrigger id="overpayment">
                    <SelectValue placeholder="Pilih penanganan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit">Simpan sebagai kredit</SelectItem>
                    <SelectItem value="refund">Kembalikan kelebihan</SelectItem>
                    <SelectItem value="next-bill">Gunakan untuk tagihan berikutnya</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Cara menangani pembayaran yang melebihi jumlah tagihan</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Pengaturan Lanjutan</CardTitle>
                <CardDescription>Konfigurasi teknis untuk pengguna tingkat lanjut</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="advanced-settings"
                  checked={advancedSettings}
                  onCheckedChange={setAdvancedSettings}
                  disabled={!enabled}
                />
                <Label htmlFor="advanced-settings">Aktifkan</Label>
              </div>
            </CardHeader>
            <CardContent className={`space-y-4 ${!advancedSettings ? "opacity-50" : ""}`}>
              <div className="space-y-2">
                <Label htmlFor="retry-attempts">Jumlah Percobaan Ulang</Label>
                <Input
                  id="retry-attempts"
                  type="number"
                  min={1}
                  max={10}
                  defaultValue={3}
                  disabled={!enabled || !advancedSettings}
                />
                <p className="text-sm text-muted-foreground">Jumlah percobaan ulang jika aktivasi gagal</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retry-delay">Delay Antar Percobaan (detik)</Label>
                <Input
                  id="retry-delay"
                  type="number"
                  min={5}
                  max={300}
                  defaultValue={30}
                  disabled={!enabled || !advancedSettings}
                />
                <p className="text-sm text-muted-foreground">Waktu tunggu antara percobaan aktivasi</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-timeout">API Timeout (detik)</Label>
                <Input
                  id="api-timeout"
                  type="number"
                  min={1}
                  max={60}
                  defaultValue={10}
                  disabled={!enabled || !advancedSettings}
                />
                <p className="text-sm text-muted-foreground">Batas waktu untuk API call ke perangkat jaringan</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="log-level">Level Log</Label>
                <Select defaultValue="info" disabled={!enabled || !advancedSettings}>
                  <SelectTrigger id="log-level">
                    <SelectValue placeholder="Pilih level log" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="trace">Trace</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Level detail untuk pencatatan log sistem</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="queue-size">Ukuran Antrian</Label>
                <Input
                  id="queue-size"
                  type="number"
                  min={10}
                  max={1000}
                  defaultValue={100}
                  disabled={!enabled || !advancedSettings}
                />
                <p className="text-sm text-muted-foreground">Jumlah maksimum permintaan aktivasi dalam antrian</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integrasi API</CardTitle>
              <CardDescription>Konfigurasi integrasi dengan sistem eksternal</CardDescription>
            </CardHeader>
            <CardContent className={`space-y-4 ${!advancedSettings ? "opacity-50" : ""}`}>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">URL Webhook Notifikasi Pembayaran</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  placeholder="https://example.com/payment-webhook"
                  defaultValue="https://api.afindo.com/webhooks/payment"
                  disabled={!enabled || !advancedSettings}
                />
                <p className="text-sm text-muted-foreground">
                  URL untuk menerima notifikasi pembayaran dari payment gateway
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex space-x-2">
                  <Input
                    id="api-key"
                    type="password"
                    value="••••••••••••••••••••••••••••••"
                    disabled={!enabled || !advancedSettings}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" disabled={!enabled || !advancedSettings}>
                    Regenerate
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">API key untuk autentikasi webhook</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Batal</Button>
        <Button onClick={handleSave}>Simpan Pengaturan</Button>
      </div>
    </div>
  )
}

function Textarea({ id, placeholder, disabled, defaultValue }: any) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      disabled={disabled}
      defaultValue={defaultValue}
      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  )
}
