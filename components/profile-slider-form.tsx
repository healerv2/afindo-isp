"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "@/components/file-upload"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

export function ProfileSliderForm() {
  const [enabled, setEnabled] = useState(true)
  const [slider1File, setSlider1File] = useState<File | null>(null)
  const [slider2File, setSlider2File] = useState<File | null>(null)
  const [slider3File, setSlider3File] = useState<File | null>(null)

  // Preview URLs for demonstration
  const [slider1Preview, setSlider1Preview] = useState<string | null>(null)
  const [slider2Preview, setSlider2Preview] = useState<string | null>(null)
  const [slider3Preview, setSlider3Preview] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implementasi penyimpanan data
    console.log({
      enabled,
      slider1File,
      slider2File,
      slider3File,
    })
    alert("Slider gambar berhasil diperbarui!")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Slider Gambar Custom</CardTitle>
          <CardDescription>Atur gambar slider yang akan ditampilkan pada aplikasi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="slider-enabled" className="font-medium">
              Aktifkan Slider Gambar
            </Label>
            <Switch id="slider-enabled" checked={enabled} onCheckedChange={setEnabled} />
          </div>

          {enabled && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="slider1">Slider 1</Label>
                <FileUpload
                  id="slider1"
                  accept="image/*"
                  onChange={(file) => {
                    setSlider1File(file)
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setSlider1Preview(reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    } else {
                      setSlider1Preview(null)
                    }
                  }}
                  file={slider1File}
                  placeholder="Upload gambar slider 1"
                />
                {slider1Preview && (
                  <div className="relative mt-2 aspect-[16/9] w-full max-w-md overflow-hidden rounded-md border">
                    <Image
                      src={slider1Preview || "/placeholder.svg"}
                      alt="Slider 1 Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slider2">Slider 2</Label>
                <FileUpload
                  id="slider2"
                  accept="image/*"
                  onChange={(file) => {
                    setSlider2File(file)
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setSlider2Preview(reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    } else {
                      setSlider2Preview(null)
                    }
                  }}
                  file={slider2File}
                  placeholder="Upload gambar slider 2"
                />
                {slider2Preview && (
                  <div className="relative mt-2 aspect-[16/9] w-full max-w-md overflow-hidden rounded-md border">
                    <Image
                      src={slider2Preview || "/placeholder.svg"}
                      alt="Slider 2 Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slider3">Slider 3</Label>
                <FileUpload
                  id="slider3"
                  accept="image/*"
                  onChange={(file) => {
                    setSlider3File(file)
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setSlider3Preview(reader.result as string)
                      }
                      reader.readAsDataURL(file)
                    } else {
                      setSlider3Preview(null)
                    }
                  }}
                  file={slider3File}
                  placeholder="Upload gambar slider 3"
                />
                {slider3Preview && (
                  <div className="relative mt-2 aspect-[16/9] w-full max-w-md overflow-hidden rounded-md border">
                    <Image
                      src={slider3Preview || "/placeholder.svg"}
                      alt="Slider 3 Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit">Simpan</Button>
        </CardFooter>
      </Card>
    </form>
  )
}
