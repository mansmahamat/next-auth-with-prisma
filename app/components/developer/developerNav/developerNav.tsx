import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import LogoutButton from "../../logout/LogoutButton.tsx/LogoutButton"
import { User } from "@prisma/client"
import { Button } from "../../ui/button"

type Props = {
  user: User | undefined
}

export function UserNav({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10 border border-emerald-700">
            <AvatarImage src={user?.image!} alt={user?.name!} />
            <AvatarFallback className="text-emerald-700 font-extrabold">
              {user?.name!.split(" ").map((n) => n[0])}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-50" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Hey 👋 , {user?.name!} {user?.image}
            </p>

            <p className="text-xs leading-none text-muted-foreground">
              Developer
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {/* <Link href={`/mentor/${mentor?.slugify}`}>Your Profile</Link> */}

            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>Billing</DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link href="/mentors/dashboard/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/mentors">Mentors</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/en/blog">Blog</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/mentors/dashboard/connect-stripe">Stripe</Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
