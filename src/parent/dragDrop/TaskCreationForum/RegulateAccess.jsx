import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styled from "styled-components";
import TaskTime from "@/parent/attributes/TaskTime";
function RegulateAccess(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="mt-6 space-y-10 ">
      <fieldset>
        <legend className="flex text-sm font-semibold leading-6 text-gray-900">
          {/* Your SVG and text here */}
          Regulate access
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Would you like to set a designated time for task notifications to be
          sent?
        </p>
        <div className="mt-5 flex gap-x-20 ">
          <div className="flex items-center gap-x-3">
            <input
              id="regulate-access"
              name="regulate-access"
              type="radio"
              className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
              value="file-proof"
              onChange={handleChange}
              checked={selectedOption === "file-proof"}
              required
            />
            <label
              htmlFor="push-everything"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yes
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="regulate-access"
              name="regulate-access"
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
              No
            </label>
          </div>
        </div>

        {selectedOption === "file-proof" && (
          <div className="mt-4">
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Set Time
            </label>
            <div className="relative mt-2 flex">
              <TaskTime />
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default RegulateAccess;
