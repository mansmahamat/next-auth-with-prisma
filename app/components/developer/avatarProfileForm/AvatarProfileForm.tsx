"use client"

import React, { ChangeEvent, useState } from "react"
import Image from "next/image"
import { Input } from "../../ui/input"
import { cn } from "@/lib/utils"
import { redirect, useRouter } from "next/navigation"
import { User } from "next-auth"
import toast, { Toaster } from "react-hot-toast"

import ImageUploading, { ImageListType } from "react-images-uploading"

import { LoaderIcon, UserCircleIcon } from "lucide-react"
import { uploadImage } from "@/utils/cloudinary"
import { PutBlobResult } from "@vercel/blob"

const AvatarProfileForm = ({ user, slug }: any) => {
  const [imageUploaded, setImageUploaded] = useState()
  const [imageUrl, setImageUrl] = useState(
    user?.image || "/Profile_avatar_placeholder_large.png"
  )
  const [loading, setLoading] = useState(false) // Loading state
  const [images, setImages] = useState<ImageListType>([])
  const [isLoading, setIsLoading] = useState(false)
  const [blob, setBlob] = useState<PutBlobResult | null>(null)
  const router = useRouter()

  const handleChange = (event: any) => {
    setImageUploaded(event.target.files[0])
  }

  const onChange = (imageList: ImageListType) => {
    setImages(imageList)
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

  const submitAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const image = images[0]
    const file = image?.file

    const response = await fetch(
      `/api/avatar/upload?filename=${file?.name}&userId=${user?.id}`,
      {
        method: "POST",
        body: file,
      }
    )
    setIsLoading(false)

    if (response.ok) {
      toast.success("Avatar change")
      router.push(`/developer/${slug}`)
    } else {
      toast.error("Please retry")
    }
    const newblob = (await response.json()) as PutBlobResult
  }

  return (
    <>
      <Toaster />
      <div className=" ">
        <div className="flex flex-col my-24 items-center justify-center ">
          <div>
            {/* @ts-ignore */}
            <form onSubmit={submitAvatar} className="page">
              {/* <label>
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
            </label> */}
              <div className=" flex  flex-col">
                {images.length > 0 && (
                  <Image
                    src={images[0]["data_url"]}
                    alt="avatar"
                    width={200}
                    height={200}
                    className={cn(
                      "h-[220px] w-auto object-cover object-center transition-al aspect-square hover:scale-105"
                    )}
                  />
                )}
                <ImageUploading
                  multiple={false}
                  value={images}
                  onChange={onChange}
                  maxNumber={1}
                  acceptType={["jpg", "png", "jpeg", "svg"]}
                  dataURLKey="data_url"
                  maxFileSize={4000000}
                >
                  {({
                    onImageUpload,
                    onImageRemoveAll,
                    isDragging,
                    dragProps,
                    errors,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper justify-center  mb-7 flex  items-center rounded-lg  text-base">
                      {images.length === 0 ? (
                        <div className=" flex  flex-col space-y-3 items-center">
                          <UserCircleIcon
                            onClick={onImageUpload}
                            className="h-12 w-12 text-emerald-600"
                            aria-hidden="true"
                          />
                          <Input onClick={onImageUpload} type="file" />
                        </div>
                      ) : (
                        <button
                          className=" text-red-600 font-bold mt-2  space-y-3 items-center"
                          onClick={onImageRemoveAll}
                        >
                          Remove image
                        </button>
                      )}
                      {errors && (
                        <div>
                          <span>Selected file size exceed maxFileSize</span>
                        </div>
                      )}
                    </div>
                  )}
                </ImageUploading>
                <button
                  type="submit"
                  className="rounded-md flex justify-center bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {isLoading && (
                    <LoaderIcon className=" animate-spin mr-2 text-gray-200" />
                  )}
                  Save
                </button>
                {/* <button
                        type="button"
                        disabled={images.length === 0}
                        className={
                          "inline-flex  items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 mt-6" +
                          (images.length === 0 &&
                            "bg-slate-500 mt-6 cursor-not-allowed")
                        }
                        //      onClick={uploadProfilePicture}
                      >
                        Save my profile picture
                      </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvatarProfileForm
