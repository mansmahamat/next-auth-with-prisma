import { DashboardNav } from "@/app/components/recruiter/DashboardNav/DashboardNav"
import { dashboardConfigDeveloper } from "@/config/dashboardDeveloper"
import { dashboardConfigRecruiter } from "@/config/dashboardRecruiter"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"

interface DashboardLayoutProps {
  children?: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background"></header>
      <div className="container grid md:flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className=" w-[200px] flex-col flex">
          <DashboardNav items={dashboardConfigDeveloper.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
