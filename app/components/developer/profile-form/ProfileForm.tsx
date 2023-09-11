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
import { useEffect, useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  ArrowDown,
  ArrowUp,
  ArrowUpToLine,
  CheckIcon,
  SortAsc,
} from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete"

const profileFormSchema = z.object({
  hero: z
    .string()
    .min(2, {
      message: "Hero must be at least 2 characters.",
    })
    .max(60, {
      message: "Hero must not be longer than 30 characters.",
    }),
  city: z.string().optional(),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters.",
    })
    .max(30, {
      message: "Country must not be longer than 30 characters.",
    })
    .optional(),
  bio: z.string().max(160).min(4),
  roleLevel: z.enum(["Junior", "Mid-level", "Senior", "C-level"], {
    required_error: "You need to select a notification type.",
  }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//   description: "I own a computer.",
//   urls: [
//     { value: "https://shadcn.com" },
//     { value: "http://twitter.com/shadcn" },
//   ],
// }

type ProfileFormProps = {
  userId: string
  fullName: string | null | undefined
}

export function ProfileForm({ userId, fullName }: ProfileFormProps) {
  const { toast } = useToast()
  const router = useRouter()

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedCountryCode, setSelectedCountryCode] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  useEffect(() => {
    // Fetch list of countries from REST Countries API
    fetch("https://restcountries.com/v3/all")
      .then((response) => response.json())
      .then((data) => {
        const countryData = data.map(
          (country: { name: { common: any }; cca2: string }) => ({
            name: country.name.common,
            code: country.cca2,
          })
        )

        // Sort the countries alphabetically by name
        countryData.sort((a: { name: string }, b: { name: any }) =>
          a.name.localeCompare(b.name)
        )
        setCountries(countryData)
      })
      .catch((error) => {
        console.error("Error fetching countries:", error)
      })
  }, [])

  const handleCountryChange = (event: { target: { value: any } }) => {
    const selectedCountry = event.target.value
    setSelectedCountry(selectedCountry)
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    //  defaultValues,
    mode: "onChange",
  })

  const watch = form.watch()

  async function onSubmit(data: ProfileFormValues) {
    const formData = new FormData()
    formData.append("fullName", fullName!)
    formData.append("city", selectedCity)
    formData.append("bio", data.bio)
    formData.append("hero", data.hero)
    formData.append("userId", userId)
    formData.append("roleLevel", data.roleLevel)
    // @ts-ignore
    formData.append("country", data.country)
    const developer = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}api/developer/create-developer-profile`,
      {
        body: formData,
        method: "POST",
      }
    )
    if (developer.ok) {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated.",
      })
      router.push("/dashboard/developer")
    }
    toast({
      title: "ERROR",
      description: "Your profile hasn't been updated.",
    })

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="hero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero</FormLabel>
              <FormControl>
                <Input placeholder="100x dev React JS" {...field} />
              </FormControl>
              <FormDescription>This is your profile name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? countries.find(
                            //@ts-ignore
                            (language) => language.name === field.value
                            //@ts-ignore
                          )?.name
                        : "Select country"}
                      <ArrowDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="  max-h-60 overflow-y-scroll">
                      {countries.map(
                        (language: { name: string; code: string }) => (
                          <CommandItem
                            className=" overflow-y-scroll"
                            //@ts-ignore
                            value={language.name}
                            //@ts-ignore

                            key={language.name}
                            onSelect={() => {
                              //@ts-ignore

                              form.setValue("country", language.name)

                              setSelectedCountryCode(language.code)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                //@ts-ignore

                                language.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {/* @ts-ignore */}

                            {language.name}
                          </CommandItem>
                        )
                      )}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        {selectedCountryCode && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              City
            </label>
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              onPlaceSelected={(place) => {
                setSelectedCity(place.address_components[0].long_name)
              }}
              options={{
                componentRestrictions: { country: selectedCountryCode },
              }}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
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
        >
          Create profile
        </Button>
      </form>
    </Form>
  )
}
