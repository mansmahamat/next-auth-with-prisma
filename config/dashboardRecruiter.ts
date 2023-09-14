import { DashboardConfig } from "types"

export const dashboardConfigRecruiter: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Home",
      href: "/dashboard/recruiter/",
      icon: "home",
    },
    {
      title: "Billing",
      href: "/dashboard/recruiter/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard/recruiter/settings",
      icon: "settings",
    },
  ],
}
