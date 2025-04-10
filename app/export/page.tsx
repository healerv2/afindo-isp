import { ExportData } from "@/components/export-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ExportPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Export Data</h1>
      </div>
      <ExportData />
    </div>
  )
}
