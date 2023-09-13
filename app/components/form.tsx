"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import LoadingDots from "@/app/components/loading-dots"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "./Icons/Icons"

const profileFormSchema = z.object({
  // bio: z.string().max(160).min(4),
  email: z.string().email(),
  password: z.string().min(4),
  fullName: z.string().min(2).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function FormLogin({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  })

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true)
    if (type === "login") {
      signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        // @ts-ignore
      }).then(({ error }) => {
        if (error) {
          setLoading(false)
          toast.error(error)
        } else {
          router.refresh()
          router.push("/onboarding/step1")
        }
      })
    } else {
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          name: data.fullName,
          password: data.password,
        }),
      }).then(async (res) => {
        setLoading(false)
        if (res.status === 200) {
          toast.success("Account created! Redirecting to login...")
          setTimeout(() => {
            router.push("/login")
          }, 2000)
        } else {
          const { error } = await res.json()
          toast.error(error)
        }
      })
    }
  }

  return (
    <>
      <Toaster />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Jon@avocadogrowth.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {type === "register" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className={`${
              loading
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-black bg-emerald-700 text-white hover:bg-emerald-800 hover:text-white"
            } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
          >
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {<p>{type === "login" ? "Sign In" : "Sign Up"}</p>}
          </button>
          {type === "login" ? (
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-semibold text-gray-800">
                Sign up
              </Link>{" "}
              for free.
            </p>
          ) : (
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-gray-800">
                Sign in
              </Link>{" "}
              instead.
            </p>
          )}
        </form>
      </Form>
    </>
  )
}
