"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import Select from "react-select"
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

import { Textarea } from "@/app/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter } from "next/navigation"
import { Developer } from "@prisma/client"
import { useEffect, useState } from "react"
import { frontendSkillsAndTools } from "@/utils/frontend-skills"
import { LoaderIcon } from "lucide-react"

const profileFormSchema = z.object({
  // bio: z.string().max(160).min(4),
  bio: z.string().min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

type ProfileFormProps = {
  userId: string
  developer: Developer
}

export function EditSkillsForm({ userId, developer }: ProfileFormProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const developerId = (developer?.id).toString()
  const { toast } = useToast()
  const router = useRouter()

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    bio: developer?.bio || undefined,
  }

  useEffect(() => {
    const skillsFromProps = developer?.skills
    setSelectedSkills(skillsFromProps)
  }, [developer?.skills])

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const handleChangeSkills = (selectedOptions: any) => {
    // Extract the values from selected options
    const selectedValues = selectedOptions.map((option: any) => option.value)

    // Update the state with the selected values
    setSelectedSkills(selectedValues)
  }

  const skillsFormatted = JSON.stringify(selectedSkills)

  async function onSubmit(data: ProfileFormValues) {
    // const formData = new FormData()
    // formData.append("bio", data.bio)
    // formData.append("developerId", developerId)
    setIsLoading(true)

    const developer = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/update-developer-profile-skills`,
      {
        body: JSON.stringify({
          selectedSkills,
          developerId,
        }),
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <Select
                  className="block w-full"
                  isMulti
                  placeholder="Select your skills"
                  //@ts-ignore
                  value={selectedSkills.map((skill: any) => ({
                    value: skill,
                    label: skill,
                  }))}
                  options={frontendSkillsAndTools}
                  onChange={handleChangeSkills}
                />
              </FormControl>
              <FormDescription>
                Feel free to update your skills as your knowledge grows!
              </FormDescription>
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
          Update
        </Button>
      </form>
    </Form>
  )
}
