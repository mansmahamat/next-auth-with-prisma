import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ProfileForm } from "@/app/components/business/profile-form/profile-form"
import { getServerSession } from "next-auth"
import React from "react"

async function page() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const userId = session?.user?.id as string

  return (
    <div>
      <ProfileForm userId={userId} />
    </div>
  )
}

export default page
