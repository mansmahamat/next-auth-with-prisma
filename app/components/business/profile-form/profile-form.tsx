"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
import { toast } from "@/app/components/ui/use-toast"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { useRouter } from "next/navigation"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"

const profileFormSchema = z.object({
  companyName: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  website: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().min(4),
  jobTitle: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.

type ProfileFormProps = {
  userId: string
}

export function ProfileForm({ userId }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    // defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    const formData = new FormData()
    formData.append("companyName", data.companyName)
    formData.append("website", data.website)
    formData.append("jobTitle", data.jobTitle)
    formData.append("bio", data.bio)
    formData.append("userId", userId)

    const recruiter = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/recruiter/create-recruiter-profile`,
      {
        body: formData,
        method: "POST",
      }
    )
    setIsLoading(false)

    if (recruiter.ok) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated.",
      })

      router.push("/dashboard/recruiter")
    }

    toast({
      title: "ERROR",
      description: "Your profile has been updated.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Google" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="avocadogrowth.com" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job title or role</FormLabel>
              <FormControl>
                <Input placeholder="Talent people" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none  h-64"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="bg-emerald-700 text-white hover:bg-emerald-600"
          type="submit"
        >
          {isLoading && (
            <LoaderIcon className=" animate-spin mr-2 text-gray-200" />
          )}
          Create profile
        </Button>
      </form>
    </Form>
  )
}
