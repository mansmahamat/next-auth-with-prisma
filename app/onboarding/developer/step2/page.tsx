import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ProfileForm } from "@/app/components/developer/profile-form/ProfileForm"
import { Separator } from "@/app/components/ui/separator"
import { getServerSession } from "next-auth"
import React from "react"

async function page() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const userId = session?.user?.id as string

  const fullName = session?.user?.name

  return (
    <div className="space-y-6 min-h-full">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm fullName={fullName} userId={userId} />
    </div>
  )
}

export default page
