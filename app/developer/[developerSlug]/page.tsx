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

export const projects = [
  {
    name: "Mood",
    description: "Install and manage all the tools you need to be productive.",
    link: { href: "https://getfleek.dev", label: "getfleek.dev" },
    logo: logoAmazon,
  },
  {
    name: "Vanilla OS",
    description:
      "Vanilla OS is an immutable and atomic Ubuntu Linux-based Point Release distribution, that receives updates at the right time, neither before nor after, without sacrificing security and functionality.",
    link: { href: "https://vanillaos.org", label: "vanillaos.org" },
    logo: logoAmazon,
  },
  //   {
  //     name: "Captain Cook",
  //     description:
  //       "Creating technology to empower civilians to explore space on their own terms.",
  //     link: {
  //       href: "https://github.com/bketelsen/captainhook",
  //       label: "github.com",
  //     },
  //     logo: logoAmazon,
  //   },
  //   {
  //     name: "Kubernetes",
  //     description: "Production-Grade Container Scheduling and Management",
  //     link: {
  //       href: "https://github.com/kubernetes/kubernetes",
  //       label: "github.com",
  //     },
  //     logo: logoAmazon,
  //   },
  //   {
  //     name: "Go",
  //     description: "Build fast, reliable, and efficient software at scale",
  //     link: { href: "https://go.dev", label: "go.dev" },
  //     logo: logoAmazon,
  //   },
]

const skills = [
  "JavaScript",
  " HTML",
  " CSS",
  "Java",
  "C",
  "C++",
  "Android",
  "Dev web",
]

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

  return (
    <div className=" pb-24">
      {/* <NavbarModern isMentor={true} /> */}
      <Container className="mt-9  ">
        <div className=" text-lg">
          <div className=" flex items-center space-x-3">
            <Image
              src={developer?.avatar || "/avatar.png"}
              alt=""
              width={150}
              height={150}
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="object-cover aspect-square rotate-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800"
            />
            <h1 className="text-4xl flex flex-col font-bold tracking-tight text-zinc-800  sm:text-5xl">
              {developer?.hero}
              <span className="text-xl my-6 items-center flex">
                <BsGeoFill className="h-6 w-6 flex-none" />
                {developer?.city}, {developer?.country}
              </span>
            </h1>
            <div className="sm:col-span-1 mt-1 text-4xl text-gray-900">
              {/* {getFlagByCountry(countries, mentee?.country)} */}
            </div>
          </div>

          <div className="mt-6 flex gap-6">
            {developer?.twitter && (
              <SocialLink
                href={developer?.twitter}
                aria-label="Follow on Twitter"
                icon={TwitterIcon}
              />
            )}
            {developer?.mastodon && (
              <SocialLink
                href={developer?.mastodon}
                aria-label="Follow on Mastodon"
                icon={MastodonIcon}
                rel="me"
              />
            )}
            <SocialLink
              //    href={siteMeta.author.instagram}
              aria-label="Follow on Instagram"
              icon={InstagramIcon}
            />
            {developer?.github && (
              <SocialLink
                href={developer?.github}
                aria-label="Follow on GitHub"
                icon={GitHubIcon}
              />
            )}
            {developer?.linkedin && (
              <SocialLink
                href={developer?.linkedin}
                aria-label="Follow on LinkedIn"
                icon={LinkedInIcon}
              />
            )}
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
          <div className="flex flex-col gap-16">
            <Resume experiences={developer?.experiences} />
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            {/* <Newsletter /> */}
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

            {/* <Education /> */}
            {/* {mentee?.languages && (
              <div className="sm:col-span-2">
                <dt className=" text-xl font-semibold ">Languages</dt>
                <dd className=" mt-10 text-sm text-gray-900 flex flex-wrap">
                  {mentee?.languages.map((language: string, index: number) => (
                    <span
                      key={index}
                      className="bg-emerald-100 text-emerald-700 text-lg font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full"
                    >
                      {capitalizeFirstLowercaseRest(language)}
                    </span>
                  ))}
                </dd>
              </div>
            )} */}
            <div className="sm:col-span-2">
              <dt className=" text-xl font-semibold ">Role</dt>
              <dd className=" mt-10 text-sm text-gray-900 flex flex-wrap">
                <span className="bg-emerald-100 text-emerald-700 text-lg font-medium mr-2 mb-2 px-2.5 py-0.5 rounded-full">
                  {developer?.roleLevel}
                </span>
              </dd>
            </div>
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
