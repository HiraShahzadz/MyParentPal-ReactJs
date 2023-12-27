import React, { useState } from "react";

function MonitorTask(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleTypeChange = (event) => {
    const selected = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );

    setSelectedOptions((prevSelectedOptions) =>
      Array.from(new Set([...prevSelectedOptions, ...selected]))
    );

    // Save selected file types in the parent component using props
    props.setTaskfiletype(
      Array.from(new Set([...props.taskfiletype, ...selected]))
    );
  };

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };

  const handleClear = () => {
    setSelectedOptions([]);
    props.setTaskfiletype([]);
  };
  return (
    <div className="mt-6 space-y-10 ">
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
              id="monitor-task"
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
              id="monitor-task"
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
          <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label
                htmlFor="postal-code"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                File type
              </label>
              <div className="relative mt-2 flex">
                <input
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  placeholder="Choose audio, video or picture"
                  value={selectedOptions.join(", ")}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                  disabled
                />

                <a
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 ml-2 flex h-4 w-4 -translate-y-1/2  transform cursor-pointer items-center justify-center rounded-full bg-MyPurple-400 p-4 px-3 py-3  text-white focus:outline-none"
                >
                  X
                </a>
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
                <option>Choose from here</option>
                <option>Video</option>
                <option>Audio</option>
                <option>Picture</option>
                <option>Text</option>
              </select>
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default MonitorTask;
