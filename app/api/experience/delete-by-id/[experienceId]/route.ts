// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function DELETE(
  request: Request,
  { params }: { params: { experienceId: string } }
) {
  // const { experienceId } = res
  const experienceId = params.experienceId

  try {
    await prisma.experience.delete({
      where: { id: parseInt(experienceId!) },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error: any) {
    console.error("Error deleting experience:", error)
    let error_response = {
      status: "error",
      message: error.message,
    }
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
