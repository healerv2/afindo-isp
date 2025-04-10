"use client"

import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DashboardCardProps {
  title: string
  amount: string
  count: string
  showAmount: boolean
  onToggle: () => void
  detailHref: string
  onClick?: () => void
  hideAmount?: boolean
  className?: string
}

export function DashboardCard({
  title,
  amount,
  count,
  showAmount,
  onToggle,
  detailHref,
  onClick,
  hideAmount = false,
  className,
}: DashboardCardProps) {
  // Determine card color based on title
  const getCardStyle = () => {
    if (title.includes("Lunas")) {
      return "border-green-100 bg-gradient-to-br from-white to-green-50"
    } else if (title.includes("Belum Lunas")) {
      return "border-orange-100 bg-gradient-to-br from-white to-orange-50"
    } else if (title.includes("Pengaduan")) {
      return "border-blue-100 bg-gradient-to-br from-white to-blue-50"
    }
    return ""
  }

  return (
    <Card className={cn("transition-all hover:shadow-md", getCardStyle(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {!hideAmount && (
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onToggle}>
            {showAmount ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            <span className="sr-only">{showAmount ? "Hide amount" : "Show amount"}</span>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!hideAmount && <div className="text-2xl font-bold">{showAmount ? amount : "Rp *****"}</div>}
        <p className="text-xs text-muted-foreground mt-1">
          <span className="font-medium">{showAmount ? count : "****"}</span> {title.toLowerCase()}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="h-8 p-0 text-sm font-medium text-primary hover:text-primary/80 hover:bg-transparent"
          onClick={onClick}
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  )
}
