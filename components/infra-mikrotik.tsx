"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// Tambahkan import untuk komponen Dialog dan Alert
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, Eye, Pencil, Plus, Trash, RefreshCw } from "lucide-react"

export function InfraMikrotik() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  // Tambahkan state untuk dialog cek PPPoE dan hasil pengecekan
  const [showPPPoEDialog, setShowPPPoEDialog] = useState(false)
  const [checkingPPPoE, setCheckingPPPoE] = useState(false)
  const [pppoeSyncResults, setPPPoESyncResults] = useState<{
    unsyncedConnections: Array<{ id: string; username: string; source: "mikrotik" | "database" }>
    syncedCount: number
    total: number
  } | null>(null)
  const [mikrotikData, setMikrotikData] = useState([
    {
      id: "MK001",
      name: "Mikrotik Router 1",
      ip: "192.168.1.1",
      port: "8728",
      username: "mikrotik",
      password: "********",
      status: "Online",
    },
    {
      id: "MK002",
      name: "Mikrotik Router 2",
      ip: "192.168.1.2",
      port: "8728",
      username: "mikrotik",
      password: "********",
      status: "Online",
    },
    {
      id: "MK003",
      name: "Mikrotik Router 3",
      ip: "192.168.1.3",
      port: "8728",
      username: "mikrotik",
      password: "********",
      status: "Offline",
    },
  ])

  const handleAddMikrotik = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penambahan Mikrotik
    setShowAddDialog(false)
  }

  // Tambahkan fungsi untuk memeriksa sinkronisasi PPPoE
  const checkPPPoESync = async (mikrotikId: string) => {
    setCheckingPPPoE(true)
    setPPPoESyncResults(null)

    try {
      // Simulasi pengecekan PPPoE (dalam implementasi nyata, ini akan memanggil API)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Data dummy untuk demonstrasi
      setPPPoESyncResults({
        unsyncedConnections: [
          { id: "PPP001", username: "user123", source: "mikrotik" },
          { id: "PPP002", username: "user456", source: "database" },
          { id: "PPP003", username: "user789", source: "mikrotik" },
        ],
        syncedCount: 45,
        total: 48,
      })
    } catch (error) {
      console.error("Error checking PPPoE sync:", error)
    } finally {
      setCheckingPPPoE(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Header dengan tombol Tambah Mikrotik */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Daftar Mikrotik</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            size="lg"
            onClick={() => setShowPPPoEDialog(true)}
            className="bg-blue-600 text-white hover:bg-blue-700 w-full sm:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Cek PPPoE
          </Button>
          <Button
            size="lg"
            onClick={() => setShowAddDialog(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" /> Tambah Mikrotik
          </Button>
        </div>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah Mikrotik Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddMikrotik} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mikrotik-name">Nama Mikrotik</Label>
                <Input id="mikrotik-name" placeholder="Mikrotik Router" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mikrotik-ip">IP/VPN</Label>
                <Input id="mikrotik-ip" placeholder="192.168.1.1" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mikrotik-port">Port</Label>
                <Input id="mikrotik-port" placeholder="8728" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mikrotik-username">Username</Label>
                <Input id="mikrotik-username" defaultValue="mikrotik" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mikrotik-password">Password</Label>
                <Input id="mikrotik-password" type="password" defaultValue="mikrotik" required />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                Batal
              </Button>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Tambahkan dialog untuk menampilkan hasil pengecekan PPPoE */}
      {/* Tambahkan dialog ini setelah dialog Tambah Mikrotik */}
      <Dialog open={showPPPoEDialog} onOpenChange={setShowPPPoEDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Sinkronisasi PPPoE</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            {!pppoeSyncResults && !checkingPPPoE && (
              <div className="text-center p-4">
                <p className="mb-4">Pilih Mikrotik untuk memeriksa sinkronisasi PPPoE:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {mikrotikData.map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => checkPPPoESync(item.id)}
                      className={`justify-start ${item.status === "Online" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}`}
                      variant="outline"
                    >
                      {item.name} ({item.ip})
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {checkingPPPoE && (
              <div className="flex flex-col items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-center">Memeriksa sinkronisasi PPPoE...</p>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Ini mungkin memerlukan waktu beberapa saat
                </p>
              </div>
            )}

            {pppoeSyncResults && (
              <div className="space-y-4">
                <Alert className={pppoeSyncResults.unsyncedConnections.length > 0 ? "bg-amber-50" : "bg-green-50"}>
                  <AlertCircle
                    className={
                      pppoeSyncResults.unsyncedConnections.length > 0
                        ? "h-4 w-4 text-amber-600"
                        : "h-4 w-4 text-green-600"
                    }
                  />
                  <AlertTitle>
                    {pppoeSyncResults.unsyncedConnections.length > 0
                      ? "Ditemukan ketidaksinkronan PPPoE"
                      : "Semua PPPoE tersinkronisasi dengan baik"}
                  </AlertTitle>
                  <AlertDescription>
                    {pppoeSyncResults.syncedCount} dari {pppoeSyncResults.total} koneksi PPPoE tersinkronisasi dengan
                    baik.
                  </AlertDescription>
                </Alert>

                {pppoeSyncResults.unsyncedConnections.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Koneksi yang tidak sinkron:</h3>
                    <div className="border rounded-md overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Aksi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pppoeSyncResults.unsyncedConnections.map((conn) => (
                            <TableRow key={conn.id}>
                              <TableCell className="font-medium">{conn.id}</TableCell>
                              <TableCell>{conn.username}</TableCell>
                              <TableCell>
                                <span
                                  className={`rounded-full px-2 py-1 text-xs ${
                                    conn.source === "mikrotik"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-blue-100 text-blue-800"
                                  }`}
                                >
                                  {conn.source === "mikrotik" ? "Hanya di Mikrotik" : "Hanya di Database"}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="icon" title="Sinkronkan">
                                    <RefreshCw className="h-4 w-4" />
                                  </Button>
                                  {conn.source === "mikrotik" && (
                                    <Button variant="ghost" size="icon" title="Hapus dari Mikrotik">
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  )}
                                  {conn.source === "database" && (
                                    <Button variant="ghost" size="icon" title="Tambahkan ke Mikrotik">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    onClick={() => {
                      setPPPoESyncResults(null)
                      setShowPPPoEDialog(false)
                    }}
                  >
                    Tutup
                  </Button>
                  {pppoeSyncResults.unsyncedConnections.length > 0 && (
                    <Button variant="outline" onClick={() => checkPPPoESync(mikrotikData[0].id)}>
                      Periksa Ulang
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>IP/VPN</TableHead>
                <TableHead>Port</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Password</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mikrotikData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.ip}</TableCell>
                  <TableCell>{item.port}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.password}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === "Online" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
