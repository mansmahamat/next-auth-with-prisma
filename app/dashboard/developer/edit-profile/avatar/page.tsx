import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AvatarProfileForm from "@/app/components/developer/avatarProfileForm/AvatarProfileForm"
import { EditBioForm } from "@/app/components/developer/edit-bio/EditBioForm"
import { EditProfileForm } from "@/app/components/developer/edit-profile/EditProfileForm"
import { Separator } from "@/app/components/ui/separator"
import { Upload } from "lucide-react"
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
        <h3 className="text-lg font-medium">Avatar</h3>
      </div>
      <Separator />
      <AvatarProfileForm user={session?.user} />
    </div>
  )
}

export default page
