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
import { Developer, Experience } from "@prisma/client"
import { CalendarIcon, LoaderIcon, PlusIcon } from "lucide-react"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
  useState,
} from "react"
import { ExperienceCard } from "../experience-card/ExperienceCard"

const profileFormSchema = z.object({
  // bio: z.string().max(160).min(4),
  experience: z
    .array(
      z.object({
        //   value: z.string().url({ message: "Please enter a valid URL." }),
        start: z.date(),
        end: z.date(),
        companyName: z.string(),
        role: z.string(),
        isCurrentRole: z.boolean().default(false).optional(),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface DeveloperWithExperience extends Developer {
  experiences: Experience[]
}

type ProfileFormProps = {
  userId: string
  developer: any
}

export function EditExperienceForm({ userId, developer }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const developerId = (developer?.id).toString()
  const { toast } = useToast()
  const router = useRouter()
  // This can come from your database or API.
  // const defaultValues: Partial<ProfileFormValues> = {
  //   experience: developer?.experiences.map((experience: Experience) => ({
  //     start: experience.start,
  //     end: experience.end,
  //     companyName: experience.companyName,
  //     role: experience.role,
  //     isCurrentRole: experience.isCurrentRole,
  //   })) || [
  //     {
  //       start: "",
  //       end: "",
  //       companyName: "",
  //       role: "",
  //       isCurrentRole: false,
  //     },
  //   ],
  // }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    //  defaultValues,
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "experience",
    control: form.control,
  })

  async function onSubmit(data: ProfileFormValues) {
    // const formData = new FormData()
    // formData.append("bio", data.bio)
    // formData.append("developerId", developerId)

    setIsLoading(true)

    const developer = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/update-experience`,
      {
        body: JSON.stringify({ experiences: data.experience, developerId }),
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

  async function handleDeleteExperience(id: string) {
    const developer = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/delete-experience`,
      {
        body: JSON.stringify({ experienceId: id }),
        method: "POST",
      }
    )
    if (developer.ok) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated.",
      })
      //   router.push("/dashboard/developer")
    }
    toast({
      title: "ERROR",
      description: "Your profile has been updated.",
    })
  }

  return (
    <>
      <ExperienceCard experience={developer.experiences} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            {fields.map((field, index) => (
              <>
                <FormField
                  control={form.control}
                  name={`experience.${index}.start`}
                  render={({ field }) => (
                    <FormItem className="flex my-8 flex-col">
                      <FormLabel>Start date</FormLabel>
                      <Popover>
                        <PopoverTrigger className=" z-0" asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field?.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto z-50 p-0"
                          align="center"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // @ts-ignore
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.end`}
                  render={({ field }) => (
                    <FormItem className="flex my-8 flex-col">
                      <FormLabel>End date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            className="z-50"
                            selected={field.value}
                            onSelect={field.onChange}
                            // @ts-ignore
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem className="my-8">
                      <FormLabel>Company </FormLabel>
                      <FormControl>
                        <Input placeholder="Spotify" {...field} />
                      </FormControl>

                      <FormMessage color="#FF0000" className="text-red-600 " />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`experience.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role </FormLabel>
                      <FormControl>
                        <Input placeholder="Frontend developer " {...field} />
                      </FormControl>

                      <FormMessage color="#FF0000" className="text-red-600 " />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.isCurrentRole`}
                  render={({ field }) => (
                    <FormItem className="flex my-8 flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Check if it's your current role</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() =>
                append({
                  // @ts-ignore

                  start: "",
                  // @ts-ignore

                  end: "",
                  companyName: "",
                  role: "",
                  isCurrentRole: false,
                })
              }
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add experiences
            </Button>
          </div>

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
    </>
  )
}
