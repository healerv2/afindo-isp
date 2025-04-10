import { useAppRole } from "@/lib/app-role"
import Image from "next/image"

export function AppLogo() {
  const appRole = useAppRole()

  switch (appRole) {
    case "admin":
      return <Image src="/logos/admin-logo.png" alt="Afindo Admin" width={60} height={60} />
    case "pelanggan":
      return <Image src="/logos/pelanggan-logo.png" alt="AfindoPel" width={60} height={60} />
    case "karyawan":
      return <Image src="/logos/karyawan-logo.png" alt="AfindoWan" width={60} height={60} />
    case "mitra":
      return <Image src="/logos/mitra-logo.png" alt="AfindoTra" width={60} height={60} />
    default:
      return <Image src="/logos/default-logo.png" alt="Afindo" width={60} height={60} />
  }
}
