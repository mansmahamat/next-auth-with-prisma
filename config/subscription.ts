import { SubscriptionPlan } from "types"

export const freePlan: SubscriptionPlan = {
  name: "Free",
  description:
    "The free plan is limited to 4 developers profiles. Upgrade to the PRO plan for unlimited access.",
  stripePriceId: "",
}

export const proPlan: SubscriptionPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited access.",
  stripePriceId: process.env.STRIPE_PRO_MONTHLY_PLAN_ID || "",
}
