"use client"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export function NavDashboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href
  }

  return (
    <nav
      className={cn("flex items-center space-x-4 z-0 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/mentee/dashboard"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/mentee/dashboard")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-primary"
        }`}
      >
        Home
      </Link>

      <Link
        href="/mentee/dashboard/chats"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/mentee/dashboard/chats")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-emerald-700 cursor-pointer"
        }`}
      >
        Chats
      </Link>
      <Link
        href="/dashboard/developer/edit-profile"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/mentee/dashboard/chats")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-emerald-700 cursor-pointer"
        }`}
      >
        Edit Profile
      </Link>
      <Link
        href="/dashboard/developer/edit-profile"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/mentee/dashboard/chats")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-emerald-700 cursor-pointer"
        }`}
      >
        Developers
      </Link>
      <Link
        href="/mentee/dashboard/chats"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/mentee/dashboard/chats")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-emerald-700 cursor-pointer"
        }`}
      >
        Pricing
      </Link>
      {/* <Link
        href="/mentors/dashboard/connect-stripe"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/mentors/dashboard/connect-stripe")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-emerald-700 cursor-pointer"
        }`}
      >
        Stripe
      </Link>
      <Link
        href="/mentors/"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/mentors/")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-emerald-700 cursor-pointer"
        }`}
      >
        Mentors
      </Link>
      <Link
        href="/en/blog"
        className={`text-sm font-medium cursor-pointer transition-colors ${
          isActive("/en/blog")
            ? "text-emerald-700 text-base font-bold"
            : "hover:text-emerald-700 cursor-pointer"
        }`}
      >
        Blog
      </Link> */}
    </nav>
  )
}
