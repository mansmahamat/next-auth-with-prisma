/* eslint-disable react/no-unescaped-entities */
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
import { useToast } from "@/app/components/ui/use-toast"
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

const profileFormSchema = z.object({
  hero: z
    .string()
    .min(2, {
      message: "Hero must be at least 2 characters.",
    })
    .max(60, {
      message: "Hero must not be longer than 30 characters.",
    }),
  city: z
    .string()
    .min(2, {
      message: "City must be at least 2 characters.",
    })
    .max(30, {
      message: "City must not be longer than 30 characters.",
    }),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters.",
    })
    .max(30, {
      message: "Country must not be longer than 30 characters.",
    }),
  roleLevel: z.enum(["Junior", "Mid-level", "Senior", "C-level"], {
    required_error: "You need to select a role level type.",
  }),
  devStatus: z.enum(["active", "hidden"], {
    required_error: "You need to select a status type.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  userId: string
  developer: Developer
}

export function EditProfileForm({ userId, developer }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const developerId = (developer?.id).toString()

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    bio: developer?.bio || undefined,
    city: developer?.city || undefined,
    country: developer?.country || undefined,
    hero: developer?.hero || undefined,
    //@ts-ignore
    roleLevel: developer?.roleLevel || "Junior",
    //@ts-ignore
    devStatus: developer?.devStatus || "active",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData()
    formData.append("hero", data.hero)
    formData.append("city", data.city)
    formData.append("developerId", developerId)
    formData.append("roleLevel", data.roleLevel)
    formData.append("devStatus", data.devStatus)
    formData.append("country", data.country)

    setIsLoading(true)

    const developer = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/update-developer-profile`,
      {
        body: formData,
        method: "POST",
      }
    )

    setIsLoading(false)

    if (developer.ok) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated.",
      })
      router.push("/dashboard/developer")
    }

    toast({
      title: "ERROR",
      description: "Your profile has been updated.",
    })
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero </FormLabel>
              <FormControl>
                <Input
                  placeholder="Frontend developer with expert-level experience in React"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Summarize yourself as a developer in a few words.
              </FormDescription>
              <FormMessage color="#FF0000" className="text-red-600 " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Tokyo" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Japan" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roleLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Role level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Junior" />
                    </FormControl>
                    <FormLabel className="font-normal">Junior</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Mid-level" />
                    </FormControl>
                    <FormLabel className="font-normal">Mid-level</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="Senior" />
                    </FormControl>
                    <FormLabel className="font-normal">Senior</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="C-level" />
                    </FormControl>
                    <FormLabel className="font-normal">C-level</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="devStatus"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="active" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Actively looking
                    </FormLabel>
                  </FormItem>
                  <FormDescription className="ml-7 text-gray-700 italic">
                    Your profile can get featured on the homepage.
                  </FormDescription>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="hidden" />
                    </FormControl>
                    <FormLabel className="font-normal">Hidden</FormLabel>
                  </FormItem>
                  <FormDescription className="ml-7 text-gray-700 italic">
                    Your profile is hidden and can only be seen by yourself.
                  </FormDescription>
                </RadioGroup>
              </FormControl>
              <FormMessage />
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
          className="bg-emerald-700 z-50 text-white hover:bg-emerald-600"
          type="submit"
        >
          {isLoading && (
            <LoaderIcon className=" animate-spin mr-2 text-gray-200" />
          )}
          Update
        </Button>
      </form>
    </Form>
  )
}
