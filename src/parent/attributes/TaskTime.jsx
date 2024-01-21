import React, { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import styled from "styled-components";

function TaskTime({ tasktime, setTasktime, taskdate }) {
  const [selectedTime, setSelectedTime] = useState(tasktime);

  useEffect(() => {
    setTasktime(selectedTime);
  }, [selectedTime, setTasktime]);

  const handleTimeChange = (time) => {
    setSelectedTime(time);

    const taskDate = new Date(taskdate);
    const currentDate = new Date();

    if (
      taskDate.getDate() === currentDate.getDate() &&
      new Date(`2000-01-01 ${time}`) <= currentDate
    ) {
      toast.error(
        "Task time should be greater than current time for today's tasks"
      );
    }
  };

  const StyledTimePicker = styled(TimePicker)`
    .react-time-picker__wrapper {
      border-radius: 0.375rem;
      padding-bottom: 0.37rem;
      padding-top: 0.1rem;
      padding-left: 0.5rem;
      color: #1a202c;
      box-shadow: inset 0 1px 2px 0 #e0e0e0;
      border-color: #e0e0e0;
      placeholder: #e0e0e0;

      box-shadow: 0 0 0 2px #fff;
    }
    .react-time-picker__wrapper:focus {
      box-shadow: 0 0 0 2px #b089be;
    }
    .react-time-picker__inputGroup__input {
      padding: 1px;
      padding-left: px;
    }
    .react-time-picker__inputGroup__input:focus {
      box-shadow: 0 0 0 2px #b089be;
    }
  `;

  return (
    <div>
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
            className="h-6 w-6 "
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
  );
}

export default TaskTime;
