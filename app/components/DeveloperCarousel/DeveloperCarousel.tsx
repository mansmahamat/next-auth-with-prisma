"use client"

import { Developer } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useEffect, useRef, useState } from "react"
import { DeveloperHomeCard } from "../DeveloperHomeCard/DeveloperHomeCard"
import { ScrollArea } from "@/components/ui/scroll-area"

type Mentors = {
  avatar_url: string | null
  first_name: string | null
  last_name: string | null
  id: string | null
  job_title: string | null
  slugify: string | null
}

type Props = {
  developerFeatured: Developer[]
}

function DeveloperCaroussel({ developerFeatured }: Props) {
  const [activeItem, setActiveItem] = useState(4)
  const wrapperRef = useRef<HTMLUListElement | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!wrapperRef.current) return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    )
    //@ts-ignore
    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition")
    }, 900)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [activeItem])

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <div className="flex h-full w-screen overflow-y-scroll items-center justify-center">
      <div className="flex  mx-4 space-x-4 pb-4">
        {developerFeatured?.map((developer) => (
          <DeveloperHomeCard
            key={developer.hero}
            developer={developer}
            aspectRatio="square"
            width={330}
            height={320}
          />
        ))}
      </div>
    </div>
  )
}

export default DeveloperCaroussel
