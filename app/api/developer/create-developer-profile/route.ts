import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const bio = formData.get("bio") as string
    const city = formData.get("city") as string
    const hero = formData.get("hero") as string
    const userId = formData.get("userId") as string
    const country = formData.get("country") as string
    const roleLevel = formData.get("roleLevel") as string
    const fullName = formData.get("fullName") as string
    const userIdNumber = Number(userId)

    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "")

    const slug = slugify(fullName)
    // Upsert the developer
    const newDeveloper = await prisma.developer.create({
      data: {
        bio,
        //@ts-ignore
        roleLevel,
        country,
        hero,
        city,
        fullName,
        slug,
        devStatus: "active",
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
        role: "developer",
      },
    })

    return new Response(JSON.stringify({ message: "Developer created" }), {
      status: 200,
    })
  } catch (error) {
    console.error("Error:", error)

    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}
