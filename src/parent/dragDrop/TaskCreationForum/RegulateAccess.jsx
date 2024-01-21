import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styled from "styled-components";
function RegulateAccess(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [selectedTime, setSelectedTime] = useState();

  useEffect(() => {}, [selectedTime]);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const StyledTimePicker = styled(TimePicker)`
    .react-time-picker__wrapper {
      border-radius: 0.375rem;
      padding-bottom: 0.37rem;
      padding-top: 0.1rem;
      padding-left: 0.5rem;

      color: #1a202c;
      box-shadow: inset 0 1px 2px 0 transparent;
      border-color: #e0e0e0;
      placeholder: #e0e0e0;

      box-shadow: 0 0 0 2px transparent;
    }
    .react-time-picker__wrapper:focus {
      box-shadow: 0 0 0 2px #b089be;
    }
    .react-time-picker__inputGroup__input {
      padding: 1px;
      padding-left: 2px;
    }
    .react-time-picker__inputGroup__input:focus {
      box-shadow: 0 0 0 2px #b089be;
    }
  `;
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
              <StyledTimePicker
                onChange={handleTimeChange}
                value={selectedTime}
                format="HH:mm"
                hourPlaceholder="00"
                minutePlaceholder="00"
                required
                clockIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#b089be"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                }
                clearIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#b089be"
                    className="ml-20 h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default RegulateAccess;
