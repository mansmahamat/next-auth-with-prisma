import { signOut } from "next-auth/react"
import { Button } from "../../ui/button"

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut()}
      className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Logout
    </Button>
  )
}
