import { DashboardShell } from "@/app/DashboardShell/DashboardShell"
import { CardSkeleton } from "@/app/components/CardSkeleton/CardSkeleton"
import { DashboardHeader } from "@/app/components/DashboardHeader/DashboardHeader"

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Billing"
        text="Manage billing and your subscription plan."
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  )
}
