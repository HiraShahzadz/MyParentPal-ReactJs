import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TimeLeftCalculator from "./TimeLeftCalculator";
import { Link } from "react-router-dom";

const TaskDetailsModal = ({
  childData,
  selectedTaskDetails,
  handleCloseTaskDetails,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(null);
  useEffect(() => {
    if (
      selectedTaskDetails &&
      selectedTaskDetails.taskdate &&
      selectedTaskDetails.tasktime
    ) {
      // Parse the task date
      const submissionDate = new Date(selectedTaskDetails.taskdate);

      // Parse the task time string into hours and minutes
      const [hoursStr, minutesStr] = selectedTaskDetails.tasktime.split(":");
      const taskHours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      // Set the time of the submission date to the specified time
      submissionDate.setHours(taskHours);
      submissionDate.setMinutes(minutes);

      // Calculate the time difference
      const currentTime = new Date();
      const timeDifference = submissionDate - currentTime;

      // Check if the deadline has passed
      if (timeDifference < 0) {
        const absoluteTimeDifference = Math.abs(timeDifference);
        const days = Math.floor(absoluteTimeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (absoluteTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setTimeRemaining(`${days} days and ${hours} hours passed`);
      } else {
        // Convert the time difference into days and hours
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setTimeRemaining(`${days} days and ${hours} hours`);
      }
    }
  }, [selectedTaskDetails]);

  return (
    selectedTaskDetails && (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="w-screen rounded-lg bg-white p-6 shadow-lg lg:m-96">
          <div className="flex justify-end">
            <button
              className="focus:outline-none"
              onClick={handleCloseTaskDetails}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-lg text-gray-600"
              />
            </button>
          </div>
          <Typography
            variant="h5"
            className="center mb-4 text-justify text-lg text-black "
          >
            <p> Task: {selectedTaskDetails.taskname}</p>
          </Typography>
          <br></br>
          <p className="justify-left mb-2 flex text-lg font-semibold text-black">
            Description:{" "}
          </p>
          <p className="text-md mb-10 text-black">
            {" "}
            {selectedTaskDetails.taskdescription}
          </p>

          <div className="relative mt-2 overflow-x-auto rounded-lg">
            <table className="w-full rounded-lg border border-gray-100 text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
              <thead className="bg-[#b089be] text-xs uppercase text-gray-700 dark:bg-gray-100 dark:text-gray-400">
                <tr>
                  <th
                    colSpan="2"
                    className="px-6 py-3 text-center text-sm text-white"
                  >
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="text-md text-md whitespace-nowrap  border-r px-6 py-4 font-medium text-black  dark:text-white"
                  >
                    Assignee
                  </th>
                  <td className="text-gray text-md px-6 py-4">{childData}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Tags
                  </th>
                  <td className="px-6 py-4">{selectedTaskDetails.tasktag}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Submission date:
                  </th>
                  <td className="px-6 py-4">{selectedTaskDetails.taskdate}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Time Remaining:
                  </th>
                  <td className="px-6 py-4">
                    {timeRemaining ? timeRemaining : "Calculating..."}
                  </td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className=" whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Reward
                  </th>
                  <td className="px-6 py-4">
                    {selectedTaskDetails.rewardname}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleCloseTaskDetails}
              className="mb-2 mt-14 rounded-lg bg-MyPurple-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskDetailsModal;
