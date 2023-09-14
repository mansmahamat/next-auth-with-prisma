import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/session"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { DashboardShell } from "@/app/DashboardShell/DashboardShell"
import { DashboardHeader } from "@/app/components/DashboardHeader/DashboardHeader"
import { SettingsForm } from "@/app/components/recruiter/SettingsForm/SettingsForm"

export const metadata = {
  title: "Settings",
  description: "Update your info",
}

async function getRecruiter(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/recruiter/getRecruiter?userId=${userId}`
  )

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }

  return res.json()
}

export default async function BillingPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  //@ts-ignore
  const recruiter = await getRecruiter(user?.id as string)

  if (!recruiter) {
    redirect("/")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Update your info" />
      <div className="grid gap-8">
        {/* @ts-ignore */}
        <SettingsForm recruiter={recruiter} userId={user?.id} />
      </div>
    </DashboardShell>
  )
}
