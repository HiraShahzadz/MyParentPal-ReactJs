import React from "react";
import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TimeLeftCalculator from "./TimeLeftCalculator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const TaskDetailsModal = ({
  selectedTaskDetails,
  handleCloseTaskDetails,
  handleSubmitTask,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (
      selectedTaskDetails &&
      selectedTaskDetails.taskdate &&
      selectedTaskDetails.tasktime
    ) {
      const submissionDate = new Date(selectedTaskDetails.taskdate);
      const timeParts = selectedTaskDetails.tasktime.split(" ");
      if (timeParts.length !== 2) {
        setTimeRemaining("Invalid time format");
        return;
      }
      const [time, ampm] = timeParts;
      const [hoursStr, minutesStr] = time.split(":");
      let taskHours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (!["am", "pm"].includes(ampm.toLowerCase())) {
        setTimeRemaining("Invalid time format");
        return;
      }

      if (ampm.toLowerCase() === "pm" && taskHours !== 12) {
        taskHours += 12;
      }

      submissionDate.setHours(taskHours);
      submissionDate.setMinutes(minutes);

      const currentTime = new Date();
      const timeDifference = submissionDate - currentTime;

      if (timeDifference < 0) {
        const absoluteTimeDifference = Math.abs(timeDifference);
        const days = Math.floor(absoluteTimeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (absoluteTimeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setTimeRemaining(`${days} days and ${hours} hours passed`);
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        setTimeRemaining(`${days} days and ${hours} hours`);
      }
    } else {
      setTimeRemaining("Date or time not provided");
    }
  }, [selectedTaskDetails]);

  const navigate = useNavigate();
  const id = selectedTaskDetails._id;
  const taskname = selectedTaskDetails.taskname;
  const taskdescription = selectedTaskDetails.taskdescription;
  const taskdate = selectedTaskDetails.taskdate;
  const rewardname = selectedTaskDetails.rewardname;
  const filetype = selectedTaskDetails.taskfiletype;
  const tasktime = selectedTaskDetails.tasktime;
  const timeleft = timeRemaining;
  const handleNavigation = () => {
    // Navigate to the submit task route with taskDetails in the state
    navigate("/childDashboard/submitTask", {
      state: {
        id: id,
        taskname: taskname,
        taskdescription: taskdescription,
        taskdate: taskdate,
        rewardname: rewardname,
        filetype: filetype,
        tasktime: tasktime,
        timeleft: timeleft,
      },
    });
  };

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
                    className="text-md text-md whitespace-nowrap  border-r px-6 py-4 font-medium text-black text-gray-900 dark:text-white"
                  >
                    Submission type
                  </th>
                  <td className="text-gray text-md px-6 py-4">
                    {selectedTaskDetails.taskfiletype &&
                    selectedTaskDetails.taskfiletype.length > 0
                      ? selectedTaskDetails.taskfiletype.join(", ")
                      : "None"}
                  </td>
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
                  <td className="px-6 py-4">
                    {selectedTaskDetails.taskdate} at{" "}
                    {selectedTaskDetails.tasktime}
                  </td>
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
                {selectedTaskDetails.taskRemarks && (
                  <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="whitespace-nowrap border-r px-6 py-4 font-bold text-gray-900 dark:text-white"
                    >
                      Task Remarks
                    </th>
                    <td className="px-6 py-4 font-bold">
                      {selectedTaskDetails.taskRemarks}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleNavigation}
              className="mb-2 mt-14 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
            >
              Complete
            </button>

            <button
              onClick={handleCloseTaskDetails}
              className="mb-2 mt-14 rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
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
