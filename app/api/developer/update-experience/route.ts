import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const res = await request.json()

    const { experiences, developerId } = res
    const developerIdNumber = Number(developerId)

    const updatedExperiences = experiences.map(
      (exp: {
        start: string | number | Date
        end: string | number | Date
        companyName: any
        role: any
        isCurrentRole: any
      }) => ({
        start: new Date(exp.start),
        end: exp.end ? new Date(exp.end) : null,
        companyName: exp.companyName,
        role: exp.role,
        isCurrentRole: exp.isCurrentRole,
      })
    )

    const newDeveloper = await prisma.developer.update({
      where: { id: developerIdNumber },
      data: { experiences: { create: updatedExperiences } },
    })

    // Upsert the developer
    // const newDeveloper = await prisma.developer.create({
    //   data: {
    //     bio,
    //     //@ts-ignore
    //     roleLevel,
    //     country,
    //     city,
    //     user: {
    //       connect: {
    //         id: userIdNumber,
    //       },
    //     },
    //   },
    // })

    return new Response(
      JSON.stringify({ message: "Experiences added successfully" }),
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error("Error:", error)

    return new Response(JSON.stringify({ error }), {
      status: 500,
    })
  }
}
