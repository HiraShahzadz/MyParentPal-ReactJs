import React, { useEffect, useState } from "react";
import "../../styles/ChildHome.css"; // Reference your CSS file here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmissionForm from './File';
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  tasksData,
} from "@/child/data";

import { isSameDay } from 'date-fns';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Button,
  progress,
} from "@material-tailwind/react";
import TimeLeftCalculator from "./TimeLeftCalculator";
export function Home() {
  const [date, setDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState("Assigned");
  const [showNextArrow, setShowNextArrow] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState(3);
  const [todaysTasks, setTodaysTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [tasksToShow, setTasksToShow] = useState([]);

  const loadMore = () => {
    setVisibleTasks((visibleTasks) => visibleTasks + 3);
  };
  const loadLess = () => {
    if (visibleTasks > 3) {
      setVisibleTasks((VisibleTasks) => VisibleTasks - 3);
    }
  };
  useEffect(() => {
    const today = new Date();
    const filteredTasks = tasksData.filter(task => isSameDay(new Date(task.description), today));
    setTodaysTasks(filteredTasks);
  }, [date]);


  const showNext = () => {
    setShowNextArrow(true);
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const id = setInterval = setInterval(() => {
        setProgress(math.random() * 100);
      }, 3000);
    }, []);
  }

  const ViewMore = () => {
    setVisibleTasks(visibleTasks + 3);
  };

  const showAllTasks = () => {
    setTasksToShow(todaysTasks);
    setShowPopup(true);
  };
  const isToday = (dateToCheck) => {
    const today = new Date();
    return isSameDay(today, dateToCheck);
  };

  function DiscardChangesModal({ show, setShow }) {
    // Function to handle confirmation of discarding changes
    const handleDiscardChanges = (confirmDiscard) => {
      if (confirmDiscard) {
        // Handle discarding changes here
        console.log('Changes discarded');
      }
      setShow(false); // Close the modal
    };

    return (
      <div
        className={`fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ${show ? '' : 'hidden'
          }`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <p className="text-gray-800 mb-4">Are you sure you want to discard changes?</p>
          <div className="flex justify-end">
            <button
              onClick={() => handleDiscardChanges(false)}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              No
            </button>
            <button
              onClick={() => handleDiscardChanges(true)}
              className="text-white bg-purple-400 hover:bg-purple-500 px-4 py-2 rounded-lg"
            >
              Yes
            </button>

          </div>
        </div>
      </div>
    );
  }
  document.addEventListener('DOMContentLoaded', function () {
    const discardButton = document.querySelector('[data-modal-toggle="popup-modal"]');
    const modal = document.getElementById('popup-modal');
    const closeModalButton = modal.querySelector('[data-modal-hide="popup-modal"]');

    discardButton.addEventListener('click', function () {
      modal.classList.toggle('hidden');
    });

    closeModalButton.addEventListener('click', function () {
      modal.classList.add('hidden');
    });
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [selectedTaskDetails, setSelectedTaskDetails] = useState(null);

  // Function to handle task completion and show details
  const handleCompleteTask = (task) => {
    setSelectedTaskDetails(task);
  };

  // Function to close task details section or modal
  const handleCloseTaskDetails = () => {
    setSelectedTaskDetails(null);
  };
  const [showModal, setShowModal] = useState(false);


  // Show Submit Form
  const [SubmitFormDetails, setSubmitFormDetails] = useState(null);

  const handleSubmitTask = (task) => {
    setSubmitFormDetails(task);
  };

  // Function to close task details section or modal
  const handleClose = () => {
    setSubmitFormDetails(null);
  };

  return (
    <div>


      <br></br>
      <br></br>


      <div className="flex flex-col lg:flex-row">
        <div className="mb-4 lg:w-1/2 flex-1 lg:ml-1">
          <div className="custom-container-task">
            <Typography variant="h5" color="blue-gray" className="mb-1">
              Today's task
            </Typography>

            <div>
              <p className="ml-2 mt-3 text-gray-500 dark:text-gray-400">Complete your pending task</p>


              {todaysTasks
                .slice(0, 2)
                .map(({ id, description, title, image, details, time, points, rewardImage }) => (

                  <div
                    onClick={() =>
                      handleCompleteTask({
                        id,
                        title,
                        image,
                        description: description.toLocaleDateString(), // Convert Date to string
                        points,
                        details,
                        rewardImage
                      })
                    }
                    className="p-1 md:p-1">
                    <ul className="flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                      <li className="w-full flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <img className="w-10 h-10 rounded-full" src={image} alt="Neil image" />
                        </div>
                        <div className="block flex-1 min-w-0">
                          <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                            {title}
                          </p>
                          <p className="w-full text-gray-500 dark:text-gray-400">
                            Reward: {points}
                          </p>
                          <label className="mt-2 block text-md font-medium text-gray-900 dark:text-white">
                            <TimeLeftCalculator targetTime={new Date(description)} />
                          </label>
                        </div>
                        <div className="flex items-center">

                          <svg className="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                          </svg>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))
              }
              <button
                onClick={() => setShowModal(true)}
                className="mt-1 text-white bg-[#b089be] hover:bg-purple-400  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                type="button"
              >
                View more
              </button>

              {/* Modal component */}
              <DiscardChangesModal show={showModal} setShow={setShowModal} />

            </div>

            
          </div>
        </div>
      </div>

      <div className="ml-3 mr-2 mt-2 mb-20 custom-container-series mx-auto ">
        <h2>Summary</h2>
        <br></br>
        <div className="task-titles">
          <div
            className={`task-nav-item ${selectedTask === "Assigned" ? "active" : ""
              }`}
            onClick={() => setSelectedTask("Assigned")}
          >
            Assigned
          </div>
          &nbsp;
          &nbsp;
          <div
            className={`task-nav-item ${selectedTask === "Pending" ? "active" : ""
              }`}
            onClick={() => setSelectedTask("Pending")}
          >
            Pending
          </div>
          &nbsp;
          &nbsp;
          <div
            className={`task-nav-item ${selectedTask === "Completed" ? "active" : ""
              }`}
            onClick={() => setSelectedTask("Completed")}
          >
            Completed
          </div>
          &nbsp;
          &nbsp;
          {showNextArrow && (
            <div className="next-arrow" onClick={showNext}>
              Next ▶
            </div>
          )}


        </div>
        {selectedTask === "Assigned" && (
          <div>
            <br></br>
            <br></br>

            <div>

              {tasksData
                .sort((a, b) => a.description - b.description)
                .slice(0, visibleTasks)
                .map(({ id, title, image, description, points, details, rewardImage }) => (

                  <div
                    onClick={() =>
                      handleCompleteTask({
                        id,
                        title,
                        image,
                        description: description.toLocaleDateString(), // Convert Date to string
                        points,
                        details,
                        rewardImage
                      })
                    }
                    className="mb-2 bg-white border border-gray-200 rounded-lg text-blue-gray-900  p-4 lg:p-6 relative cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                    <div className="flex items-center">
                      <img
                        src={image}
                        alt=""
                        className="ml-2 lg:ml-5 rounded-full w-12 h-12 lg:w-16 lg:h-16 mr-2 lg:mr-6"
                      />
                      <div>
                        <Typography variant="h5" className="ml-0 pr-12 mt-2 lg:mt-0 mb-1 lg:mb-1">
                          {title}
                        </Typography>
                        <h5 className="flex items-center ml-2 mb-1 lg:mb-2">
                          Reward: <img src={rewardImage} alt="Reward" className="ml-2" /> {points}
                        </h5>
                        <Typography className="ml-2 lg:mb-4 text-justify font-normal">
                          Submission date: {description.toLocaleDateString()}
                        </Typography>
                      </div>
                    </div>

                    <div className="mr-5 absolute inset-0 flex items-center justify-end">
                      <label className="-mt-9 block text-sm font-medium text-gray-900 dark:text-white">
                        Time Left:<TimeLeftCalculator targetTime={new Date(description)} />
                      </label>
                    </div>
                    <div className="ml-auto flex items-end mr-3 absolute inset-0 flex items-center justify-end">
                     
                      <button
                        onClick={() =>
                          handleSubmitTask({
                            id,
                            title,
                            image,
                            description: description.toLocaleDateString(),
                            points,
                            details,
                            rewardImage
                          })
                        }
                        className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                      >
                        Complete Task
                      </button>
                    </div>
                  </div>

                ))

              }

              {selectedTaskDetails && (
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

                    <div class=" rounded-lg mt-2 relative overflow-x-auto">
                      <table className="w-full rounded-lg border-purple-400 w-half text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                        <thead class="text-xs text-gray-700 uppercase bg-[#b089be] dark:bg-gray-100 dark:text-gray-400">
                          <tr>
                            <th class="ml-10 px-6 py-3 text-white text-center">
                              Details
                            </th>
                            <th scope="row" class="px-6 py-3 text-white">

                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              Assigner
                            </th>
                            <td class="px-6 py-4">
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
                    <button
                      onClick={() =>
                        handleSubmitTask({
                          id,
                          title,
                          image,
                          description: description.toLocaleDateString(),
                          points,
                          details,
                          rewardImage
                        })
                      }
                      className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                    >
                      Complete Task
                    </button>
                    <button onClick={handleCloseTaskDetails} className="mt-14 text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {SubmitFormDetails && (
                <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 w-200">
                    <div className="flex justify-end">
                      <button className="focus:outline-none" onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} className="text-gray-600 text-lg" />
                      </button>
                    </div>
                    <Typography variant="h5" className="text-justify center mb-4">
                      <p> Submit Form Task: {SubmitFormDetails.title}</p>
                    </Typography>
                    <br></br>
                    <p className="mb-1 flex justify-left font-semibold">Description: </p>
                    <p className=""> {SubmitFormDetails.details}</p>
                    <div className="p-4 bg-white mt-12 mb-3 flex flex-col lg:flex-row gap-4 rounded-lg border border-gray-300">
                      <div className="lg:w-1/2 rounded-lg border border-gray-300">
                        <Typography variant="h5" color="blue-gray" className="mt-5 mb-8">
                          Submission Portal
                        </Typography>
                      <SubmissionForm/>
                      </div>
                      <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center">
                        <div className="relative">
                          <div class=" rounded-lg mt-2 relative overflow-x-auto">
                            <table className="float-right rounded-lg border-purple-400 w-half text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                              <thead class="text-xs text-gray-700 uppercase bg-[#b089be] dark:bg-gray-100 dark:text-gray-400">
                                <tr>
                                  <th class="ml-10 px-6 py-3 text-white text-center">
                                    Details
                                  </th>
                                  <th scope="row" class="px-6 py-3 text-white">

                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Assigner
                                  </th>
                                  <td class="px-6 py-4">
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
                                    {SubmitFormDetails.description}
                                  </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Time Remaining:
                                  </th>
                                  <td class="px-6 py-4">
                                    <TimeLeftCalculator targetTime={new Date(SubmitFormDetails.description)} />

                                  </td>
                                </tr>

                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    Reward
                                  </th>
                                  <td class="px-6 py-4">
                                    {SubmitFormDetails.points}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                    >
                      Submit
                    </button>
                    <button onClick={handleClose} className="mt-14 text-white bg-gray-400 hover:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              <button className="ml-10 mb-4 outlinedButton" onClick={visibleTasks === 3 ? loadMore : loadLess}>
                {visibleTasks === 3 ? "View more..." : "View less..."}
              </button>

            </div>

          </div>
        )}

        {selectedTask === "Pending" && (
          <div>
            <br></br>
            <br></br>
            <p>Content for pending Task goes here</p>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
        )}

        {selectedTask === "Completed" && (
          <div>
            <br></br>
            <br></br>
            <p>Content for Compelted Task goes here</p>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
        )}


        {selectedTask === "Penality" && (
          <div>
            <br></br>
            <br></br>
            <p>Content for Penality Task goes here</p>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
        )}

      </div>

    </div>

  );
}

export default Home;

