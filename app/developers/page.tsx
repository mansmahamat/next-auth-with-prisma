import { Menu, Popover, Transition } from "@headlessui/react"
import { Developer } from "@prisma/client"
import { ChevronDownIcon, CrossIcon } from "lucide-react"
import React, { Fragment } from "react"
import DeveloperLayout from "../components/developer/layout/dashboard/dashboard"
import DevelopersLayout from "../components/developer/developersLayout/DevelopersLayout"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"

async function getDevelopers(isPro?: boolean) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/get-all-developers?isPro=${isPro}`
  )

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }

  return res.json()
}

async function getDevelopersLimited() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/get-all-developers-limited`
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
  const user = await getCurrentUser()

  const simpleDevelopers = await getDevelopersLimited()

  if (!user) {
    // Handle the case where there is no authenticated user
    // You can choose to display a message or redirect to a login page
    return (
      <div className=" h-full w-screen  overflow-hidden bg-gray-50">
        <DevelopersLayout developers={simpleDevelopers} />
      </div>
    )
  }

  //@ts-ignore
  const subscriptionPlan = await getUserSubscriptionPlan(user?.id)

  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  const developers = await getDevelopers(subscriptionPlan?.isPro)
  return (
    <div className=" h-full w-screen  overflow-hidden bg-gray-50">
      <DevelopersLayout
        developers={subscriptionPlan?.isPro ? developers : simpleDevelopers}
        subscriptionPlan={{
          ...subscriptionPlan,
          isCanceled,
        }}
      />
    </div>
  )
}

export default page
