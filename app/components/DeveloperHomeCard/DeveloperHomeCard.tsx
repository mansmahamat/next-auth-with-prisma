import Image from "next/image"

import { cn } from "@/lib/utils"

import { ContextMenu, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Developer } from "@prisma/client"

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  developer: Developer
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function DeveloperHomeCard({
  developer,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden  rounded-md">
            <Image
              src={developer.avatar || "/Profile_avatar_placeholder_large.png"}
              alt={developer.hero!}
              width={width}
              height={height}
              className={cn(
                "h-[320px] w-auto object-cover object-center transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{developer.hero}</h3>
      </div>
    </div>
  )
}
