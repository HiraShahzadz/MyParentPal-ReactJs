import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

function DobInput(props) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    const initialDate = props.dob ? new Date(props.dob) : null;
    setSelectedDate(initialDate);
  }, [props.dob]);

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Format the date to store only the date part (without time)
    const formattedDate = date ? date.toLocaleDateString("en-US") : null;
    props.setDob(formattedDate); // Store the formatted date or null
  };
  const handleDobFocus = () => {
    setCalendarVisible(true);
  };

  const handleDobBlur = () => {
    setCalendarVisible(false);
  };
  return (
    <div className="relative rounded-md">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM-dd-yyyy"
        placeholderText={calendarVisible ? "" : "Date of birth"}
        className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md border-0  py-1.5 pl-3 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
        onFocus={handleDobFocus}
        onBlur={handleDobBlur}
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
          ></svg>
        </div>
      </span>
    </div>
  );
}

export default DobInput;
