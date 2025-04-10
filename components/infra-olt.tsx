"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, MapPin, Pencil, Plus, Trash, RefreshCw, Loader2, Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { MiniMap } from "@/components/mini-map"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InfraOlt() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showMapDialog, setShowMapDialog] = useState(false)
  const [showSyncDialog, setShowSyncDialog] = useState(false)
  const [selectedOlt, setSelectedOlt] = useState<any>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [oltType, setOltType] = useState<"GPON" | "EPON">("GPON")
  const [ipAddress, setIpAddress] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle")
  const [activeTab, setActiveTab] = useState("olt-list")

  const [oltData, setOltData] = useState([
    {
      id: "OLT001",
      name: "OLT Jakarta Pusat",
      port: 16,
      slot: 4,
      location: { lat: -6.1751, lng: 106.865 },
      status: "Active",
      type: "GPON",
      ipAddress: "192.168.1.1",
      lastSync: "2023-05-15 14:30",
      isSynced: true,
    },
    {
      id: "OLT002",
      name: "OLT Jakarta Selatan",
      port: 16,
      slot: 4,
      location: { lat: -6.2608, lng: 106.8108 },
      status: "Active",
      type: "EPON",
      ipAddress: "192.168.1.2",
      lastSync: null,
      isSynced: false,
    },
    {
      id: "OLT003",
      name: "OLT Jakarta Barat",
      port: 8,
      slot: 2,
      location: { lat: -6.1683, lng: 106.7588 },
      status: "Inactive",
      type: "GPON",
      ipAddress: "192.168.1.3",
      lastSync: null,
      isSynced: false,
    },
  ])

  // Dummy customer data from OLT - this would come from the actual OLT after synchronization
  const [oltCustomerData, setOltCustomerData] = useState([
    {
      id: "ONT001",
      name: "PT Maju Jaya",
      port: 1,
      slot: 1,
      onuType: "HG8245H",
      serialNumber: "HWTC12345678",
      attenuation: "-23.5 dBm",
      status: "Online",
      oltId: "OLT001",
    },
    {
      id: "ONT002",
      name: "CV Sentosa",
      port: 2,
      slot: 1,
      onuType: "HG8245A",
      serialNumber: "HWTC87654321",
      attenuation: "-25.2 dBm",
      status: "Online",
      oltId: "OLT001",
    },
    {
      id: "ONT003",
      name: "Toko Bahagia",
      port: 3,
      slot: 1,
      onuType: "HG8145V",
      serialNumber: "HWTC11223344",
      attenuation: "-28.7 dBm",
      status: "Offline",
      oltId: "OLT001",
    },
    {
      id: "ONT004",
      name: "Restoran Selera",
      port: 4,
      slot: 1,
      onuType: "HG8245H",
      serialNumber: "HWTC55667788",
      attenuation: "-22.1 dBm",
      status: "Online",
      oltId: "OLT001",
    },
    {
      id: "ONT005",
      name: "PT Abadi Sejahtera",
      port: 5,
      slot: 1,
      onuType: "HG8245Q",
      serialNumber: "HWTC99887766",
      attenuation: "-24.8 dBm",
      status: "Online",
      oltId: "OLT001",
    },
  ])

  const handleAddOlt = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penambahan OLT
    const newOlt = {
      id: `OLT${String(oltData.length + 1).padStart(3, "0")}`,
      name: (e.target as any).elements["olt-name"].value,
      port: Number.parseInt((e.target as any).elements["olt-port"].value),
      slot: Number.parseInt((e.target as any).elements["olt-slot"].value),
      location: location || { lat: 0, lng: 0 },
      status: "Active",
      type: oltType,
      ipAddress: ipAddress,
      lastSync: null,
      isSynced: false,
    }

    setOltData([...oltData, newOlt])
    setShowAddDialog(false)

    // Reset form fields
    setOltType("GPON")
    setIpAddress("")
    setUsername("")
    setPassword("")
    setLocation(null)
  }

  const handleViewMap = (olt: any) => {
    setSelectedOlt(olt)
    setLocation(olt.location)
    setShowMapDialog(true)
  }

  const handleSyncOlt = (olt: any) => {
    setSelectedOlt(olt)
    setIpAddress(olt.ipAddress)
    setOltType(olt.type as "GPON" | "EPON")
    setShowSyncDialog(true)
  }

  const handleStartSync = () => {
    setIsSyncing(true)
    setSyncStatus("idle")

    // Simulate API call to sync with OLT
    setTimeout(() => {
      setIsSyncing(false)
      setSyncStatus("success")

      // Update OLT data with sync information
      const updatedOltData = oltData.map((olt) =>
        olt.id === selectedOlt.id
          ? {
              ...olt,
              lastSync: new Date().toLocaleString(),
              isSynced: true,
            }
          : olt,
      )

      setOltData(updatedOltData)

      // After successful sync, switch to the OLT Data tab
      setActiveTab("olt-data")
    }, 3000)
  }

  // Filter customer data based on selected OLT
  const filteredCustomerData = oltCustomerData.filter((customer) => customer.oltId === selectedOlt?.id)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Daftar OLT (Optical Line Terminal)</h2>
        <Button
          className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4" /> Tambah OLT
        </Button>
      </div>

      {/* Dialog untuk menambah OLT */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah OLT Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddOlt} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="olt-name">Nama OLT</Label>
                <Input id="olt-name" placeholder="OLT Jakarta Pusat" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="olt-type">Tipe OLT</Label>
                <Select value={oltType} onValueChange={(value) => setOltType(value as "GPON" | "EPON")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe OLT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPON">GPON</SelectItem>
                    <SelectItem value="EPON">EPON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="olt-ip">IP Address</Label>
                <Input
                  id="olt-ip"
                  placeholder="192.168.1.1"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="olt-username">Username</Label>
                <Input
                  id="olt-username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="olt-password">Password</Label>
                <Input
                  id="olt-password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="olt-port">Port</Label>
                <Input id="olt-port" type="number" placeholder="16" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="olt-slot">Slot</Label>
                <Input id="olt-slot" type="number" placeholder="4" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="olt-location">Lokasi</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="olt-location"
                    placeholder="Pilih lokasi di peta"
                    value={location ? `${location.lat}, ${location.lng}` : ""}
                    readOnly
                  />
                  <Button type="button" variant="outline" size="icon" onClick={() => setShowMapDialog(true)}>
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
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

      {/* Dialog untuk sinkronisasi OLT */}
      <Dialog open={showSyncDialog} onOpenChange={setShowSyncDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Sinkronisasi OLT {selectedOlt?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sync-type">Tipe OLT</Label>
                <Select value={oltType} onValueChange={(value) => setOltType(value as "GPON" | "EPON")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe OLT" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPON">GPON</SelectItem>
                    <SelectItem value="EPON">EPON</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sync-ip">IP Address</Label>
                <Input
                  id="sync-ip"
                  placeholder="192.168.1.1"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sync-username">Username</Label>
                <Input
                  id="sync-username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sync-password">Password</Label>
                <Input
                  id="sync-password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {syncStatus === "success" && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Sinkronisasi berhasil! Data pelanggan telah diperbarui.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {syncStatus === "error" && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800">
                      Gagal melakukan sinkronisasi. Periksa kredensial dan koneksi jaringan Anda.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSyncDialog(false)}>
                Tutup
              </Button>
              <Button onClick={handleStartSync} disabled={isSyncing}>
                {isSyncing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sinkronisasi...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Mulai Sinkronisasi
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog untuk menampilkan peta */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedOlt ? `Lokasi ${selectedOlt.name}` : "Pilih Lokasi OLT"}</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <MiniMap onSelectLocation={setLocation} selectedLocation={location} />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={() => setShowMapDialog(false)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tabs untuk OLT dan Data OLT */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="olt-list">Daftar OLT</TabsTrigger>
          <TabsTrigger value="olt-data">Data OLT</TabsTrigger>
        </TabsList>

        {/* Tab Daftar OLT */}
        <TabsContent value="olt-list">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Port</TableHead>
                    <TableHead>Slot</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sinkronisasi</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {oltData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.ipAddress}</TableCell>
                      <TableCell>{item.port}</TableCell>
                      <TableCell>{item.slot}</TableCell>
                      <TableCell>
                        <Badge variant={item.status === "Active" ? "default" : "destructive"}>{item.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {item.isSynced ? (
                          <div className="flex flex-col">
                            <Badge variant="outline" className="mb-1">
                              Tersinkron
                            </Badge>
                            <span className="text-xs text-muted-foreground">{item.lastSync}</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-50">
                            Belum Sinkron
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewMap(item)}>
                            <MapPin className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleSyncOlt(item)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedOlt(item)
                              setActiveTab("olt-data")
                            }}
                          >
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

          {/* Visualisasi Port OLT */}
          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-medium">Visualisasi Port OLT</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {oltData.map((olt) => (
                <Card key={olt.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">{olt.name}</h4>
                      <Badge variant={olt.status === "Active" ? "default" : "destructive"}>{olt.status}</Badge>
                    </div>
                    <div className="grid grid-cols-8 gap-2">
                      {Array.from({ length: olt.port }, (_, i) => {
                        // Find if there's a customer using this port
                        const customer = oltCustomerData.find((c) => c.oltId === olt.id && c.port === i + 1)
                        const isUsed = customer !== undefined
                        const isOnline = customer?.status === "Online"

                        return (
                          <div
                            key={i}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium ${
                              isUsed
                                ? isOnline
                                  ? "bg-green-500 text-white border-green-600"
                                  : "bg-red-500 text-white border-red-600"
                                : "bg-background hover:bg-muted"
                            }`}
                            title={
                              isUsed
                                ? `Port ${i + 1}: ${customer?.name} (${isOnline ? "Online" : "Offline"})`
                                : `Port ${i + 1}: Tersedia`
                            }
                          >
                            {i + 1}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Tab Data OLT */}
        <TabsContent value="olt-data">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {selectedOlt ? `Data Pelanggan dari ${selectedOlt.name} (${selectedOlt.type})` : "Data Pelanggan OLT"}
                </CardTitle>
                <div className="flex space-x-2">
                  <Select
                    value={selectedOlt?.id || ""}
                    onValueChange={(value) => {
                      const olt = oltData.find((o) => o.id === value)
                      setSelectedOlt(olt)
                    }}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Pilih OLT" />
                    </SelectTrigger>
                    <SelectContent>
                      {oltData
                        .filter((o) => o.isSynced)
                        .map((olt) => (
                          <SelectItem key={olt.id} value={olt.id}>
                            {olt.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {selectedOlt ? (
                selectedOlt.isSynced ? (
                  <>
                    <div className="text-sm text-muted-foreground mb-4">
                      Terakhir disinkronkan: {selectedOlt.lastSync}
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Port/Slot</TableHead>
                          <TableHead>Nama Pelanggan</TableHead>
                          <TableHead>Tipe ONU</TableHead>
                          <TableHead>Serial Number</TableHead>
                          <TableHead>Redaman</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomerData.length > 0 ? (
                          filteredCustomerData.map((customer) => (
                            <TableRow key={customer.id}>
                              <TableCell>
                                {customer.port}/{customer.slot}
                              </TableCell>
                              <TableCell>{customer.name}</TableCell>
                              <TableCell>{customer.onuType}</TableCell>
                              <TableCell>{customer.serialNumber}</TableCell>
                              <TableCell>{customer.attenuation}</TableCell>
                              <TableCell>
                                <Badge variant={customer.status === "Online" ? "default" : "destructive"}>
                                  {customer.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              Tidak ada data pelanggan yang tersedia untuk OLT ini.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="text-center mb-4">
                      <RefreshCw className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">OLT belum disinkronkan</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        Silakan sinkronkan OLT terlebih dahulu untuk melihat data pelanggan.
                      </p>
                    </div>
                    <Button onClick={() => handleSyncOlt(selectedOlt)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sinkronkan Sekarang
                    </Button>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Pilih OLT</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Silakan pilih OLT untuk melihat data pelanggan.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
