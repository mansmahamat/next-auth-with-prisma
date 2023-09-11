import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const developerId = formData.get("developerId") as string

    const bio = formData.get("bio") as string
    const website = formData.get("website") as string
    const github = formData.get("github") as string
    const linkedin = formData.get("linkedin") as string
    const twitter = formData.get("twitter") as string
    const mastodon = formData.get("mastodon") as string
    const developerIdNumber = Number(developerId)

    const updateDeveloper = await prisma.developer.update({
      where: {
        id: developerIdNumber,
      },
      data: {
        website,
        github,
        linkedin,
        twitter,
        mastodon,
      },
    })

    return new Response(JSON.stringify({ message: "Socials updated" }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error:", error)

    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}
