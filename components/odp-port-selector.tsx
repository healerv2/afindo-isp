"use client"

import { cn } from "@/lib/utils"

interface OdpPortSelectorProps {
  totalPorts: number
  usedPorts: number[]
  selectedPort: number | null
  onSelectPort: (port: number | null) => void
}

export function OdpPortSelector({ totalPorts, usedPorts, selectedPort, onSelectPort }: OdpPortSelectorProps) {
  const handlePortClick = (port: number) => {
    if (usedPorts.includes(port)) {
      return // Port sudah digunakan, tidak bisa dipilih
    }

    if (selectedPort === port) {
      onSelectPort(null) // Batalkan pilihan jika port yang sama diklik
    } else {
      onSelectPort(port) // Pilih port baru
    }
  }

  return (
    <div className="grid grid-cols-8 gap-2">
      {Array.from({ length: totalPorts }, (_, i) => i + 1).map((port) => {
        const isUsed = usedPorts.includes(port)
        const isSelected = selectedPort === port

        return (
          <button
            key={port}
            type="button"
            onClick={() => handlePortClick(port)}
            disabled={isUsed}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-colors",
              isUsed && "bg-green-500 text-white border-green-600 cursor-not-allowed",
              isSelected && !isUsed && "bg-primary text-primary-foreground border-primary",
              !isUsed && !isSelected && "bg-background hover:bg-muted",
            )}
            title={isUsed ? "Port sudah digunakan" : `Port ${port}`}
          >
            {port}
          </button>
        )
      })}
    </div>
  )
}
