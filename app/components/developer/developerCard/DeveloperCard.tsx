import { Button } from "@/components/ui/button"
import { UserSubscriptionPlan } from "@/types"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type Props = {}

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan?: UserSubscriptionPlan & {
    isCanceled: boolean
  }
  developer?: any
  index?: number
  favs?: any
  reviews?: any
  priceString?: string
  isSession?: boolean
  productName?: string | string[]
}

function DeveloperCard({
  developer,
  index,
  favs,
  reviews,
  priceString,
  isSession,
  productName,
  subscriptionPlan,
}: BillingFormProps) {
  return (
    <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
      <div className="relative">
        <Image
          height={520}
          priority={true}
          key={index}
          width={520}
          className="object-center h-[350px] object-cover rounded-xl w-full "
          src={developer?.avatar || "/Profile_avatar_placeholder_large.png"}
          alt="photo"
        />
        {/* <p className="absolute top-0 bg-emerald-500 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
          {!developer?.priceAmount ? (
            <span className="font-bold text-xl"> FREE </span>
          ) : (
            <span className="font-bold text-xl">
              $ {developer?.priceAmount / 100} / month
            </span>
          )}
        </p> */}
      </div>
      <div className=" flex items-center">
        <h1 className="mt-4 text-zinc-900 text-2xl font-bold cursor-pointer">
          {developer?.hero}
        </h1>

        {/* <span className="ml-2 mt-4">
          {getFlagByCountry(countries, developer?.country)}
        </span> */}
      </div>

      <div className="flex items-center">
        <p className="text-base text-zinc-900 font-normal">
          {developer?.job_title}
        </p>
      </div>
      <div className="my-4">
        {/* {JSON.parse(developer?.skills || "") && (
          <div className="flex flex-col space-x-1 ">
            <dd className="text-sm text-gray-900 flex justify-start flex-col flex-wrap">
              {JSON.parse(developer?.skills || "")
                .slice(0, 3)
                .map((skill: string, index: number) => (
                  <div key={index} className="flex  space-x-1 ">
                    <span className="bg-emerald-100 text-emerald-700 text-sm font-medium mr-2  my-2 px-2.5 py-0.5 rounded-full">
                     {skill}
                    </span>
                  </div>
                ))}
            </dd>
          </div>
        )} */}
        {subscriptionPlan?.isPro ? (
          <Button className="mt-4 text-xl w-full text-white bg-emerald-700 font-semibold py-2 rounded-xl shadow-lg">
            <a
              href={`mailto:${developer?.user?.email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get in touch
            </a>
          </Button>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="mt-4 text-xl w-full text-white bg-emerald-700 font-semibold py-2 rounded-xl shadow-lg">
                Get
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Subscribe to Access More Developer Profiles
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Subscribe to Access More Developer Profiles. nly paid users
                  can see more developer profiles. Subscribe to continue.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  <Link href="/pricing">Start hiring</Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  )
}

export default DeveloperCard
