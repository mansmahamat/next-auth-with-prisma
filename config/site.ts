type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Avocado Growth Frontend Job Board",
  description:
    "Say goodbye to lengthy applications and waiting for responses. Here, developers take the lead, creating profiles that showcase their skills and expertise.Recruiters and companies can then browse these profiles and connect directly with developers who match their requirements. It's a win-win situation for both sides.",
  url: "https://frontend-job-board.avocadogrowth.com",
  ogImage:
    "https://res.cloudinary.com/mansdesmez/image/upload/v1694597672/opengraph-image_d9s4ts.png",
  links: {
    twitter: "https://twitter.com/mans_js",
    github: "",
  },
}
