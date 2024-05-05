import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TagIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Tags({ setTasktag, childProfileData, selectedChildId }) {
  const [selectedTag, setSelectedTag] = useState(
    childProfileData.length > 0 && childProfileData[0].tags.length > 0
      ? childProfileData[0].tags[0]
      : null
  );

  const handleTagClick = (tag) => {
    // If the clicked tag is already selected, deselect it
    if (tag === selectedTag) {
      setSelectedTag(null);
      setTasktag(null);
    } else {
      setSelectedTag(tag);
      setTasktag(tag);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="bg-white">
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <TagIcon className="h-4 w-4 text-MyPurple-400" />
          {selectedTag ? selectedTag : "Select Tag"}
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
          {childProfileData
            .filter((child) => child.id === selectedChildId)
            .map((child) =>
              child.tags.map((tag) => (
                <div className="py-1" key={tag}>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => handleTagClick(tag)}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm "
                        )}
                      >
                        <TagIcon className="h-4 w-4 text-MyPurple-400" />
                        <span className="ml-2">{tag}</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              ))
            )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Tags;
