import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // const page = page_str ? parseInt(page_str, 10) : 1;
  // const limit = limit_str ? parseInt(limit_str, 10) : 10;
  // const skip = (page - 1) * limit;
  const { searchParams } = new URL(request.url)

  const developers = await prisma.developer.findMany({
    orderBy: {
      id: "asc", // Use 'asc' for ascending order, or 'desc' for descending order
    },
    include: {
      user: true, // Include the associated User data
    },
  })

  return NextResponse.json(developers, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
