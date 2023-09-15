import { buttonVariants } from "@/components/ui/button"
import "./globals.css"
import { Providers } from "./providers"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { MainNav } from "./components/MainNav/MainNav"
import { marketingConfig } from "@/config/marketing"
import { UserAccountNav } from "./components/UserAccountNav/UserAccountNav"
import { getCurrentUser } from "@/lib/session"
import SiteFooter from "./components/SiteFooter/SiteFooter"
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Avocado Growth - reverse frontend job board",
  description:
    "Say goodbye to lengthy applications and waiting for responses. Here, developers take the lead, creating profiles that showcase their skills and expertise.",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col">
          <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
              <MainNav items={marketingConfig.mainNav} />
              {!user ? (
                <nav>
                  <Link
                    href="/login"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "sm" }),
                      "px-4"
                    )}
                  >
                    Login
                  </Link>
                </nav>
              ) : (
                <UserAccountNav
                  user={{
                    name: user?.name,
                    image: user?.image,
                    email: user?.email,
                    //@ts-ignore
                    role: user?.role,
                  }}
                />
              )}
            </div>
          </header>
          <Providers>
            <Analytics />
            {children}
          </Providers>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
