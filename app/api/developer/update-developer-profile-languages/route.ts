import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    //  const formData = await request.formData()
    const res = await request.json()

    const { selectedLanguages, developerId } = res

    // const developerId = formData.get("developerId") as string
    // const bio = formData.get("bio") as string
    const developerIdNumber = Number(developerId)

    const updateDeveloper = await prisma.developer.update({
      where: {
        id: developerIdNumber,
      },
      data: {
        languages: selectedLanguages,
      },
    })

    return new Response(JSON.stringify({ message: "Bio updated" }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error:", error)

    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}
