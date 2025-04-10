"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useResponsive } from "@/hooks/use-responsive"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
}

export function OptimizedImage({ src, alt, className, priority = false }: OptimizedImageProps) {
  const { isMobile, isTablet } = useResponsive()
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(576)

  useEffect(() => {
    if (isMobile) {
      setWidth(640)
      setHeight(360)
    } else if (isTablet) {
      setWidth(768)
      setHeight(432)
    } else {
      setWidth(1024)
      setHeight(576)
    }
  }, [isMobile, isTablet])

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  )
}
