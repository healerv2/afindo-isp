"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDownToLine, Calendar, Check, Clock, CreditCard, Search, X } from "lucide-react"

export function MitraWithdraw() {
  const [amount, setAmount] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("semua")
  const [withdrawSuccess, setWithdrawSuccess] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  // Data dummy untuk saldo mitra
  const saldoInfo = {
    total: "Rp 2.500.000",
    pending: "Rp 500.000",
    available: "Rp 2.000.000",
    bankAccounts: [
      {
        id: 1,
        bank: "BCA",
        accountNumber: "1234567890",
        accountName: "PT Mitra Sejahtera",
        isDefault: true,
      },
      {
        id: 2,
        bank: "Mandiri",
        accountNumber: "0987654321",
        accountName: "PT Mitra Sejahtera",
        isDefault: false,
      },
    ],
  }

  // Data dummy untuk riwayat penarikan
  const withdrawalHistory = [
    {
      id: "WD001",
      tanggal: "15 Jan 2023",
      jumlah: "Rp 1.000.000",
      bank: "BCA",
      noRekening: "1234567890",
      status: "Berhasil",
      waktuProses: "2 jam",
    },
    {
      id: "WD002",
      tanggal: "10 Jan 2023",
      jumlah: "Rp 500.000",
      bank: "BCA",
      noRekening: "1234567890",
      status: "Berhasil",
      waktuProses: "1 jam",
    },
    {
      id: "WD003",
      tanggal: "05 Jan 2023",
      jumlah: "Rp 750.000",
      bank: "Mandiri",
      noRekening: "0987654321",
      status: "Berhasil",
      waktuProses: "3 jam",
    },
    {
      id: "WD004",
      tanggal: "01 Jan 2023",
      jumlah: "Rp 300.000",
      bank: "BCA",
      noRekening: "1234567890",
      status: "Gagal",
      waktuProses: "-",
    },
  ]

  // Filter data berdasarkan pencarian dan status
  const filteredHistory = withdrawalHistory.filter((item) => {
    const matchSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.noRekening.includes(searchTerm)
    const matchStatus = filterStatus === "semua" || item.status === filterStatus
    return matchSearch && matchStatus
  })

  const handleWithdraw = () => {
    // Simulasi proses penarikan
    setTimeout(() => {
      setWithdrawSuccess(true)
      setTimeout(() => {
        setOpenDialog(false)
        setWithdrawSuccess(false)
        setAmount("")
      }, 2000)
    }, 1500)
  }

  const formatRupiah = (str) => {
    return str.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "")
    if (value === "") {
      setAmount("")
      return
    }
    setAmount(`Rp ${formatRupiah(value)}`)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{saldoInfo.total}</div>
            <p className="text-xs text-muted-foreground">Total pendapatan dari transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{saldoInfo.pending}</div>
            <p className="text-xs text-muted-foreground">Menunggu verifikasi (1-3 hari)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Saldo Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{saldoInfo.available}</div>
            <p className="text-xs text-muted-foreground">Siap untuk ditarik</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="withdraw" className="space-y-4">
        <TabsList>
          <TabsTrigger value="withdraw">Tarik Saldo</TabsTrigger>
          <TabsTrigger value="history">Riwayat Penarikan</TabsTrigger>
          <TabsTrigger value="accounts">Rekening Bank</TabsTrigger>
        </TabsList>

        <TabsContent value="withdraw" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tarik Saldo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Jumlah Penarikan</Label>
                <Input
                  id="amount"
                  placeholder="Rp 0"
                  value={amount}
                  onChange={handleAmountChange}
                  className="text-lg font-semibold"
                />
                <p className="text-xs text-muted-foreground">Minimum penarikan: Rp 50.000</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-account">Rekening Tujuan</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="bank-account">
                    <SelectValue placeholder="Pilih rekening" />
                  </SelectTrigger>
                  <SelectContent>
                    {saldoInfo.bankAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id.toString()}>
                        {account.bank} - {account.accountNumber} ({account.isDefault ? "Utama" : "Alternatif"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full mt-4" disabled={!amount || amount === "Rp 0"}>
                    <ArrowDownToLine className="mr-2 h-4 w-4" /> Tarik Saldo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{withdrawSuccess ? "Penarikan Berhasil" : "Konfirmasi Penarikan"}</DialogTitle>
                    <DialogDescription>
                      {withdrawSuccess
                        ? "Penarikan saldo Anda sedang diproses dan akan dikirim ke rekening tujuan."
                        : "Pastikan data penarikan saldo Anda sudah benar."}
                    </DialogDescription>
                  </DialogHeader>

                  {withdrawSuccess ? (
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="rounded-full bg-green-100 p-3 mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <p className="text-lg font-semibold mb-1">Penarikan Diproses</p>
                      <p className="text-sm text-center text-muted-foreground mb-4">
                        Dana akan ditransfer ke rekening BCA Anda dalam 1-24 jam kerja
                      </p>
                      <div className="bg-muted p-4 rounded-lg w-full mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Jumlah</span>
                          <span className="text-sm font-medium">{amount}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Bank</span>
                          <span className="text-sm font-medium">BCA</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rekening</span>
                          <span className="text-sm font-medium">1234567890</span>
                        </div>
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        ID Transaksi: WD
                        {Math.floor(Math.random() * 1000000)
                          .toString()
                          .padStart(6, "0")}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label>Jumlah Penarikan</Label>
                          <div className="text-lg font-semibold">{amount}</div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Rekening Tujuan</Label>
                          <div>BCA - 1234567890 (PT Mitra Sejahtera)</div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Estimasi Waktu</Label>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="mr-2 h-4 w-4" /> 1-24 jam kerja
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleWithdraw}>Konfirmasi Penarikan</Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informasi Penarikan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <h4 className="font-medium flex items-center mb-2">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" /> Waktu Proses
                </h4>
                <p className="text-sm text-muted-foreground">
                  Penarikan saldo diproses dalam 1-24 jam kerja (Senin-Jumat, 09.00-17.00 WIB).
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-medium flex items-center mb-2">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" /> Jadwal Penarikan
                </h4>
                <p className="text-sm text-muted-foreground">
                  Penarikan yang dilakukan pada hari libur atau di luar jam kerja akan diproses pada hari kerja
                  berikutnya.
                </p>
              </div>

              <div className="rounded-lg border p-4">
                <h4 className="font-medium flex items-center mb-2">
                  <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" /> Rekening Bank
                </h4>
                <p className="text-sm text-muted-foreground">
                  Pastikan rekening bank yang terdaftar sudah benar dan aktif. Penarikan hanya dapat dilakukan ke
                  rekening atas nama yang sama dengan akun mitra.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari riwayat penarikan..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Status</SelectItem>
                  <SelectItem value="Berhasil">Berhasil</SelectItem>
                  <SelectItem value="Diproses">Diproses</SelectItem>
                  <SelectItem value="Gagal">Gagal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>No. Rekening</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Waktu Proses</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.tanggal}</TableCell>
                      <TableCell>{item.jumlah}</TableCell>
                      <TableCell>{item.bank}</TableCell>
                      <TableCell>{item.noRekening}</TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            item.status === "Berhasil"
                              ? "bg-green-100 text-green-800"
                              : item.status === "Diproses"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.status}
                        </span>
                      </TableCell>
                      <TableCell>{item.waktuProses}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      Tidak ada data yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Rekening Bank</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">Tambah Rekening</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tambah Rekening Bank</DialogTitle>
                    <DialogDescription>Tambahkan rekening bank untuk penarikan saldo</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bank">Bank</Label>
                      <Select>
                        <SelectTrigger id="bank">
                          <SelectValue placeholder="Pilih bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bca">BCA</SelectItem>
                          <SelectItem value="mandiri">Mandiri</SelectItem>
                          <SelectItem value="bni">BNI</SelectItem>
                          <SelectItem value="bri">BRI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="account-number">Nomor Rekening</Label>
                      <Input id="account-number" placeholder="Masukkan nomor rekening" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="account-name">Nama Pemilik Rekening</Label>
                      <Input id="account-name" placeholder="Masukkan nama pemilik rekening" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Simpan</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {saldoInfo.bankAccounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium flex items-center">
                        {account.bank}
                        {account.isDefault && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Utama
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{account.accountNumber}</div>
                      <div className="text-sm">{account.accountName}</div>
                    </div>
                    <div className="flex space-x-2">
                      {!account.isDefault && (
                        <Button variant="outline" size="sm">
                          Jadikan Utama
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
