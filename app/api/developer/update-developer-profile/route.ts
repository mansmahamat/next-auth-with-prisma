import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const city = formData.get("city") as string
    const hero = formData.get("hero") as string
    const developerId = formData.get("developerId") as string
    const country = formData.get("country") as string
    const roleLevel = formData.get("roleLevel") as string
    const devStatus = formData.get("devStatus") as string
    const developerIdNumber = Number(developerId)

    const updateDeveloper = await prisma.developer.update({
      where: {
        id: developerIdNumber,
      },
      data: {
        //@ts-ignore
        roleLevel,
        hero,
        country,
        city,
        devStatus,
      },
    })

    return new Response(JSON.stringify({ message: "Developer updated" }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error:", error)

    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}
