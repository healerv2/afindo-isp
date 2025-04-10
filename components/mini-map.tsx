"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface MiniMapProps {
  onSelectLocation: (location: { lat: number; lng: number } | null) => void
  selectedLocation: { lat: number; lng: number } | null
}

export function MiniMap({ onSelectLocation, selectedLocation }: MiniMapProps) {
  const [tempLocation, setTempLocation] = useState<{ lat: number; lng: number } | null>(selectedLocation)

  // Default ke Jakarta jika tidak ada lokasi yang dipilih
  const defaultLocation = { lat: -6.2088, lng: 106.8456 }

  // Gunakan lokasi yang dipilih atau default
  const mapCenter = tempLocation || defaultLocation

  const handleConfirmLocation = () => {
    onSelectLocation(tempLocation)
  }

  return (
    <div className="space-y-4">
      <div className="relative h-[300px] w-full rounded-md border bg-muted">
        {/* Placeholder untuk peta - dalam implementasi nyata, gunakan Google Maps atau Leaflet */}
        <div className="absolute inset-0 flex items-center justify-center bg-muted p-4">
          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              Di sini akan ditampilkan peta interaktif untuk memilih lokasi pelanggan.
            </p>
            <div className="mb-4 flex flex-col items-center justify-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">
                {tempLocation
                  ? `Lat: ${tempLocation.lat.toFixed(4)}, Lng: ${tempLocation.lng.toFixed(4)}`
                  : "Belum ada lokasi yang dipilih"}
              </span>
            </div>
            <div className="flex justify-center gap-2">
              <Button type="button" variant="outline" onClick={() => setTempLocation({ lat: -6.2088, lng: 106.8456 })}>
                Jakarta
              </Button>
              <Button type="button" variant="outline" onClick={() => setTempLocation({ lat: -7.7971, lng: 110.3688 })}>
                Yogyakarta
              </Button>
              <Button type="button" variant="outline" onClick={() => setTempLocation({ lat: -6.9147, lng: 107.6098 })}>
                Bandung
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setTempLocation(null)}>
          Reset
        </Button>
        <Button type="button" onClick={handleConfirmLocation}>
          OK
        </Button>
      </div>
    </div>
  )
}
