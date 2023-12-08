import React, { useState } from "react";

function MonitorTask() {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [selectedOptions, setSelectedOptions] = useState([]); // State to track the selected file types

  const handleTypeChange = (event) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions((prevSelectedOptions) =>
      Array.from(new Set([...prevSelectedOptions, ...selected]))
    );
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };
  return (
    <div className="mt-10 space-y-10 ">
      <fieldset>
        <legend className="flex text-sm font-semibold leading-6 text-gray-900">
          {/* Your SVG and text here */}
          Monitor Task
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Would you like evidence of the completed task from your child?
        </p>
        <div className="mt-5 flex gap-x-20 ">
          <div className="flex items-center gap-x-3">
            <input
              id="push-everything"
              name="monitor-task"
              type="radio"
              className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
              value="file-proof"
              onChange={handleChange}
              checked={selectedOption === "file-proof"}
            />
            <label
              htmlFor="push-everything"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              File Proof
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="push-email"
              name="monitor-task"
              type="radio"
              className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
              value="monitor-physically"
              onChange={handleChange}
              checked={selectedOption === "monitor-physically"}
            />
            <label
              htmlFor="push-email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Monitor Physically
            </label>
          </div>
        </div>

        {selectedOption === "file-proof" && (
          <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-8 sm:grid-cols-8">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Maximum Files
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="number"
                  id="file"
                  placeholder="Max files upload: 20"
                  autoComplete="address-level2"
                  min="0"
                  max="20"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                File Size
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="number"
                  id="size"
                  autoComplete="address-level1"
                  placeholder="Max: 25MB"
                  min="0"
                  max="25"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                File type
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  placeholder="No Selection"
                  value={selectedOptions.join(", ")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Type
              </label>
              <select
                id="choice"
                name="choice"
                value={selectedOptions}
                onChange={handleTypeChange}
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
              >
                <option>Choose</option>
                <option>.jpg</option>
                <option>.png</option>
                <option>.mp4</option>
                <option>.mp3</option>
              </select>
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default MonitorTask;
