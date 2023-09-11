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
            We need to know whether you want to sign up as a mentor or a mentee.
          </p>
          <p className="mt-2  text-center text-sm text-gray-500">
            Please select your account type below:
          </p>
          <div className="mt-5 flex space-x-12 justify-between">
            <Link href="/onboarding/developer/step2">
              <Card className="w-full cursor-pointer rounded-lg hover:shadow-lg ">
                <CardHeader className="pb-3">
                  <CardTitle>I'm looking for work</CardTitle>
                  <CardDescription>
                    Choose what you want to be notified about.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <BellIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Everything
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Email digest, mentions & all activity.
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
                    <PersonStandingIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Available
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Only mentions and comments.
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <EyeOffIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Ignoring
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Turn off all notifications.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/onboarding/business/step2">
              <Card className="w-full cursor-pointer rounded-lg hover:shadow-lg ">
                <CardHeader className="pb-3">
                  <CardTitle>I'm hiring a developers</CardTitle>
                  <CardDescription>
                    Choose what you want to be notified about.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-1">
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <BellIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Everything
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Email digest, mentions & all activity.
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md bg-accent p-2 text-accent-foreground transition-all">
                    <PersonStandingIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Available
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Only mentions and comments.
                      </p>
                    </div>
                  </div>
                  <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
                    <EyeOffIcon className="mt-px h-5 w-5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Ignoring
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Turn off all notifications.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
