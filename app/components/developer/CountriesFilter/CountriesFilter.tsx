import { Popover, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "lucide-react"
import React, { Fragment } from "react"

type Props = {
  optionsCountries: {
    value: any
    label: any
  }[]
  selectedCountries: string[]
  handleOptionChange: (optionValue: string) => void
}

function CountriesFilter({
  optionsCountries,
  selectedCountries,
  handleOptionChange,
}: Props) {
  return (
    <Popover
      as="div"
      id="desktop-menu"
      className="relative   z-50 inline-block text-left"
    >
      <div>
        <Popover.Button className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          <span>Location</span>

          <ChevronDownIcon
            className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Popover.Button>
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
        <Popover.Panel className="origin-top-right absolute left-0 mt-2 bg-white rounded-md shadow-2xl p-4 ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-auto">
          <form className="space-y-4 ">
            {optionsCountries.map((option, optionIdx) => (
              <div key={optionIdx} className="flex  items-center">
                <input
                  name={`${optionIdx}[]`}
                  defaultValue={option.value}
                  checked={selectedCountries.includes(option?.value)}
                  type="checkbox"
                  onChange={() => handleOptionChange(option.value)}
                  className="h-4 w-4 accent-emerald-600 cursor-pointer  border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  onClick={() => handleOptionChange(option.value)}
                  className="ml-3 pr-6 cursor-pointer text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </form>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default CountriesFilter
