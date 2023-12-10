import React from 'react';
import { Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TimeLeftCalculator from './TimeLeftCalculator';

const TaskDetailsModal = ({ selectedTaskDetails, handleCloseTaskDetails, handleSubmitTask }) => {
    return (
        selectedTaskDetails && (
            <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-200">
                    <div className="flex justify-end">
                        <button className="focus:outline-none" onClick={handleCloseTaskDetails}>
                            <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-lg" />
                        </button>
                    </div>
                    <Typography variant="h5" className="text-justify center mb-4">
                        <p> Task: {selectedTaskDetails.title}</p>
                    </Typography>
                    <br></br>
                    <p className="mb-2 flex justify-left font-semibold">Description: </p>
                    <p className="mb-10"> {selectedTaskDetails.details}</p>

                    <div className="rounded-lg mt-2 relative overflow-x-auto">
                        <table className="w-full rounded-lg border-purple-400 w-half text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-[#b089be] dark:bg-gray-100 dark:text-gray-400">
                                <tr>
                                    <th className="ml-10 px-6 py-3 text-white text-center">
                                        Details
                                    </th>
                                    <th scope="row" className="px-6 py-3 text-white">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Assigner
                                    </th>
                                    <td className="px-6 py-4">
                                        Aiman Abid
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Tags
                                    </th>
                                    <td class="px-6 py-4">
                                        None
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Submission date:
                                    </th>
                                    <td class="px-6 py-4">
                                        {selectedTaskDetails.description}
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Time Remaining:
                                    </th>
                                    <td class="px-6 py-4">
                                        <TimeLeftCalculator targetTime={new Date(selectedTaskDetails.description)} />

                                    </td>
                                </tr>

                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Reward
                                    </th>
                                    <td class="px-6 py-4">
                                        {selectedTaskDetails.points}
                                    </td>
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
                                    description: selectedTaskDetails.description.toLocaleDateString(),
                                    points: selectedTaskDetails.points,
                                    details: selectedTaskDetails.details,
                                    rewardImage: selectedTaskDetails.rewardImage
                                })
                            }
                            className="mt-14 mr-3 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                        >
                            Complete Task
                        </button>
                        <button
                            onClick={handleCloseTaskDetails}
                            className="mt-14 text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
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
