/* eslint-disable react/no-unescaped-entities */
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import DeveloperLayout from "@/app/components/developer/layout/dashboard/dashboard"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

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

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  //@ts-ignore
  const userId = session?.user?.id
  const user = session?.user

  const developer = await getDeveloper(userId as string)

  if (!developer) {
    redirect("/")
  }

  return (
    <div className="bg-white mb-12">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8">
        <div className="">
          <h2 className="text-base  font-semibold text-emerald-600 tracking-wide uppercase">
            Welcome {user?.name} on your Dashboard!
          </h2>
          <p className="max-w-xl mt-5   text-gray-500">
            As a mentee on our platform, this is your dedicated space to manage
            and enhance your mentoring experience. Here, you'll find a range of
            powerful tools and resources.
          </p>
          <p className="max-w-xl my-5  text-gray-500">
            Once you find a mentor you're interested in, click the "Contact"
            button to request a session with them. Our team will review your
            request and connect you with your chosen mentor if they're
            available.
          </p>

          <button
            type="button"
            className="inline-flex mb-12 items-center justify-center px-4 py-2 font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:text-sm"
          >
            <Link href="/dashboard/developer/edit-profile">
              Update your profile
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
