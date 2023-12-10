import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

function CalenderInput() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
  };
  return (
    <div className="relative rounded-md ">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM-dd-yyyy"
        placeholderText="e.g. 19-11-2023"
        className="block w-full rounded-md border-0 py-1.5 pl-2 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
        popperClassName={calendarVisible}
      />
      <span
        className="absolute right-0 top-2 cursor-pointer"
        onClick={() => setCalendarVisible(!calendarVisible)}
      >
        <div className="absolute inset-y-0 right-0 flex items-center p-2 sm:mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="#B089BE"
            className=" h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </div>
      </span>
    </div>
  );
}

export default CalenderInput;
