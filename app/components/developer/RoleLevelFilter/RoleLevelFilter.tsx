import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { roleLevel } from "@/utils/role"
import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "lucide-react"
import React, { Fragment } from "react"

type Props = {
  selectedRoleLevel: string | null
  setSelectedRoleLevel: (setSelectedRoleLevel: string | null) => void
  handleOptionChangeRoleLevel: any
}

function Category({
  selectedRoleLevel,
  setSelectedRoleLevel,
  handleOptionChangeRoleLevel,
}: Props) {
  // const handleCategoryChange = (categoryValue: string) => {
  //   // Update the selectedCategory state
  //   setSelectedCategory(categoryValue)

  //   // Update the URL with the selected category as a query parameter
  //   const queryParams = new URLSearchParams(window.location.search)
  //   queryParams.set("category", categoryValue)
  //   const newUrl = `${window.location.pathname}?${queryParams.toString()}`
  //   window.history.pushState({ path: newUrl }, "", newUrl)
  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
        Category
        <ChevronDownIcon
          className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {roleLevel.map((category) => (
          <DropdownMenuItem
            key={category.value}
            //@ts-ignore
            value={category.value}
            //@ts-ignore
            onClick={(e) => setSelectedRoleLevel(category.value)}
            className={`cursor-pointer  px-2 py-2 hover:bg-emerald-200
                    ${
                      selectedRoleLevel === category.value && "bg-emerald-300"
                    }`}
          >
            {category.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Category
