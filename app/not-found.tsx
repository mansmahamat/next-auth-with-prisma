import Image from "next/image"
import Link from "next/link"
import React from "react"
import Logo from "@/images/logo.png"

function Error() {
  return (
    <main className="min-h-screen flex flex-col bg-white justify-center items-center sm:bg-[#733F1D]">
      <div className="flex justify-center mx-auto">
        <h1 className="text-10xl font-black text-[#D0DF60] tracking-widest">
          4
        </h1>
        <Image className="block h-56 w-auto" src={Logo} alt="Avocado Growth" />
        <h1 className="text-10xl font-black text-[#D0DF60] tracking-widest">
          4
        </h1>
      </div>

      <div className="bg-[#D0DF60] font-extrabold top-36 px-2 text-xl  py-2 sm:text-6xl rounded  absolute">
        Page Not Found
      </div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-black group focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-black group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block text-2xl font-black px-8 py-3 bg-[#D0DF60] border border-current">
            <Link href="/"> Home</Link>
          </span>
        </a>
      </button>
    </main>
  )
}

export default Error
