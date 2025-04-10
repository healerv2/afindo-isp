"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface FileUploadProps {
  id: string
  accept?: string
  onChange: (file: File | null) => void
  file: File | null
  placeholder?: string
}

export function FileUpload({ id, accept, onChange, file, placeholder }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    onChange(selectedFile)

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }

  const handleRemoveFile = () => {
    onChange(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input ref={fileInputRef} type="file" id={id} accept={accept} onChange={handleFileChange} className="hidden" />
        <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
          <Upload className="mr-2 h-4 w-4" />
          {file ? file.name : placeholder || "Pilih file"}
        </Button>
        {file && (
          <Button type="button" variant="ghost" size="icon" onClick={handleRemoveFile}>
            <X className="h-4 w-4" />
            <span className="sr-only">Hapus file</span>
          </Button>
        )}
      </div>
      {preview && (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border">
          <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
        </div>
      )}
    </div>
  )
}
