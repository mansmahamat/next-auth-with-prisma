/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { Developer } from "@prisma/client"
import { LoaderIcon } from "lucide-react"
import { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const profileFormSchema = z.object({
  website: z.string().optional(),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  mastodon: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  userId: string
  developer: Developer
}

export function EditSocialsForm({ userId, developer }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const developerId = (developer?.id).toString()

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    website: developer?.website || "",
    github: developer?.github || "",
    linkedin: developer?.linkedin || "",
    twitter: developer?.twitter || "",
    mastodon: developer?.mastodon || "",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData()
    formData.append("website", data.website!)
    formData.append("github", data.github!)
    formData.append("linkedin", data.linkedin!)
    formData.append("twitter", data.twitter!)
    formData.append("mastodon", data.mastodon!)
    formData.append("developerId", developerId)

    setIsLoading(true)

    const developer = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/update-developer-profile-socials`,
      {
        body: formData,
        method: "POST",
      }
    )

    setIsLoading(false)

    if (developer.ok) {
      toast.success("Profile updated")

      router.refresh()
    }

    if (!developer.ok) {
      toast.error("Error please retry")
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <>
      <Toaster />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Frontend developer with expert-level experience in React"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage color="#FF0000" className="text-red-600 " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Frontend developer with expert-level experience in React"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage color="#FF0000" className="text-red-600 " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Frontend developer with expert-level experience in React"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage color="#FF0000" className="text-red-600 " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Frontend developer with expert-level experience in React"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage color="#FF0000" className="text-red-600 " />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mastodon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mastodon </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Frontend developer with expert-level experience in React"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage color="#FF0000" className="text-red-600 " />
              </FormItem>
            )}
          />
          {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div> */}
          <Button
            className="bg-emerald-700 text-white hover:bg-emerald-600"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <LoaderIcon className=" animate-spin mr-2 text-gray-200" />
            )}
            Update
          </Button>
        </form>
      </Form>
    </>
  )
}
