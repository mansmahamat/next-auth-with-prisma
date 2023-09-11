import { DashboardConfig } from "types"

export const dashboardConfigDeveloper: DashboardConfig = {
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
      href: "/dashboard/developer",
      icon: "home",
    },
    {
      title: "Settings",
      href: "/dashboard/developer/edit-profile",
      icon: "settings",
    },
  ],
}
