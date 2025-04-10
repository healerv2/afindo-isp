"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Clock, CreditCard, Search, X } from "lucide-react"

interface PaymentData {
  id: string
  pelangganId: string
  pelangganNama: string
  jumlah: string
  tanggal: string
  metode: string
  status: "pending" | "verified" | "failed" | "processing"
  aktivasi: "pending" | "success" | "failed" | null
}

export function PaymentVerification() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(null)
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle")
  const [activationStatus, setActivationStatus] = useState<"idle" | "activating" | "success" | "error">("idle")

  // Dummy data untuk pembayaran
  const payments: PaymentData[] = [
    {
      id: "PAY123456",
      pelangganId: "A001",
      pelangganNama: "PT Maju Jaya",
      jumlah: "Rp 2.500.000",
      tanggal: "15 Jan 2025 14:30",
      metode: "Transfer Bank",
      status: "pending",
      aktivasi: null,
    },
    {
      id: "PAY123457",
      pelangganId: "A002",
      pelangganNama: "CV Sentosa",
      jumlah: "Rp 1.800.000",
      tanggal: "15 Jan 2025 13:45",
      metode: "E-Wallet",
      status: "verified",
      aktivasi: "pending",
    },
    {
      id: "PAY123458",
      pelangganId: "I001",
      pelangganNama: "CV Mandiri",
      jumlah: "Rp 1.800.000",
      tanggal: "15 Jan 2025 12:15",
      metode: "Transfer Bank",
      status: "verified",
      aktivasi: "processing",
    },
    {
      id: "PAY123459",
      pelangganId: "I002",
      pelangganNama: "Toko Elektronik",
      jumlah: "Rp 750.000",
      tanggal: "15 Jan 2025 11:20",
      metode: "E-Commerce",
      status: "verified",
      aktivasi: "success",
    },
    {
      id: "PAY123460",
      pelangganId: "I003",
      pelangganNama: "Bengkel Motor",
      jumlah: "Rp 1.800.000",
      tanggal: "15 Jan 2025 10:05",
      metode: "Transfer Bank",
      status: "failed",
      aktivasi: null,
    },
  ]

  // Filter pembayaran berdasarkan pencarian
  const filteredPayments = payments.filter(
    (payment) =>
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.pelangganId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.pelangganNama.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Mengelompokkan pembayaran berdasarkan status
  const pendingPayments = filteredPayments.filter((p) => p.status === "pending")
  const verifiedPayments = filteredPayments.filter((p) => p.status === "verified")
  const failedPayments = filteredPayments.filter((p) => p.status === "failed")

  // Simulasi verifikasi pembayaran
  const handleVerify = async () => {
    if (!selectedPayment) return

    setVerificationStatus("verifying")

    // Simulasi proses verifikasi
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setVerificationStatus("success")

    // Update status pembayaran
    const updatedPayment = { ...selectedPayment, status: "verified" as const, aktivasi: "pending" as const }
    setSelectedPayment(updatedPayment)
  }

  // Simulasi aktivasi internet
  const handleActivate = async () => {
    if (!selectedPayment) return

    setActivationStatus("activating")

    // Simulasi proses aktivasi
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setActivationStatus("success")

    // Update status aktivasi
    const updatedPayment = { ...selectedPayment, aktivasi: "success" as const }
    setSelectedPayment(updatedPayment)
  }

  // Render status badge
  const renderStatusBadge = (status: PaymentData["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            <Clock className="mr-1 h-3 w-3" /> Menunggu Verifikasi
          </Badge>
        )
      case "verified":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Terverifikasi
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <X className="mr-1 h-3 w-3" /> Gagal
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Clock className="mr-1 h-3 w-3" /> Memproses
          </Badge>
        )
      default:
        return null
    }
  }

  // Render activation status badge
  const renderActivationBadge = (status: PaymentData["aktivasi"]) => {
    if (!status) return null

    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
            <Clock className="mr-1 h-3 w-3" /> Menunggu Aktivasi
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            <Clock className="mr-1 h-3 w-3" /> Aktivasi Sedang Berjalan
          </Badge>
        )
      case "success":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Internet Aktif
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <X className="mr-1 h-3 w-3" /> Aktivasi Gagal
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Verifikasi Pembayaran</h2>
        <p className="text-muted-foreground">Verifikasi pembayaran pelanggan dan aktifkan internet secara otomatis</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari ID pembayaran atau pelanggan..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                Menunggu <Badge variant="secondary">{pendingPayments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="verified" className="flex items-center gap-2">
                Terverifikasi <Badge variant="secondary">{verifiedPayments.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="failed" className="flex items-center gap-2">
                Gagal <Badge variant="secondary">{failedPayments.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingPayments.length > 0 ? (
                pendingPayments.map((payment) => (
                  <Card
                    key={payment.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPayment?.id === payment.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{payment.pelangganNama}</CardTitle>
                        {renderStatusBadge(payment.status)}
                      </div>
                      <CardDescription>ID: {payment.pelangganId}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ID Pembayaran:</span>
                        <span>{payment.id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Jumlah:</span>
                        <span className="font-medium">{payment.jumlah}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tanggal:</span>
                        <span>{payment.tanggal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Metode:</span>
                        <span>{payment.metode}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">Tidak ada pembayaran menunggu</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Semua pembayaran telah diverifikasi</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="verified" className="space-y-4">
              {verifiedPayments.length > 0 ? (
                verifiedPayments.map((payment) => (
                  <Card
                    key={payment.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPayment?.id === payment.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{payment.pelangganNama}</CardTitle>
                        {renderStatusBadge(payment.status)}
                      </div>
                      <CardDescription>ID: {payment.pelangganId}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ID Pembayaran:</span>
                        <span>{payment.id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Jumlah:</span>
                        <span className="font-medium">{payment.jumlah}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tanggal:</span>
                        <span>{payment.tanggal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status Aktivasi:</span>
                        <span>{renderActivationBadge(payment.aktivasi)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">Tidak ada pembayaran terverifikasi</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Belum ada pembayaran yang diverifikasi</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="failed" className="space-y-4">
              {failedPayments.length > 0 ? (
                failedPayments.map((payment) => (
                  <Card
                    key={payment.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPayment?.id === payment.id ? "border-primary" : ""
                    }`}
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{payment.pelangganNama}</CardTitle>
                        {renderStatusBadge(payment.status)}
                      </div>
                      <CardDescription>ID: {payment.pelangganId}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">ID Pembayaran:</span>
                        <span>{payment.id}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Jumlah:</span>
                        <span className="font-medium">{payment.jumlah}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tanggal:</span>
                        <span>{payment.tanggal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Alasan:</span>
                        <span className="text-red-600">Pembayaran tidak valid</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <h3 className="text-lg font-medium">Tidak ada pembayaran gagal</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Semua pembayaran berhasil diproses</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div>
          {selectedPayment ? (
            <Card>
              <CardHeader>
                <CardTitle>Detail Pembayaran</CardTitle>
                <CardDescription>Informasi lengkap pembayaran dan status aktivasi internet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ID Pembayaran</p>
                      <p className="text-sm">{selectedPayment.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status</p>
                      <div className="text-sm">{renderStatusBadge(selectedPayment.status)}</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pelanggan</p>
                      <p className="text-sm">{selectedPayment.pelangganNama}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">ID Pelanggan</p>
                      <p className="text-sm">{selectedPayment.pelangganId}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Jumlah</p>
                      <p className="text-sm font-medium">{selectedPayment.jumlah}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Metode</p>
                      <p className="text-sm">{selectedPayment.metode}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tanggal</p>
                      <p className="text-sm">{selectedPayment.tanggal}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Status Aktivasi</p>
                      <div className="text-sm">{renderActivationBadge(selectedPayment.aktivasi)}</div>
                    </div>
                  </div>
                </div>

                {selectedPayment.status === "pending" && (
                  <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600" />
                      <div>
                        <h4 className="text-sm font-medium text-yellow-800">Pembayaran Menunggu Verifikasi</h4>
                        <p className="mt-1 text-sm text-yellow-700">
                          Pembayaran ini perlu diverifikasi sebelum internet pelanggan dapat diaktifkan kembali.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment.status === "verified" && selectedPayment.aktivasi === "pending" && (
                  <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="mt-0.5 h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-800">Pembayaran Terverifikasi</h4>
                        <p className="mt-1 text-sm text-blue-700">
                          Pembayaran telah terverifikasi. Internet pelanggan siap untuk diaktifkan kembali.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment.aktivasi === "success" && (
                  <div className="rounded-md border border-green-200 bg-green-50 p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="text-sm font-medium text-green-800">Internet Telah Aktif</h4>
                        <p className="mt-1 text-sm text-green-700">
                          Internet pelanggan telah berhasil diaktifkan kembali setelah pembayaran.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedPayment.status === "failed" && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-4">
                    <div className="flex items-start gap-3">
                      <X className="mt-0.5 h-5 w-5 text-red-600" />
                      <div>
                        <h4 className="text-sm font-medium text-red-800">Pembayaran Gagal</h4>
                        <p className="mt-1 text-sm text-red-700">
                          Pembayaran ini gagal diverifikasi. Silakan hubungi pelanggan untuk informasi lebih lanjut.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                  Kembali
                </Button>
                <div className="space-x-2">
                  {selectedPayment.status === "pending" && (
                    <Button onClick={handleVerify} disabled={verificationStatus === "verifying"}>
                      {verificationStatus === "verifying" ? (
                        <>
                          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                          Memverifikasi...
                        </>
                      ) : (
                        "Verifikasi Pembayaran"
                      )}
                    </Button>
                  )}
                  {selectedPayment.status === "verified" && selectedPayment.aktivasi === "pending" && (
                    <Button onClick={handleActivate} disabled={activationStatus === "activating"}>
                      {activationStatus === "activating" ? (
                        <>
                          <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                          Mengaktifkan...
                        </>
                      ) : (
                        "Aktifkan Internet"
                      )}
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Detail Pembayaran</CardTitle>
                <CardDescription>
                  Pilih pembayaran dari daftar untuk melihat detail dan mengelola aktivasi internet
                </CardDescription>
              </CardHeader>
              <CardContent className="flex h-[400px] items-center justify-center">
                <div className="text-center">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">Tidak ada pembayaran yang dipilih</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Pilih pembayaran dari daftar di sebelah kiri untuk melihat detail
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
