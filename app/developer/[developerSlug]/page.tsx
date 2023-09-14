/* eslint-disable react/no-unescaped-entities */
import { Container } from "@/app/components/Container/Container"
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MastodonIcon,
  TwitterIcon,
} from "@/app/components/SocialIcons"
import Education from "@/app/components/developer/Education"
import ProjectsDeveloper from "@/app/components/developer/ProjectsDeveloper"
import Resume from "@/app/components/developer/Resume"
import { Button } from "@/app/components/ui/button"

import logoAmazon from "@/images/aws.svg"
import { getCurrentUser } from "@/lib/session"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
//import { countries } from "@/utils/countries"
// import {
//   capitalizeFirstLowercaseRest,
//   formatTextIntoParagraphs,
//   getFlagByCountry,
// } from "@/utils/helpers"
import { MailIcon, MousePointerIcon, MousePointerSquare } from "lucide-react"
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
  PreviewData,
} from "next"
import Image from "next/image"
import Link from "next/link"
import { type } from "os"
import { ParsedUrlQuery } from "querystring"
import React from "react"
import { BsGeoFill } from "react-icons/bs"
import { MdEmail, MdLock } from "react-icons/md"

async function getDeveloperBySlug(developerSlug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/getDeveloperBySlug?developerSlug=${developerSlug}`
  )

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return null
  }

  return res.json()
}

//@ts-ignore
function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link href={""} className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-emerald-600 transition group-hover:fill-emerald-500 " />
    </Link>
  )
}

function Newsletter() {
  return (
    <form
      action="/thank-you"
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

async function DeveloperPage({
  params,
}: {
  params: { developerSlug: string }
}) {
  //  const paragraphs = formatTextIntoParagraphs(mentee?.bio || "")
  const developerSlug = params?.developerSlug

  const developer = await getDeveloperBySlug(developerSlug as string)

  const user = await getCurrentUser()

  if (!user) {
    // Handle the case where there is no authenticated user
    // You can choose to display a message or redirect to a login page
    return (
      <div className=" pb-24">
        <Container className="mt-9  ">
          <div className=" text-lg">
            <div className=" flex items-center space-x-3">
              <Image
                src={developer?.avatar || "/avatar.png"}
                alt=""
                width={150}
                height={150}
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="object-cover aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-800"
              />
              <div className="flex flex-col">
                <h1 className="text-4xl flex flex-col font-bold tracking-tight text-zinc-800  sm:text-5xl">
                  {developer?.hero}
                  <span className="text-xl mt-6 items-center flex">
                    {developer?.city}, {developer?.country}
                  </span>
                </h1>

                <div className="text-4xl mt-2 text-gray-900">
                  <div className="">
                    <dt className=" text-xl font-semibold "></dt>
                    <dd className="  text-sm flex  text-gray-900 items-center flex-wrap">
                      <span className="  text-xl font-medium mr-2  ">
                        Role level : {developer?.roleLevel}
                      </span>
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-6">
              <div className="bg-gray-100 hover:bg-gray-700 hover:text-gray-100 flex cursor-pointer items-center text-gray-700 text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full">
                <Link
                  href="/pricing"
                  className="bg-gray-100 hover:bg-gray-700 hover:text-gray-100 flex cursor-pointer items-center text-gray-700 text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full"
                >
                  <MdLock className="mr-3" /> Contact this dev
                </Link>
              </div>
            </div>

            <div className="bg-gray-100 mt-8  w-56 hover:bg-gray-700 hover:text-gray-100 flex cursor-pointer items-center text-gray-700 text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full">
              <Link
                href="/pricing"
                className=" flex cursor-pointer items-center  text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full"
              >
                <MdLock className="mr-3" /> Socials media
              </Link>
            </div>
            {/* {paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-6 prose dark:prose-invert">
              {paragraph}
            </p>
          ))} */}
            <p className="mt-6 prose dark:prose-invert">{developer?.bio}</p>
          </div>
        </Container>
        <Container className="mt-24  md:mt-28">
          <div className="mx-auto  grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            {developer?.experiences.length > 0 && (
              <div className="flex cursor-pointer flex-col gap-16">
                <Link className="flex flex-col gap-16" href="/pricing">
                  <div className="rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-700 hover:text-gray-100 text-gray-800  border border-emerald-700 p-6 ">
                    <h2 className="flex text-sm font-semibold  ">
                      <MdLock className="h-6  w-6 flex-none" />
                      <span className="ml-3 text-xl  font-semibold">
                        Experiences
                      </span>
                    </h2>
                    <ol className="mt-6  opacity-0 space-y-4">
                      <li className="flex gap-4">
                        {/* <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                       <MdWork className="h-8 w-8 text-muted-foreground" />
                     </div> */}
                        <dl className="flex flex-auto flex-wrap gap-x-2">
                          <dt className="sr-only">Company</dt>
                          <dd className="w-full flex-none text-sm font-bold  ">
                            Apple
                          </dd>
                          <dt className="sr-only">Role</dt>
                          <dd className="text-xs text-zinc-500 ">Developer</dd>
                          <dt className="sr-only">Date</dt>
                          <dd
                            className="ml-auto text-xs text-zinc-500 "
                            aria-label={`2021 until 2023`}
                          >
                            <time> 02/12/2021</time>{" "}
                            <span aria-hidden="true">—</span>{" "}
                            <time> 02/12/2023</time>
                          </dd>
                        </dl>
                      </li>
                    </ol>
                  </div>
                </Link>
              </div>
            )}
            <div className="space-y-10 lg:pl-16 xl:pl-24">
              {developer?.skills.length > 0 && (
                <div className="sm:col-span-2">
                  <dt className=" text-xl font-semibold ">Skills</dt>
                  <dd className=" mt-10 text-sm text-gray-900 flex flex-wrap">
                    {developer?.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="bg-emerald-100 text-emerald-700 text-lg font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </dd>
                </div>
              )}

              {developer?.languages.length > 0 && (
                <div className="sm:col-span-2">
                  <dt className=" text-xl font-semibold ">Languages</dt>
                  <dd className=" mt-10 text-sm text-gray-900 flex flex-wrap">
                    {developer?.languages.map(
                      (language: string, index: number) => (
                        <span
                          key={index}
                          className="bg-emerald-100 text-emerald-700 text-lg font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                        >
                          {language}
                        </span>
                      )
                    )}
                  </dd>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    )
  }

  //@ts-ignore
  const subscriptionPlan = await getUserSubscriptionPlan(user?.id)

  let isCanceled = false
  if (subscriptionPlan.isPro && subscriptionPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      //@ts-ignore
      subscriptionPlan.stripeSubscriptionId
    )
    isCanceled = stripePlan.cancel_at_period_end
  }

  return (
    <div className=" pb-24">
      <Container className="mt-9  ">
        <div className=" text-lg">
          <div className=" flex items-center space-x-3">
            <Image
              src={developer?.avatar || "/avatar.png"}
              alt=""
              width={150}
              height={150}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="object-cover aspect-square rounded-2xl bg-zinc-100 dark:bg-zinc-800"
            />
            <div className="flex flex-col">
              <h1 className="text-4xl flex flex-col font-bold tracking-tight text-zinc-800  sm:text-5xl">
                {developer?.hero}
                <span className="text-xl mt-6 items-center flex">
                  {developer?.city}, {developer?.country}
                </span>
              </h1>

              <div className="text-4xl mt-2 text-gray-900">
                <div className="">
                  <dt className=" text-xl font-semibold "></dt>
                  <dd className="  text-sm flex  text-gray-900 items-center flex-wrap">
                    <span className="  text-xl font-medium mr-2  ">
                      Role level : {developer?.roleLevel}
                    </span>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-6">
            {subscriptionPlan?.isPro ? (
              <a
                href={`mailto:${developer?.user?.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-100 hover:bg-emerald-700 hover:text-emerald-100 flex cursor-pointer items-center text-emerald-700 text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full"
              >
                <MailIcon className="mr-3" /> Contact this dev
              </a>
            ) : (
              <div className="bg-gray-100 hover:bg-gray-700 hover:text-gray-100 flex cursor-pointer items-center text-gray-700 text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full">
                <Link
                  href="/pricing"
                  className="bg-gray-100 hover:bg-gray-700 hover:text-gray-100 flex cursor-pointer items-center text-gray-700 text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full"
                >
                  <MdLock className="mr-3" /> Contact this dev
                </Link>
              </div>
            )}
          </div>

          {subscriptionPlan?.isPro ? (
            <div className="mt-6 flex gap-6">
              {developer?.twitter && (
                <SocialLink
                  href={developer?.twitter}
                  aria-label="Follow on Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={TwitterIcon}
                />
              )}
              {developer?.mastodon && (
                <SocialLink
                  href={developer?.mastodon}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Mastodon"
                  icon={MastodonIcon}
                />
              )}

              {developer?.github && (
                <SocialLink
                  href={developer?.github}
                  aria-label="Follow on GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={GitHubIcon}
                />
              )}
              {developer?.linkedin && (
                <SocialLink
                  href={developer?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on LinkedIn"
                  icon={LinkedInIcon}
                />
              )}
            </div>
          ) : (
            <div className="bg-gray-100 mt-8  w-56 hover:bg-gray-700 hover:text-gray-100 flex cursor-pointer items-center text-gray-700 text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full">
              <Link
                href="/pricing"
                className=" flex cursor-pointer items-center  text-lg font-medium mr-2  px-2.5 py-0.5 rounded-full"
              >
                <MdLock className="mr-3" /> Socials media
              </Link>
            </div>
          )}
          {/* {paragraphs.map((paragraph, index) => (
            <p key={index} className="mt-6 prose dark:prose-invert">
              {paragraph}
            </p>
          ))} */}
          <p className="mt-6 prose dark:prose-invert">{developer?.bio}</p>
        </div>
      </Container>
      <Container className="mt-24  md:mt-28">
        <div className="mx-auto  grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          {developer?.experiences.length > 0 && (
            <div className="flex flex-col gap-16">
              {subscriptionPlan?.isPro ? (
                <Resume experiences={developer?.experiences} />
              ) : (
                <div className="rounded-2xl cursor-pointer bg-gray-100  hover:bg-gray-700 hover:text-gray-100 text-gray-800  border border-emerald-700 p-6 ">
                  <h2 className="flex text-sm font-semibold  ">
                    <MdLock className="h-6  w-6 flex-none" />
                    <span className="ml-3 text-xl  font-semibold">
                      Experiences
                    </span>
                  </h2>
                  <ol className="mt-6  opacity-0 space-y-4">
                    <li className="flex gap-4">
                      {/* <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                       <MdWork className="h-8 w-8 text-muted-foreground" />
                     </div> */}
                      <dl className="flex flex-auto flex-wrap gap-x-2">
                        <dt className="sr-only">Company</dt>
                        <dd className="w-full flex-none text-sm font-bold  ">
                          Apple
                        </dd>
                        <dt className="sr-only">Role</dt>
                        <dd className="text-xs text-zinc-500 ">Developer</dd>
                        <dt className="sr-only">Date</dt>
                        <dd
                          className="ml-auto text-xs text-zinc-500 "
                          aria-label={`2021 until 2023`}
                        >
                          <time> 02/12/2021</time>{" "}
                          <span aria-hidden="true">—</span>{" "}
                          <time> 02/12/2023</time>
                        </dd>
                      </dl>
                    </li>
                  </ol>
                </div>
              )}
            </div>
          )}
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {developer?.skills.length > 0 && (
              <div className="sm:col-span-2">
                <dt className=" text-xl font-semibold ">Skills</dt>
                <dd className=" mt-10 text-sm text-gray-900 flex flex-wrap">
                  {developer?.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-700 text-lg font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            )}

            {developer?.languages.length > 0 && (
              <div className="sm:col-span-2">
                <dt className=" text-xl font-semibold ">Languages</dt>
                <dd className=" mt-10 text-sm text-gray-900 flex flex-wrap">
                  {developer?.languages.map(
                    (language: string, index: number) => (
                      <span
                        key={index}
                        className="bg-emerald-100 text-emerald-700 text-lg font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                      >
                        {language}
                      </span>
                    )
                  )}
                </dd>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default DeveloperPage
