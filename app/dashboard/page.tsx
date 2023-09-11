import { getCurrentUser, isDeveloper } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const user = await getCurrentUser()
  const isDev = await isDeveloper()

  console.log("AZERTY", user)

  return <>Super Secret Page</>
}
