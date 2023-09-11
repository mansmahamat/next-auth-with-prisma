import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../../ui/button"
import { ChevronDownIcon, ComputerIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Experience } from "@prisma/client"
import moment from "moment"
import { MdWork } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs"
import { useRouter } from "next/navigation"

type ExperienceCardProps = {
  experience: Experience[]
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const router = useRouter()

  const handleDeleteExperience = async (experienceId: string) => {
    try {
      const response = await fetch(
        `/api/experience/delete-by-id/${experienceId}`,
        {
          method: "DELETE",
          body: JSON.stringify({ experienceId }),
        }
      )

      if (response.ok) {
        // Fetch updated experiences after deletion
        router.push("/dashboard/developer/edit-profile/experience")
      } else {
        console.error("Error deleting experience")
      }
    } catch (error) {
      console.error("Error deleting experience:", error)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Experiences</CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        {experience.map((experience: any, index) => (
          <CardContent key={index} className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <MdWork className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">
                    {experience.role} - {experience.companyName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {moment(experience?.start).format("DD/MM/YYYY")} -{" "}
                    {moment(experience?.end).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BsThreeDots className="h-6 w-6 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Action</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteExperience(experience.id)}
                    className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                  >
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
                    Update
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        ))}
      </Card>
    </>
  )
}
