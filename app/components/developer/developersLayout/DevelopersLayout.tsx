"use client"

import React, { useState, useEffect, useRef, Fragment } from "react"
import DeveloperCard from "../developerCard/DeveloperCard"
import { Developer } from "@prisma/client"
import { Menu, Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon, CrossIcon } from "lucide-react"
import SkillsFilter from "../SkillsFilter/SkillsFilter"
import { ImCross } from "react-icons/im"
import RoleLevelFilter from "../RoleLevelFilter/RoleLevelFilter"
import { UserSubscriptionPlan } from "@/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import CountriesFilter from "../CountriesFilter/CountriesFilter"

type Props = {
  developers: Developer[]
}

interface BillingFormProps extends React.HTMLAttributes<HTMLFormElement> {
  subscriptionPlan?: UserSubscriptionPlan & {
    isCanceled: boolean
  }
  developers: Developer[]
}

function DevelopersLayout({ developers, subscriptionPlan }: BillingFormProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedRoleLevel, setSelectedRoleLevel] = useState<string | null>(
    null
  )
  const [currentPage, setCurrentPage] = useState(1)
  const developersPerPage = 4

  useEffect(() => {
    window.scrollTo(0, 0) // Scrolls to the top of the page whenever currentPage changes
  }, [currentPage])

  const resetFilters = () => {
    setSelectedOptions([])
    setSelectedCountries([])
    setSelectedRoleLevel(null)
  }
  const countries = [
    //@ts-ignore
    ...new Set(developers?.flatMap((developer) => developer?.country)),
  ]

  const allCountries = countries.flatMap(
    (countriesString) => countriesString ?? "[]"
  )

  //@ts-ignore

  const uniqueCountry = [...new Set(allCountries)].sort()

  const optionsCountries = uniqueCountry.map((skill) => ({
    value: skill,
    label: skill,
  }))

  const skills = [
    //@ts-ignore
    ...new Set(developers?.flatMap((developer) => developer?.skills)),
  ]

  const allSkills = skills.flatMap((skillString) => skillString ?? "[]")

  //@ts-ignore

  const uniqueSkills = [...new Set(allSkills)].sort()

  const optionsSkills = uniqueSkills.map((skill) => ({
    value: skill,
    label: skill,
  }))

  const filteredMentors =
    developers?.filter(
      //@ts-ignore

      (mentor) =>
        (selectedOptions.length === 0 ||
          selectedOptions.some((skill) => mentor?.skills?.includes(skill))) &&
        (selectedRoleLevel === null ||
          mentor.roleLevel === selectedRoleLevel) &&
        (selectedCountries.length === 0 ||
          selectedCountries.some((skill) => mentor?.country?.includes(skill)))
    ) ||
    //@ts-ignore

    []

  const handleOptionChange = (optionValue: string) => {
    //@ts-ignore

    const currentIndex = selectedOptions.indexOf(optionValue)
    const newSelectedOptions = [...selectedOptions]

    if (currentIndex === -1) {
      //@ts-ignore

      newSelectedOptions.push(optionValue)
    } else {
      newSelectedOptions.splice(currentIndex, 1)
    }

    setSelectedOptions(newSelectedOptions)
  }

  const handleOptionChangeCountries = (optionValue: string) => {
    //@ts-ignore

    const currentIndex = selectedCountries.indexOf(optionValue)
    const newSelectedOptions = [...selectedCountries]

    if (currentIndex === -1) {
      //@ts-ignore

      newSelectedOptions.push(optionValue)
    } else {
      newSelectedOptions.splice(currentIndex, 1)
    }

    setSelectedCountries(newSelectedOptions)
  }

  const handleOptionChangeRoleLevel = (optionValue: string) => {
    //@ts-ignore
    setSelectedRoleLevel(optionValue)
  }

  const levelRoleList: string[] = [
    //@ts-ignore
    ...new Set(
      developers?.flatMap((developer) =>
        developer.roleLevel ? [developer.roleLevel] : []
      )
    ),
  ]

  const totalPages = Math.ceil(filteredMentors.length / developersPerPage)

  const startIndex = (currentPage - 1) * developersPerPage
  const endIndex = startIndex + developersPerPage
  const displayedDevelopers = filteredMentors.slice(startIndex, endIndex)

  return (
    <section className="max-w-6xl min-h-screen mx-auto px-4 sm:px-6 lg:px-4 py-12">
      <div className="flex  sm:flex-row flex-col space-y-4 items-center justify-around">
        <Menu as="div" className="relative z-10 inline-block text-left">
          <div className=" flex items-center">
            {/* <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
              Sort
              <ChevronDownIcon
                className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </Menu.Button> */}
            <div
              onClick={resetFilters}
              className="ml-6 group  flex items-center  text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Reset
              <ImCross className=" text-red-600 cursor-pointer ml-1" />
            </div>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-left absolute bottom-0  mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {/* <div className="py-1 z-50">
                    {sortOptions.map((option, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <div
                            onClick={option.sort}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block cursor-pointer px-4 py-2 text-sm font-medium text-gray-900"
                            )}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div> */}
            </Menu.Items>
          </Transition>
        </Menu>

        <Popover.Group className="flex sm:flex-row space-x-4  justify-center flex-row items-center sm:space-x-8">
          <SkillsFilter
            optionsSkills={optionsSkills}
            selectedOptions={selectedOptions}
            handleOptionChange={handleOptionChange}
          />
          <CountriesFilter
            optionsCountries={optionsCountries}
            selectedCountries={selectedCountries}
            handleOptionChange={handleOptionChangeCountries}
          />
          <RoleLevelFilter
            selectedRoleLevel={selectedRoleLevel}
            setSelectedRoleLevel={setSelectedRoleLevel}
            handleOptionChangeRoleLevel={handleOptionChangeRoleLevel}
          />
        </Popover.Group>
      </div>

      {displayedDevelopers.length > 0 ? (
        <div className="grid mt-12 grid-cols-1 lg:grid-cols-2 gap-6">
          {displayedDevelopers.map((developer: any, index: number) => (
            <div key={index}>
              <DeveloperCard
                reviews={"reviews"}
                developer={developer}
                subscriptionPlan={subscriptionPlan}
              />
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-3xl mx-0 mt-12 text-center font-extrabold tracking-tight sm:text-4xl">
          No developers
        </h2>
      )}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <ul className="pagination flex">
            {Array.from({ length: totalPages }).map((_, page) => (
              <li
                key={page}
                className={`mx-1 py-2 px-4 rounded ${
                  page + 1 === currentPage
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => setCurrentPage(page + 1)}
              >
                {page + 1}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!subscriptionPlan?.isPro && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div
              className="
   flex
   justify-center mt-10
   p-4
   rounded-xl
   "
            >
              <ul className="flex items-center -mx-[6px]">
                <li className="px-[6px]">
                  <span
                    className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-md
            bg-primary
            border border-[#EDEFF1]
            text-white text-base
            hover:bg-primary hover:border-primary hover:text-white
            "
                  >
                    <span>
                      <svg
                        width="8"
                        height="15"
                        viewBox="0 0 8 15"
                        className="fill-current stroke-current"
                      >
                        <path
                          d="M7.12979 1.91389L7.1299 1.914L7.1344 1.90875C7.31476 1.69833 7.31528 1.36878 7.1047 1.15819C7.01062 1.06412 6.86296 1.00488 6.73613 1.00488C6.57736 1.00488 6.4537 1.07206 6.34569 1.18007L6.34564 1.18001L6.34229 1.18358L0.830207 7.06752C0.830152 7.06757 0.830098 7.06763 0.830043 7.06769C0.402311 7.52078 0.406126 8.26524 0.827473 8.73615L0.827439 8.73618L0.829982 8.73889L6.34248 14.6014L6.34243 14.6014L6.34569 14.6047C6.546 14.805 6.88221 14.8491 7.1047 14.6266C7.30447 14.4268 7.34883 14.0918 7.12833 13.8693L1.62078 8.01209C1.55579 7.93114 1.56859 7.82519 1.61408 7.7797L1.61413 7.77975L1.61729 7.77639L7.12979 1.91389Z"
                          stroke-width="0.3"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </li>
                <li className="px-[6px]">
                  <span
                    className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-md
            border border-[#EDEFF1]
            text-[#838995] text-base
            hover:bg-primary hover:border-primary hover:text-white
            "
                  >
                    1
                  </span>
                </li>
                <li className="px-[6px]">
                  <span
                    className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-md
            border border-[#EDEFF1]
            text-[#838995] text-base
            hover:bg-primary hover:border-primary hover:text-white
            "
                  >
                    2
                  </span>
                </li>
                <li className="px-[6px]">
                  <span
                    className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-md
            border border-[#EDEFF1]
            text-[#838995] text-base
            hover:bg-primary hover:border-primary hover:text-white
            "
                  >
                    3
                  </span>
                </li>
                <li className="px-[6px]">
                  <span
                    className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-md
            border border-[#EDEFF1]
            text-[#838995] text-base
            hover:bg-primary hover:border-primary hover:text-white
            "
                  >
                    4
                  </span>
                </li>
                <li className="px-[6px]">
                  <span
                    className="
            w-9
            h-9
            flex
            items-center
            justify-center
            rounded-md
            border border-[#EDEFF1]
            text-[#838995] text-base
            hover:bg-primary hover:border-primary hover:text-white
            "
                  >
                    <span>
                      <svg
                        width="8"
                        height="15"
                        viewBox="0 0 8 15"
                        className="fill-current stroke-current"
                      >
                        <path
                          d="M0.870212 13.0861L0.870097 13.086L0.865602 13.0912C0.685237 13.3017 0.684716 13.6312 0.895299 13.8418C0.989374 13.9359 1.13704 13.9951 1.26387 13.9951C1.42264 13.9951 1.5463 13.9279 1.65431 13.8199L1.65436 13.82L1.65771 13.8164L7.16979 7.93248C7.16985 7.93243 7.1699 7.93237 7.16996 7.93231C7.59769 7.47923 7.59387 6.73477 7.17253 6.26385L7.17256 6.26382L7.17002 6.26111L1.65752 0.398611L1.65757 0.398563L1.65431 0.395299C1.454 0.194997 1.11779 0.150934 0.895299 0.373424C0.695526 0.573197 0.651169 0.908167 0.871667 1.13067L6.37922 6.98791C6.4442 7.06886 6.43141 7.17481 6.38592 7.2203L6.38587 7.22025L6.38271 7.22361L0.870212 13.0861Z"
                          stroke-width="0.3"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Subscribe to Access More Developer Profiles
              </AlertDialogTitle>
              <AlertDialogDescription>
                Subscribe to Access More Developer Profiles. nly paid users can
                see more developer profiles. Subscribe to continue.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Start hiring</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </section>
  )
}

export default DevelopersLayout
