"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileDown, FileSpreadsheet, FileText, Download } from "lucide-react"

export function ExportData() {
  const [selectedData, setSelectedData] = useState({
    pelanggan: true,
    keuangan: true,
    karyawan: false,
    infrastruktur: false,
    mitra: false,
    paket: false,
  })

  const [exportFormat, setExportFormat] = useState("excel")

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setSelectedData({
      ...selectedData,
      [field]: checked,
    })
  }

  const handleExport = () => {
    console.log("Exporting data:", selectedData, "Format:", exportFormat)
    alert(`Data akan diexport ke format ${exportFormat.toUpperCase()}`)
  }

  const getSelectedCount = () => {
    return Object.values(selectedData).filter(Boolean).length
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl flex items-center">
          <FileDown className="mr-2 h-5 w-5" />
          Export Data
        </CardTitle>
        <CardDescription>Pilih jenis data dan format untuk diexport</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium mb-2">Pilih Data</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pelanggan"
                  checked={selectedData.pelanggan}
                  onCheckedChange={(checked) => handleCheckboxChange("pelanggan", checked === true)}
                />
                <Label htmlFor="pelanggan">Data Pelanggan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keuangan"
                  checked={selectedData.keuangan}
                  onCheckedChange={(checked) => handleCheckboxChange("keuangan", checked === true)}
                />
                <Label htmlFor="keuangan">Data Keuangan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="karyawan"
                  checked={selectedData.karyawan}
                  onCheckedChange={(checked) => handleCheckboxChange("karyawan", checked === true)}
                />
                <Label htmlFor="karyawan">Data Karyawan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="infrastruktur"
                  checked={selectedData.infrastruktur}
                  onCheckedChange={(checked) => handleCheckboxChange("infrastruktur", checked === true)}
                />
                <Label htmlFor="infrastruktur">Data Infrastruktur</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="mitra"
                  checked={selectedData.mitra}
                  onCheckedChange={(checked) => handleCheckboxChange("mitra", checked === true)}
                />
                <Label htmlFor="mitra">Data Mitra</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="paket"
                  checked={selectedData.paket}
                  onCheckedChange={(checked) => handleCheckboxChange("paket", checked === true)}
                />
                <Label htmlFor="paket">Data Paket</Label>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium mb-2">Format Export</h3>
            <div className="space-y-4">
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Pilih format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">
                    <div className="flex items-center">
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      <span>Excel (.xlsx)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="csv">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>CSV (.csv)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pdf">
                    <div className="flex items-center">
                      <FileDown className="h-4 w-4 mr-2" />
                      <span>PDF (.pdf)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                <p>
                  {getSelectedCount()} jenis data akan diexport ke format {exportFormat.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleExport} disabled={getSelectedCount() === 0} className="flex items-center">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
