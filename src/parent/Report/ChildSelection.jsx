import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ChildSelection({ childProfileData, filterTasks }) {
  const [selectedAssignee, setSelectedAssignee] = useState({
    img: "",
    name: "Select Child",
    id: null,
  });

  const handleChildClick = (childId) => {
    if (selectedAssignee.id === childId) {
      // Deselect the child if it's already selected
      setSelectedAssignee({ img: "", name: "Select Child", id: null });
      filterTasks(null); // Pass null to indicate deselection
    } else {
      // Otherwise, select the clicked child
      const selectedChild = childProfileData.find(
        (child) => child.id === childId
      );
      setSelectedAssignee(selectedChild);
      filterTasks(childId);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <img
            className="h-5 w-5 rounded-full  object-cover"
            src={
              selectedAssignee.img
                ? `data:image/jpeg;base64,${selectedAssignee.img}`
                : "/img/userc.png"
            }
            alt="assignee"
          />
          {selectedAssignee.name}
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
          {childProfileData.map(({ name, img, id }) => (
            <div className="py-1" key={id}>
              <Menu.Item onClick={() => handleChildClick(id)}>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm "
                    )}
                  >
                    <img
                      className="h-6 w-6 rounded-full object-cover"
                      src={
                        img ? `data:image/jpeg;base64,${img}` : "/img/userc.png"
                      }
                      alt=""
                    />
                    <span className="ml-2">{name}</span>
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
