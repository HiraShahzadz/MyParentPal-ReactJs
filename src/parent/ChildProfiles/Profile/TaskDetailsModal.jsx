import React from "react";
import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import TimeLeftCalculator from "./TimeLeftCalculator";

const TaskDetailsModal = ({
  selectedTaskDetails,
  handleCloseTaskDetails,
  handleSubmitTask,
}) => {
  return (
    selectedTaskDetails && (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="w-200 rounded-lg bg-white p-6 shadow-lg">
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
          <Typography variant="h5" className="center mb-4 text-justify">
            <p> Task: {selectedTaskDetails.title}</p>
          </Typography>
          <br></br>
          <p className="justify-left mb-2 flex font-semibold">Description: </p>
          <p className="mb-10"> {selectedTaskDetails.details}</p>

          <div className="relative mt-2 overflow-x-auto rounded-lg">
            <table className="w-half w-full rounded-lg border-purple-400 text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400 ">
              <thead className="bg-[#b089be] text-xs uppercase text-gray-700 dark:bg-gray-100 dark:text-gray-400">
                <tr>
                  <th className="ml-10 px-6 py-3 text-center text-white">
                    Details
                  </th>
                  <th scope="row" className="px-6 py-3 text-white"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Assigner
                  </th>
                  <td className="px-6 py-4">Aiman Abid</td>
                </tr>
                <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Tags
                  </th>
                  <td class="px-6 py-4">None</td>
                </tr>
                <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Submission date:
                  </th>
                  <td class="px-6 py-4">{selectedTaskDetails.description}</td>
                </tr>
                <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Time Remaining:
                  </th>
                  <td class="px-6 py-4">
                    <TimeLeftCalculator
                      targetTime={new Date(selectedTaskDetails.description)}
                    />
                  </td>
                </tr>

                <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Reward
                  </th>
                  <td class="px-6 py-4">{selectedTaskDetails.points}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center">
            <button
              onClick={() =>
                handleSubmitTask({
                  id: selectedTaskDetails.id,
                  title: selectedTaskDetails.title,
                  image: selectedTaskDetails.image,
                  description:
                    selectedTaskDetails.description.toLocaleDateString(),
                  points: selectedTaskDetails.points,
                  details: selectedTaskDetails.details,
                  rewardImage: selectedTaskDetails.rewardImage,
                })
              }
              className="mb-2 mr-3 mt-14 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
            >
              Complete Task
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
