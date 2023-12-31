import { SidebarNav } from "@/app/components/onboarding-side-navbar/onboarding-side-navbar"
import { Separator } from "@/app/components/ui/separator"
import { Metadata } from "next"
import Image from "next/image"

export const metadata = {
  title: "Avocado Growth - reverse frontend job board",
  description:
    "Say goodbye to lengthy applications and waiting for responses. Here, developers take the lead, creating profiles that showcase their skills and expertise.",
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "https://stackoverflow.com/questions/73905852/how-to-use-upsert-with-prisma",
  },
  // {
  //   title: "Account",
  //   href: "/examples/forms/account",
  // },
  // {
  //   title: "Appearance",
  //   href: "/examples/forms/appearance",
  // },
  // {
  //   title: "Notifications",
  //   href: "/examples/forms/notifications",
  // },
  // {
  //   title: "Display",
  //   href: "/examples/forms/display",
  // },
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Developer</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
