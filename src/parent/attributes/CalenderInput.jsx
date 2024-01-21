import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

function CalenderInput(props) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    const initialDate = props.taskdate ? new Date(props.taskdate) : null;
    setSelectedDate(initialDate);
  }, [props.taskdate]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Format the date to store only the date part (without time)
    const formattedDate = date ? date.toLocaleDateString("en-US") : null;
    props.setTaskdate(formattedDate); // Store the formatted date or null

    setCalendarVisible(false);
  };

  return (
    <div className="relative rounded-md">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM-dd-yyyy"
        placeholderText="e.g. 19-11-2023"
        className="block w-full rounded-md border-0 py-2 pl-2 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
        popperClassName={calendarVisible}
        showTimeSelect={false}
        required
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
            {/* SVG Path */}
          </svg>
        </div>
      </span>
    </div>
  );
}

export default CalenderInput;
