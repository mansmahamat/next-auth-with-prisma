import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "../Icons/Icons"
import Image from "next/image"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image
            src="https://res.cloudinary.com/mansdesmez/image/upload/v1692131604/Green_Circle_Thank_You_Sticker_4_akttyp.png"
            alt="Logo"
            width={34}
            height={34}
            priority
          />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Avocado Growth
            </a>
            . Find your mentor{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              here
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
