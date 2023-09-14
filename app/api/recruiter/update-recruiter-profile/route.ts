import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const bio = formData.get("bio") as string
    const companyName = formData.get("companyName") as string
    const recruiterId = formData.get("recruiterId") as string
    const jobTitle = formData.get("jobTitle") as string
    const website = formData.get("website") as string
    const recruiterIdNumber = Number(recruiterId)

    const updateRecruiter = await prisma.recruiter.update({
      where: {
        id: recruiterIdNumber,
      },
      data: {
        bio,
        companyName,
        jobTitle,
        website,
      },
    })

    return new Response(JSON.stringify({ message: "Profile updated" }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error:", error)

    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}
