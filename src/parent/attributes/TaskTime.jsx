import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledTimeInput = styled.input`
  flex: 1;
  color: #1f2937; /* Text color */
  background-color: #ffffff; /* Background color */
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #b089be; /* Focus border color */
  }
`;

const TimeDropdown = styled.select`
  flex: 1;
  color: #1f2937; /* Text color */
  background-color: #ffffff; /* Background color */
  font-size: 1rem;
  outline: none;
  &:focus {
    border-color: #b089be; /* Focus border color */
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TaskTime = ({ tasktime, setTasktime }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAMPM] = useState("");

  useEffect(() => {
    if (tasktime) {
      const timeComponents = tasktime.split(" ");
      const time = timeComponents[0].split(":");
      setHour(time[0]);
      setMinute(time[1]);
      setAMPM(timeComponents[1]);
    }
  }, [tasktime]);

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };

  const handleAMPMChange = (event) => {
    setAMPM(event.target.value);
  };

  useEffect(() => {
    if (hour !== "" && minute !== "" && ampm !== "") {
      setTasktime(`${hour}:${minute} ${ampm}`);
    }
  }, [hour, minute, ampm]);

  return (
    <div>
      <StyledTimeInput type="hidden" />
      <Container>
        <TimeDropdown
          value={hour}
          onChange={handleHourChange}
          className="mr-1 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
        >
          <option value="">{hour ? hour : "hh"}</option>
          {[...Array(12).keys()].map((index) => {
            const hourValue = index < 9 ? `0${index + 1}` : `${index + 1}`;
            return (
              <option key={index + 1} value={hourValue}>
                {hourValue}
              </option>
            );
          })}
        </TimeDropdown>
        <span>:</span>
        <TimeDropdown
          value={minute}
          onChange={handleMinuteChange}
          className="ml-1 mr-1 mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
        >
          <option value="">{minute ? minute : "mm"}</option>
          {[...Array(60).keys()].map((minute) => (
            <option key={minute} value={minute}>
              {minute < 10 ? `0${minute}` : minute}
            </option>
          ))}
        </TimeDropdown>
        <TimeDropdown
          value={ampm}
          onChange={handleAMPMChange}
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </TimeDropdown>
      </Container>
    </div>
  );
};

export default TaskTime;
