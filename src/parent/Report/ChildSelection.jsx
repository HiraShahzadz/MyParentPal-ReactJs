import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const options = [
  { label: "Select Child", image: "/img/user.png" },
  { label: "Nida", image: "/img/userc.png" },
  { label: "Hira", image: "/img/userc.png" },
];

function ChildSelection() {
  const [selectedStatus, setSelectedStatus] = useState(options[0]); // Initial selected status

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <img
            className="h-5 w-5 rounded-full"
            src={selectedStatus.image}
            alt=""
          />
          {selectedStatus.label}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
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
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map(({ label, image }, index) => (
            <div className="py-1" key={index}>
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => {
                      setSelectedStatus({ label, image });
                    }}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm "
                    )}
                  >
                    <img className="h-6 w-6 rounded-full" src={image} alt="" />
                    <span className="ml-2">{label}</span>
                  </a>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ChildSelection;
