import { Metadata } from "next"
import Image from "next/image"

import { SidebarNav } from "@/app/components/onboarding-side-navbar/onboarding-side-navbar"
import { Separator } from "@/app/components/ui/separator"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import DeveloperLayout from "@/app/components/developer/layout/dashboard/dashboard"

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/dashboard/developer/edit-profile",
  },
  {
    title: "Avatar",
    href: "/dashboard/developer/edit-profile/avatar",
  },
  {
    title: "Bio",
    href: "/dashboard/developer/edit-profile/bio",
  },
  {
    title: "Skills",
    href: "/dashboard/developer/edit-profile/skills",
  },
  {
    title: "Language",
    href: "/dashboard/developer/edit-profile/language",
  },
  {
    title: "Socials",
    href: "/dashboard/developer/edit-profile/socials",
  },
  {
    title: "Experience",
    href: "/dashboard/developer/edit-profile/experience",
  },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const session = await getServerSession(authOptions)
  //@ts-ignore

  return (
    <div>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 ">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  )
}
