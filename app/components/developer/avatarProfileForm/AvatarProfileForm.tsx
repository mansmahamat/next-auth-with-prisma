"use client"

import React, { ChangeEvent, useState } from "react"
import Image from "next/image"
import { Input } from "../../ui/input"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { User } from "next-auth"
import { Skeleton } from "@/components/ui/skeleton"

const AvatarProfileForm = ({ user }: any) => {
  const [imageUploaded, setImageUploaded] = useState()
  const [imageUrl, setImageUrl] = useState(
    user?.image || "/Profile_avatar_placeholder_large.png"
  )
  const [loading, setLoading] = useState(false) // Loading state

  const router = useRouter()

  const handleChange = (event: any) => {
    setImageUploaded(event.target.files[0])
  }

  // const onSubmit = (data: any) => submitData(data)

  // const submitData = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault()
  //   console.log("imageUploaded", imageUploaded)
  //   if (!imageUploaded) {
  //     console.log("null")
  //     return
  //   }

  //   try {
  //     setLoading(true) // Set loading to true before the fetch request

  //     const formData = new FormData()
  //     formData.append("image", imageUploaded)
  //     formData.append("userId", user?.id)

  //     const result = await fetch("/api/upload", {
  //       method: "POST",
  //       body: formData,
  //     })

  //     // Reset loading state when the request is complete
  //     setLoading(false)
  //   } catch (error) {
  //     console.error(error)
  //     setLoading(false) // Reset loading state in case of an error
  //   }
  // }

  const onImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target

    if (!fileInput.files) {
      console.warn("no file was chosen")
      return
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty")
      return
    }

    const file = fileInput.files[0]

    const formData = new FormData()
    formData.append("file", file)
    formData.append("userId", user?.id)

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        console.error("something went wrong, check your console.")
        return
      }

      const data: { fileUrl: string } = await res.json()

      setImageUrl(data.fileUrl)
      router.push("/dashboard/developer")
    } catch (error) {
      console.error("something went wrong, check your console.")
    }

    /** Reset file input */
    e.target.type = "text"
    e.target.type = "file"
  }

  return (
    <div className=" ">
      <div className="flex flex-col my-24 items-center justify-center ">
        <div>
          <form className="page">
            <label>
              {loading ? ( // Conditionally render a loader when loading is true
                <div className="flex flex-col justify-center">
                  <div className="flex mb-8 items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                  <p className="text-center mb-4">Loading...</p>
                </div>
              ) : (
                <Image
                  src={imageUrl}
                  alt="uploaded image a"
                  width={350}
                  height={330}
                  priority={true}
                  className={cn(
                    "object-cover mb-8 transition-all hover:scale-105"
                  )}
                />
              )}
              <Input type="file" onChange={onImageFileChange} />
            </label>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AvatarProfileForm
