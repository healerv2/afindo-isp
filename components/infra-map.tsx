"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wifi, Server, Network } from "lucide-react"

export function InfraMap() {
  const [mapType, setMapType] = useState<"all" | "olt" | "odc" | "odp">("all")

  // Data dummy untuk infrastruktur
  const infraData = {
    olt: [
      { id: "OLT001", name: "OLT Jakarta Pusat", location: { lat: -6.1751, lng: 106.865 } },
      { id: "OLT002", name: "OLT Jakarta Selatan", location: { lat: -6.2608, lng: 106.8108 } },
      { id: "OLT003", name: "OLT Jakarta Barat", location: { lat: -6.1683, lng: 106.7588 } },
    ],
    odc: [
      { id: "ODC001", name: "ODC Jakarta Pusat 01", location: { lat: -6.1751, lng: 106.865 } },
      { id: "ODC002", name: "ODC Jakarta Pusat 02", location: { lat: -6.1851, lng: 106.875 } },
      { id: "ODC003", name: "ODC Jakarta Selatan 01", location: { lat: -6.2608, lng: 106.8108 } },
    ],
    odp: [
      { id: "ODP001", name: "ODP Jakarta Pusat 01-01", location: { lat: -6.1761, lng: 106.866 } },
      { id: "ODP002", name: "ODP Jakarta Pusat 01-02", location: { lat: -6.1771, lng: 106.867 } },
      { id: "ODP003", name: "ODP Jakarta Pusat 02-01", location: { lat: -6.1861, lng: 106.876 } },
      { id: "ODP004", name: "ODP Jakarta Selatan 01-01", location: { lat: -6.2618, lng: 106.8118 } },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Peta Infrastruktur</h2>
        <Select value={mapType} onValueChange={(value: "all" | "olt" | "odc" | "odp") => setMapType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tampilkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Infrastruktur</SelectItem>
            <SelectItem value="olt">OLT</SelectItem>
            <SelectItem value="odc">ODC</SelectItem>
            <SelectItem value="odp">ODP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="relative h-[600px] w-full bg-muted">
            {/* Placeholder untuk peta - dalam implementasi nyata, gunakan Google Maps atau Leaflet */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center">
                <p className="mb-4 text-sm text-muted-foreground">
                  Di sini akan ditampilkan peta interaktif untuk melihat lokasi infrastruktur jaringan.
                </p>
                <div className="mb-4 flex flex-col items-center justify-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Network className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    {mapType === "all"
                      ? "Menampilkan semua infrastruktur"
                      : mapType === "olt"
                        ? "Menampilkan OLT"
                        : mapType === "odc"
                          ? "Menampilkan ODC"
                          : "Menampilkan ODP"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Server className="mr-2 h-4 w-4 text-primary" /> OLT
            </CardTitle>
            <CardDescription>Optical Line Terminal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{infraData.olt.length}</div>
            <p className="text-xs text-muted-foreground">Total OLT terpasang</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Network className="mr-2 h-4 w-4 text-primary" /> ODC
            </CardTitle>
            <CardDescription>Optical Distribution Cabinet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{infraData.odc.length}</div>
            <p className="text-xs text-muted-foreground">Total ODC terpasang</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Wifi className="mr-2 h-4 w-4 text-primary" /> ODP
            </CardTitle>
            <CardDescription>Optical Distribution Point</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{infraData.odp.length}</div>
            <p className="text-xs text-muted-foreground">Total ODP terpasang</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Infrastruktur</CardTitle>
          <CardDescription>
            {mapType === "all" ? "Semua infrastruktur" : mapType === "olt" ? "OLT" : mapType === "odc" ? "ODC" : "ODP"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mapType === "all" || mapType === "olt" ? (
              <div>
                <h3 className="text-sm font-medium mb-2">OLT</h3>
                <div className="space-y-2">
                  {infraData.olt.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Server className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {mapType === "all" || mapType === "odc" ? (
              <div>
                <h3 className="text-sm font-medium mb-2">ODC</h3>
                <div className="space-y-2">
                  {infraData.odc.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Network className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {mapType === "all" || mapType === "odp" ? (
              <div>
                <h3 className="text-sm font-medium mb-2">ODP</h3>
                <div className="space-y-2">
                  {infraData.odp.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Wifi className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
