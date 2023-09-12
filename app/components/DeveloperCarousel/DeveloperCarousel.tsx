"use client"

import { Developer } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useEffect, useRef, useState } from "react"

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
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[1200px] max-w-full">
        <ul
          ref={wrapperRef}
          className="group flex flex-col gap-3 md:h-[640px] md:flex-row md:gap-[1.5%]"
        >
          {developerFeatured.map((person, index) => (
            <li
              onClick={() => setActiveItem(index)}
              aria-current={activeItem === index}
              className={classNames(
                "relative cursor-pointer md:w-[8%] md:first:w-[30%] md:last:w-[30%] md:[&[aria-current='true']]:w-[98%]",
                "md:[transition:width_var(--transition,200ms_ease-in)]",
                "md:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] md:hover:w-[12%]"
              )}
              key={person.fullName}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
                <Image
                  className="absolute right-0 top-1/2 h-auto w-24 max-w-none -translate-y-1/2 object-cover grayscale md:left-1/2 md:h-[640px] md:w-[590px] md:-translate-x-1/2"
                  src={person.avatar!}
                  alt={person.hero!}
                  width={590}
                  height={640}
                />
                <div
                  className={classNames(
                    "inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity",
                    activeItem === index ? "md:opacity-25" : "md:opacity-0"
                  )}
                />
                <div
                  className={classNames(
                    "left-8 top-8 w-[590px] p-4 transition-[transform,opacity] md:absolute md:p-0",
                    activeItem === index
                      ? "md:translate-x-0 md:opacity-100"
                      : "md:translate-x-4 md:opacity-0"
                  )}
                >
                  <p className="text-sm uppercase text-primary md:text-lg">
                    {person.country}
                  </p>
                  <p className="text-lg font-bold md:text-4xl">{person.hero}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DeveloperCaroussel
