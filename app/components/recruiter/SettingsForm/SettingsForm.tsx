"use client"

import * as React from "react"

import { UserSubscriptionPlan } from "types"
import { cn, formatDate } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { Toaster } from "../../ui/toaster"
import { Icons } from "../../Icons/Icons"
import toast from "react-hot-toast"
import { Recruiter } from "@prisma/client"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Textarea } from "../../ui/textarea"
import { LoaderIcon } from "lucide-react"

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  userId: string
  recruiter: Recruiter
}

const profileFormSchema = z.object({
  companyName: z
    .string()
    .min(2, {
      message: "companyName must be at least 2 characters.",
    })
    .max(60, {
      message: "companyName must not be longer than 60 characters.",
    }),
  website: z
    .string()
    .min(2, {
      message: "website must be at least 2 characters.",
    })
    .max(30, {
      message: "website must not be longer than 30 characters.",
    }),
  bio: z
    .string()
    .min(2, {
      message: "Bio must be at least 2 characters.",
    })
    .max(500, {
      message: "Bio must not be longer than 500 characters.",
    }),
  jobTitle: z
    .string()
    .min(2, {
      message: "jobTitle must be at least 2 characters.",
    })
    .max(500, {
      message: "jobTitle must not be longer than 500 characters.",
    }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function SettingsForm({
  recruiter,
  userId,
  className,
  ...props
}: BillingFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const router = useRouter()

  const recruiterId = (recruiter?.id).toString()

  const defaultValues: Partial<ProfileFormValues> = {
    companyName: recruiter?.companyName || undefined,
    website: recruiter?.website || undefined,
    bio: recruiter?.bio || undefined,
    jobTitle: recruiter?.jobTitle || undefined,
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData()
    formData.append("bio", data.bio)
    formData.append("companyName", data.companyName)
    formData.append("jobTitle", data.jobTitle)
    formData.append("website", data.website)
    formData.append("recruiterId", recruiterId)

    setIsLoading(true)

    const recruiter = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/recruiter/update-recruiter-profile`,
      {
        body: formData,
        method: "POST",
      }
    )

    setIsLoading(false)

    if (recruiter.ok) {
      toast.success("Profile updated")

      router.push("/dashboard/recruiter")
    }

    toast.error("Error, please retry")
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ")
  }

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          className={cn(className)}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Settings</CardTitle>
              <CardDescription>
                Enter your informations below to update your account
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company name </FormLabel>
                    <FormControl>
                      <Input placeholder="Avocado Growth" {...field} />
                    </FormControl>
                    <FormMessage color="#FF0000" className="text-red-600 " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website </FormLabel>
                    <FormControl>
                      <Input placeholder="www.avocadogrowth.com" {...field} />
                    </FormControl>
                    <FormMessage color="#FF0000" className="text-red-600 " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job title </FormLabel>
                    <FormControl>
                      <Input placeholder="Talent recruiter" {...field} />
                    </FormControl>
                    <FormMessage color="#FF0000" className="text-red-600 " />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio </FormLabel>
                    <FormControl>
                      <Textarea
                        slot="12"
                        className="resize-none  h-64"
                        placeholder="Hey, I'm Mansour...."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage color="#FF0000" className="text-red-600 " />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                className={classNames(
                  isLoading ? "bg-gray-300 cursor-not-allowed" : ""
                )}
                disabled={isLoading}
              >
                {isLoading && (
                  <LoaderIcon className=" animate-spin mr-2 text-gray-200" />
                )}
                Update account
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </>
  )
}
