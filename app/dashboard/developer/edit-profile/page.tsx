import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { EditProfileForm } from "@/app/components/developer/edit-profile/EditProfileForm"
import { Separator } from "@/app/components/ui/separator"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import React from "react"

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

async function page() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const userId = session?.user?.id as string

  const developer = await getDeveloper(userId as string)

  if (!developer) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This information will be displayed publicly so be careful what you
          share.
        </p>
      </div>
      <Separator />
      <EditProfileForm userId={userId} developer={developer} />
    </div>
  )
}

export default page
