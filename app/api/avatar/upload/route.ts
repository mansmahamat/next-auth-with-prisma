import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url)
  const filename = searchParams.get("filename")
  const userId = searchParams.get("userId")
  const userIdNumber = Number(userId)

  //@ts-ignore
  const blob = await put(filename, request.body, {
    access: "public",
  })

  const updateUser = await prisma.user.update({
    where: {
      id: userIdNumber,
    },
    data: {
      image: blob?.url,
    },
  })

  const updateDev = await prisma.developer.update({
    where: {
      userId: userIdNumber,
    },
    data: {
      avatar: blob?.url,
    },
  })

  return NextResponse.json(blob)
}
