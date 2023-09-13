/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import React from "react"
import { cookies } from "next/headers"
import { notFound, redirect } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { BellIcon, EyeOffIcon, PersonStandingIcon } from "lucide-react"
import { getCurrentUser } from "@/lib/session"

export const dynamic = "force-dynamic"

async function page() {
  //   const supabase = createServerComponentClient({ cookies })

  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }

  //@ts-ignore
  if (user?.role === "developer") {
    redirect("/dashboard/developer")
  }

  //@ts-ignore
  if (user?.role === "recruiter") {
    redirect("/dashboard/recruiter")
  }

  //   const mentor = await getMentor(user?.id as string)
  //   const mentee = await getMentee(user?.id as string)

  //   if (mentor) {
  //     redirect("/mentors/dashboard")
  //   }

  //   if (mentee) {
  //     redirect("/mentee/dashboard")
  //   }

  return (
    <div className="flex items-center justify-center h-screen">
      {" "}
      <div className="bg-white  sm:rounded-lg">
        <div className="py-5 sm:p-6">
          <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
            Choose Your Account Type
          </h3>
          <p className="mt-2  text-center text-sm text-gray-500">
            We need to know whether you want to sign up as a recruiter or a
            developer.
          </p>
          <p className="mt-2  text-center text-sm text-gray-500">
            Please select your account type below:
          </p>
          <div className="mt-5 mx-4 flex space-x-6 justify-between">
            <Link href="/onboarding/developer/step2">
              <Card className="w-full cursor-pointer rounded-lg hover:shadow-lg ">
                <CardHeader className="pb-3">
                  <CardTitle>I'm looking for work</CardTitle>
                  <CardDescription>You're a developer.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/onboarding/business/step2">
              <Card className="w-full cursor-pointer rounded-lg hover:shadow-lg ">
                <CardHeader className="pb-3">
                  <CardTitle>I'm hiring developers</CardTitle>
                  <CardDescription>
                    You're a recruiter or a company.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
