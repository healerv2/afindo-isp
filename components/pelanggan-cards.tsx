"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { PelangganStatus } from "./pelanggan-dashboard"

interface PelangganCardsProps {
  onViewDetails: (status: PelangganStatus) => void
}

export function PelangganCards({ onViewDetails }: PelangganCardsProps) {
  const cards = [
    {
      title: "Pelanggan Aktif",
      count: 1245,
      status: "aktif" as const,
      color: "bg-green-50 text-green-700 border-green-200",
    },
    {
      title: "Pelanggan Baru",
      count: 42,
      status: "baru" as const,
      color: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      title: "Pelanggan Isolir",
      count: 18,
      status: "isolir" as const,
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    {
      title: "Pelanggan Berhenti",
      count: 7,
      status: "berhenti" as const,
      color: "bg-red-50 text-red-700 border-red-200",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className={card.color}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.count}</div>
          </CardContent>
          <CardFooter>
            <Button
              variant="ghost"
              className="p-0 h-auto text-current text-sm"
              onClick={() => onViewDetails(card.status)}
            >
              Detail
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
