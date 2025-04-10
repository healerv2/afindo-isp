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

export function InfraOdc() {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showMapDialog, setShowMapDialog] = useState(false)
  const [selectedOdc, setSelectedOdc] = useState<any>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Data dummy untuk OLT
  const oltData = [
    {
      id: "OLT001",
      name: "OLT Jakarta Pusat",
      ports: Array.from({ length: 16 }, (_, i) => ({ id: i + 1, name: `Port ${i + 1}` })),
      slots: Array.from({ length: 4 }, (_, i) => ({ id: i + 1, name: `Slot ${i + 1}` })),
    },
    {
      id: "OLT002",
      name: "OLT Jakarta Selatan",
      ports: Array.from({ length: 16 }, (_, i) => ({ id: i + 1, name: `Port ${i + 1}` })),
      slots: Array.from({ length: 4 }, (_, i) => ({ id: i + 1, name: `Slot ${i + 1}` })),
    },
    {
      id: "OLT003",
      name: "OLT Jakarta Barat",
      ports: Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `Port ${i + 1}` })),
      slots: Array.from({ length: 2 }, (_, i) => ({ id: i + 1, name: `Slot ${i + 1}` })),
    },
  ]

  const [odcData, setOdcData] = useState([
    {
      id: "ODC001",
      name: "ODC Jakarta Pusat 01",
      port: 24,
      olt: "OLT001",
      oltPort: 1,
      oltSlot: 1,
      location: { lat: -6.1751, lng: 106.865 },
      status: "Active",
    },
    {
      id: "ODC002",
      name: "ODC Jakarta Pusat 02",
      port: 24,
      olt: "OLT001",
      oltPort: 2,
      oltSlot: 1,
      location: { lat: -6.1851, lng: 106.875 },
      status: "Active",
    },
    {
      id: "ODC003",
      name: "ODC Jakarta Selatan 01",
      port: 16,
      olt: "OLT002",
      oltPort: 1,
      oltSlot: 1,
      location: { lat: -6.2608, lng: 106.8108 },
      status: "Active",
    },
  ])

  const [selectedOlt, setSelectedOlt] = useState<string>("")
  const [selectedOltPort, setSelectedOltPort] = useState<string>("")
  const [selectedOltSlot, setSelectedOltSlot] = useState<string>("")

  const handleAddOdc = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penambahan ODC
    setShowAddDialog(false)
  }

  const handleViewMap = (odc: any) => {
    setSelectedOdc(odc)
    setLocation(odc.location)
    setShowMapDialog(true)
  }

  // Mendapatkan data port dan slot berdasarkan OLT yang dipilih
  const getSelectedOltData = () => {
    return oltData.find((olt) => olt.id === selectedOlt)
  }

  return (
    <div className="space-y-4">
      {/* Header dengan tombol Tambah ODC */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold">Daftar ODC (Optical Distribution Cabinet)</h2>
        <Button
          size="lg"
          onClick={() => setShowAddDialog(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Tambah ODC
        </Button>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah ODC Baru</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddOdc} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="odc-name">Nama ODC</Label>
                <Input id="odc-name" placeholder="ODC Jakarta Pusat 01" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odc-port">Port ODC</Label>
                <Input id="odc-port" type="number" placeholder="24" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odc-olt">OLT</Label>
                <Select value={selectedOlt} onValueChange={setSelectedOlt}>
                  <SelectTrigger id="odc-olt">
                    <SelectValue placeholder="Pilih OLT" />
                  </SelectTrigger>
                  <SelectContent>
                    {oltData.map((olt) => (
                      <SelectItem key={olt.id} value={olt.id}>
                        {olt.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odc-olt-port">Port OLT</Label>
                <Select value={selectedOltPort} onValueChange={setSelectedOltPort} disabled={!selectedOlt}>
                  <SelectTrigger id="odc-olt-port">
                    <SelectValue placeholder="Pilih Port OLT" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSelectedOltData()?.ports.map((port) => (
                      <SelectItem key={port.id} value={port.id.toString()}>
                        {port.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odc-olt-slot">Slot OLT</Label>
                <Select value={selectedOltSlot} onValueChange={setSelectedOltSlot} disabled={!selectedOlt}>
                  <SelectTrigger id="odc-olt-slot">
                    <SelectValue placeholder="Pilih Slot OLT" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSelectedOltData()?.slots.map((slot) => (
                      <SelectItem key={slot.id} value={slot.id.toString()}>
                        {slot.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="odc-location">Lokasi</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="odc-location"
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
                <TableHead>OLT</TableHead>
                <TableHead>Port OLT</TableHead>
                <TableHead>Slot OLT</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {odcData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.port}</TableCell>
                  <TableCell>{oltData.find((olt) => olt.id === item.olt)?.name || item.olt}</TableCell>
                  <TableCell>{item.oltPort}</TableCell>
                  <TableCell>{item.oltSlot}</TableCell>
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
            <DialogTitle>{selectedOdc ? `Lokasi ${selectedOdc.name}` : "Pilih Lokasi ODC"}</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <MiniMap onSelectLocation={setLocation} selectedLocation={location} />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={() => setShowMapDialog(false)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Visualisasi Port ODC */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Visualisasi Port ODC</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {odcData.map((odc) => (
            <Card key={odc.id} className="overflow-hidden">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium mb-4">{odc.name}</h4>
                <div className="grid grid-cols-8 gap-2">
                  {Array.from({ length: odc.port }, (_, i) => (
                    <div
                      key={i}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium ${
                        i % 4 === 0 ? "bg-green-500 text-white border-green-600" : "bg-background hover:bg-muted"
                      }`}
                      title={i % 4 === 0 ? "Port terpakai" : "Port tersedia"}
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
