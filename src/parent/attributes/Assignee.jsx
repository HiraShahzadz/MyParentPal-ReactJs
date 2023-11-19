import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
function Assignee() {
  const options = [
    { label: "Unassigned", image: "" },
    { label: "Nida", image: "/img/Woman6.jpg" },
    { label: "Hira", image: "/img/women2.jpg" },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]); // Default to the first option

  return (
    <div className="col-span-full mt-2 flex items-center gap-x-3">
      {selectedOption.label === "Unassigned" ? (
        <UserCircleIcon
          className="h-12 w-12 text-gray-300"
          aria-hidden="true"
        />
      ) : (
        <img
          className="h-10 w-10 rounded-full"
          src={selectedOption.image}
          alt=""
        />
      )}
      <div className="mt-2 sm:col-span-3">
        <select
          id="country"
          name="country"
          autoComplete="country-name"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          value={selectedOption.label}
          onChange={(e) => {
            const selectedLabel = e.target.value;
            const selected = options.find(
              (option) => option.label === selectedLabel
            );
            setSelectedOption(selected);
          }}
        >
          {options.map(({ label }) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Assignee;
