/* eslint-disable react/no-unescaped-entities */
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import DeveloperLayout from "@/app/components/developer/layout/dashboard/dashboard"
import { Developer } from "@prisma/client"
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

  const developer: Developer = await getDeveloper(userId as string)

  if (!developer) {
    redirect("/")
  }

  return (
    <div className="bg-emerald-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-24 md:px-8 md:flex md:items-center md:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-emerald-600">
            Start finding your developer today.
          </span>
        </h2>
        <div className="mt-8 flex md:mt-0 md:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href={`/developer/${developer?.slug}`}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              Visit your profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
