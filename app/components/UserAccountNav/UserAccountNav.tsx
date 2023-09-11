"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "../UserAvatar/UserAvatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  //@ts-ignore
  user: Pick<User, "name" | "image" | "email" | "role">
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {user.role === "developer" && (
          <DropdownMenuItem asChild>
            <Link
              href={`/developer/${slugify(user?.name!)}`}
              target="_blank"
              rel="noopener"
            >
              My profile
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          {user.role === "developer" ? (
            <Link href="/dashboard/developer">Dashboard</Link>
          ) : (
            <Link href="/dashboard/recruiter">Dashboard</Link>
          )}
        </DropdownMenuItem>

        {user.role === "recruiter" && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard/recruiter/billing">Billing</Link>
          </DropdownMenuItem>
        )}
        {user.role === "developer" && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard/developer/edit-profile">Settings</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
