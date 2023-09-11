// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  // Create a Supabase client configured to use cookies
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const userIdInt = Number(userId)

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  // try {
  const user = await prisma.developer.findUnique({
    where: {
      userId: userIdInt,
    },
    include: {
      experiences: true,
    },
  })

  return NextResponse.json(user, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
