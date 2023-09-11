"use client"

import { Tabs, TabsContent } from "@/components/ui/tabs"
import { HomeIcon, SchoolIcon } from "lucide-react"
import Head from "next/head"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { UserNav } from "../../developerNav/developerNav"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import { NavDashboard } from "./nav-dashboard"

const navigation = [
  { name: "Home", href: "/mentee/dashboard", icon: HomeIcon, current: true },
  { name: "Mentors", href: "/mentors", icon: SchoolIcon, current: false },
  // {
  //   name: "Favorites",
  //   href: "/mentee/dashboard/favorites",
  //   icon: HeartIcon,
  //   current: false,
  // },
  // {
  //   name: "All sessions",
  //   href: "/mentee/dashboard/all-sessions",
  //   icon: UserGroupIcon,
  //   current: false,
  // },
  // {
  //   name: "Subscriptions",
  //   href: "/mentee/dashboard/payment",
  //   icon: FaDollarSign,
  //   current: false,
  // },
]
const teams = [
  { name: "Engineering", href: "#", bgColorClass: "bg-emerald-500" },
  { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
  { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
]
const projects = [
  {
    id: 1,
    title: "GraphQL API",
    initials: "GA",
    team: "Engineering",
    members: [
      {
        name: "Dries Vincent",
        handle: "driesvincent",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        handle: "lindsaywalton",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        handle: "courtneyhenry",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        handle: "tomcook",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
    totalMembers: 12,
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  // More projects...
]
const pinnedProjects = projects.filter((project) => project.pinned)

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

type Props = {
  children: ReactNode
  user: any
}

export default async function DeveloperLayout({ children, user }: Props) {
  //   const supabase = createClientComponentClient()

  //   const [sidebarOpen, setSidebarOpen] = useState(false)
  //   const [open, setOpen] = useState(false)
  //   const [notification, setNotification] = useState(
  //     mentee?.is_message_notification || false
  //   )

  const router = useRouter()

  //   const meta = {
  //     title: "Avocado Growth",
  //     description:
  //       "Unlock your full potential with Avocado Growth, the mentoring platform that connects you with experienced mentors for personal and professional development. Get guidance, gain insights, and achieve your goals all in one place.",
  //     cardImage: "/og.png",
  //     ...pageMeta,
  //   }

  //@ts-ignore
  //   useEffect(() => {
  //     // subscribe to real-time changes in 'messages' table
  //     const subscription = supabase
  //       .channel("any")
  //       .on(
  //         "postgres_changes",
  //         { event: "INSERT", schema: "public", table: "messages" },
  //         (payload) => {
  //           setNotification(true)
  //           saveNotifications()

  //           //      fetchMessages()
  //         }
  //       )
  //       .subscribe()

  //     // fetch initial messages
  //     // saveNotifications()

  //     // clean up subscription on unmount
  //     return () => subscription.unsubscribe()
  //   }, [])

  return (
    <>
      {/* <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <link rel="manifest" href="/path-to/manifest.json" />
        <link href="/favicon.png" rel="shortcut icon" />
        <meta content={meta.description} name="description" />

        <meta property="og:url" content={`https://www.avocadogrowth.com`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.cardImage} />

        <meta name="twitter:card" content={meta.cardImage} />
        <meta name="twitter:site" content="@avocadogrowth" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.cardImage} />
      </Head> */}
      <div className="min-h-full">
        {/* <ModalProfilePicture open={open} mentee={mentee} setOpen={setOpen} /> */}
        <div>
          <div className=" flex-col flex">
            <div className="border-b">
              <div className="flex h-16 items-center px-4">
                <NavDashboard className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                  {/* <Search /> */}
                  <UserNav user={user} />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 p-8 pt-6">
              <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              </div>
              <Tabs value="overview" className="space-y-4">
                <TabsContent value="overview" className="space-y-4">
                  {children}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
