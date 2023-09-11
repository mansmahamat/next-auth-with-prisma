"use client"

import { signIn, signOut } from "next-auth/react"
import Link from "next/link"

export const LoginButton = () => {
  return (
    <Link className="py-2 px-2 bg-red-500 mr-5" href="/login">
      Sign in
    </Link>
  )
}

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Sign Out</button>
}
