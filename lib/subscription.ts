// TODO: Fix this when we turn strict mode on.
import { UserSubscriptionPlan } from "types"
import { prisma } from "./prisma"
import { freePlan, proPlan } from "@/config/subscription"

export async function getUserSubscriptionPlan(
  userId: string
): Promise<UserSubscriptionPlan> {
  let userIdNum = Number(userId)
  const user = await prisma.user.findFirst({
    where: {
      id: userIdNum,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Check if user is on a pro plan.
  const isPro =
    user.stripePriceId &&
    //@ts-ignore
    user.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  const plan = isPro ? proPlan : freePlan

  return {
    ...plan,
    ...user,
    //@ts-ignore
    stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime(),
    //@ts-ignore
    isPro,
  }
}
