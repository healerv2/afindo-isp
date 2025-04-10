"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, MapPin, Pencil, Plus, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MiniMap } from "@/components/mini-map"

export function InfraOdp() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showMapDialog, setShowMapDialog] = useState(false)
  const [selectedOdp, setSelectedOdp] = useState<any>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Data dummy untuk ODC
  const odcData = [
    {
      id: "ODC001",
      name: "ODC Jakarta Pusat 01",
    },
    {
      id: "ODC002",
      name: "ODC Jakarta Pusat 02",
    },
    {
      id: "ODC003",
      name: "ODC Jakarta Selatan 01",
    },
  ]

  const [odpData, setOdpData] = useState([
    {
      id: "ODP001",
      name: "ODP Jakarta Pusat 01-01",
      port: 8,
      odc: "ODC001",
      location: { lat: -6.1761, lng: 106.866 },
      status: "Active",
    },
    {
      id: "ODP002",
      name: "ODP Jakarta Pusat 01-02",
      port: 8,
      odc: "ODC001",
      location: { lat: -6.1771, lng: 106.867 },
      status: "Active",
    },
    {
      id: "ODP003",
      name: "ODP Jakarta Pusat 02-01",
      port: 8,
      odc: "ODC002",
      location: { lat: -6.1861, lng: 106.876 },
      status: "Active",
    },
    {
      id: "ODP004",
      name: "ODP Jakarta Selatan 01-01",
      port: 8,
      odc: "ODC003",
      location: { lat: -6.2618, lng: 106.8118 },
      status: "Inactive",
    },
  ])

  const [selectedOdc, setSelectedOdc] = useState<string>("")

  const handleAddOdp = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penambahan ODP
    setShowAddDialog(false)
  }

  const handleViewMap = (odp: any) => {
    setSelectedOdp(odp)
    setLocation(odp.location)
    setShowMapDialog(true)
  }

  return (
    <div className="space-y-4">
      {/* Pastikan tombol Tambah ODP juga terlihat dengan jelas */}
      {/* Ubah bagian header di awal komponen */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Daftar ODP (Optical Distribution Point)</h2>
        <Button
          className="gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4" /> Tambah ODP
        </Button>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah ODP Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddOdp} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="odp-name">Nama ODP</Label>
                <Input id="odp-name" placeholder="ODP Jakarta Pusat 01-01" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odp-port">Port ODP</Label>
                <Input id="odp-port" type="number" placeholder="8" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odp-odc">ODC</Label>
                <Select value={selectedOdc} onValueChange={setSelectedOdc}>
                  <SelectTrigger id="odp-odc">
                    <SelectValue placeholder="Pilih ODC" />
                  </SelectTrigger>
                  <SelectContent>
                    {odcData.map((odc) => (
                      <SelectItem key={odc.id} value={odc.id}>
                        {odc.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odp-location">Lokasi</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="odp-location"
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Port</TableHead>
                <TableHead>ODC</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {odpData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.port}</TableCell>
                  <TableCell>{odcData.find((odc) => odc.id === item.odc)?.name || item.odc}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewMap(item)}>
                        <MapPin className="h-4 w-4" />
                      </Button>
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

      {/* Dialog untuk menampilkan peta */}
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedOdp ? `Lokasi ${selectedOdp.name}` : "Pilih Lokasi ODP"}</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <MiniMap onSelectLocation={setLocation} selectedLocation={location} />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={() => setShowMapDialog(false)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visualisasi Port ODP */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Visualisasi Port ODP</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {odpData.map((odp) => (
            <Card key={odp.id} className="overflow-hidden">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-4">{odp.name}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: odp.port }, (_, i) => (
                    <div
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium ${
                        i % 2 === 0 ? "bg-green-500 text-white border-green-600" : "bg-background hover:bg-muted"
                      }`}
                      title={i % 2 === 0 ? "Port terpakai" : "Port tersedia"}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
