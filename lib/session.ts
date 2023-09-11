import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)

  return session?.user
}

async function getDeveloper(userId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/getDeveloperByUserId?userId=${userId}`
  )

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }

  return res.json()
}

export async function isDeveloper() {
  const session = await getServerSession(authOptions)

  //@ts-ignore
  const developer = await getDeveloper(session?.user?.id as string)

  return developer
}
