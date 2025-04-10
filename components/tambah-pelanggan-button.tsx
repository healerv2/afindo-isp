"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { TambahPelangganForm } from "./tambah-pelanggan-form"
import { Plus } from "lucide-react"

export function TambahPelangganButton() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Pelanggan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Tambah Pelanggan Baru</DialogTitle>
        </DialogHeader>
        <TambahPelangganForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
