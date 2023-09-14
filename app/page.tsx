/* eslint-disable react/no-unescaped-entities */
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { LoginButton, LogoutButton } from "./auth"
import { User } from "./user"
import Link from "next/link"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Icons } from "./components/Icons/Icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import DeveloperCaroussel from "./components/DeveloperCarousel/DeveloperCarousel"
import { ScrollArea } from "@/components/ui/scroll-area"

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

export default async function Home() {
  const session = await getServerSession(authOptions)
  const developers = await getDevelopersLimited()

  return (
    // <main>
    //   <LoginButton />
    //   <LogoutButton />
    //   <h2>Server Session</h2>
    //   <pre>{JSON.stringify(session)}</pre>
    //   <h2>Client Call</h2>
    //   <User />
    // </main>
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href="https://www.avocadogrowth.com"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Need a mentor ?
          </Link>
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to Avocado Growth
            <span className="font-bold"> Reverse Frontend Job Board</span>
          </h1>

          <p className=" leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Say goodbye to lengthy applications and waiting for responses. Here,
            developers take the lead, creating profiles that showcase their
            skills and expertise.
            <span className="">
              Recruiters and companies can then browse these profiles and
              connect directly with developers who match their requirements.
              It's a win-win situation for both sides.
            </span>
          </p>

          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {developers.length > 0 && (
        <section
          id="developers"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-12"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl mb-10 leading-[1.1] sm:text-3xl md:text-4xl">
              New frontend developers on Avocado Job board
            </h2>
            <div className="overflow-hidden">
              <DeveloperCaroussel developerFeatured={developers} />
            </div>
          </div>
        </section>
      )}
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Benefits
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Unlock a world of opportunity with our innovative Reverse Job Board
            – a game-changing platform designed to empower job seekers like
            never before. We've flipped the script on traditional job searching,
            putting you in control and giving you the upper hand in your career
            journey.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Job Seekers Take the Lead</h3>
                <p className="text-sm text-muted-foreground">
                  In our Reverse Job Board, you shine. Employers come to you,
                  valuing your skills with tailored offers.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Skill-Centric Matching:</h3>
                <p className="text-sm">
                  Our platform connects you with employers looking for specific
                  talents, ensuring that your abilities are at the forefront of
                  your job search.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Effortless Networking</h3>
                <p className="text-sm text-muted-foreground">
                  Our platform facilitates networking with industry
                  professionals, providing you with the opportunity to expand
                  your professional network and gain valuable insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Simple, transparent pricing
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Skip the formal job postings – hire directly from a candidate pool
            of Frontend developers, from juniors to C-level.
          </p>
        </div>
        <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
          <div className="grid gap-6">
            <h3 className="text-xl font-bold sm:text-2xl">
              What&apos;s included in the PRO plan
            </h3>
            <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Exclusively Frontend
                developers
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Message directly with
                developers
              </li>

              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Email updates of new
                candidates
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Premium Support
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Access to Discord
              </li>
              <li className="flex items-center">
                <Icons.check className="mr-2 h-4 w-4" /> Premium Support
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center">
            <div>
              <h4 className="text-7xl font-bold">$150</h4>
              <p className="text-sm font-medium text-muted-foreground">
                Billed Monthly
              </p>
            </div>
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Does the job board cost anything for developers?
              </AccordionTrigger>
              <AccordionContent>
                No. The job board is free for developers.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I cancel my subscription at any time?
              </AccordionTrigger>
              <AccordionContent>
                Yes. You can cancel your subscription from the Billing link in
                the user drop-down. You will lose access to all paid features at
                the end of your billing period.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Who can I contact for more specific questions?
              </AccordionTrigger>
              <AccordionContent>
                Email the founder – that's me, Mansour! – with any questions.
                You can reach me at contact#avocadogrowth.com.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  )
}
