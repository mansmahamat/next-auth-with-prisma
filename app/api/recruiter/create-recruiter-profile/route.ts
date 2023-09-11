import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const bio = formData.get("bio") as string
    const companyName = formData.get("companyName") as string
    const userId = formData.get("userId") as string
    const website = formData.get("website") as string
    const jobTitle = formData.get("jobTitle") as string
    const userIdNumber = Number(userId)

    // Upsert the developer
    const newDeveloper = await prisma.recruiter.create({
      data: {
        bio,
        companyName,
        website,
        jobTitle,
        user: {
          connect: {
            id: userIdNumber,
          },
        },
      },
    })

    const updateUser = await prisma.user.update({
      where: {
        id: userIdNumber,
      },
      data: {
        role: "recruiter",
      },
    })

    return new Response(JSON.stringify({ message: "Recruiter created" }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error:", error)

    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}
