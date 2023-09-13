import { getCurrentUser, isDeveloper } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const user = await getCurrentUser()
  const isDev = await isDeveloper()

  if (isDev) {
    redirect("/dashboard/developer")
  }

  redirect("/dashboard/recruiter")

  return (
    <div className="space-y-5 h-screen animate-pulse rounded-2xl bg-white/5 p-4">
      <div className="h-24 rounded-lg bg-gray-100/10"></div>
      <div className="space-y-3">
        <div className="h-8 w-3/5 rounded-lg bg-gray-400/10"></div>
        <div className="h-8 w-4/5 rounded-lg bg-gray-400/20"></div>
        <div className="h-8 w-2/5 rounded-lg bg-gray-400/20"></div>
        <div className="h-8 w-2/5 rounded-lg bg-gray-400/30"></div>
      </div>
    </div>
  )
}
