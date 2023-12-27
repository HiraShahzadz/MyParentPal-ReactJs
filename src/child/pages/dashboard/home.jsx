import React, { useEffect, useState } from "react";
import "../../styles/ChildHome.css"; // Reference your CSS file here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  tasksData,
} from "@/child/data";
import { GiftIcon } from "@heroicons/react/24/solid";
import TaskDetailsModal from './TaskDetailsModel';
import { isSameDay } from 'date-fns';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CompletedTaskDetailsModal from "./CompletedTaskDetailModel";
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
  const [taskDetailsToShow, setTaskDetailsToShow] = useState(null);//taskdetailmodel
  const handleMoreInfoClick = (task) => {
    setTaskDetailsToShow(task);
  };
 
  const handleCloseTaskDetails = () => {
    setTaskDetailsToShow(null);
  };
  const [CompletedtaskDetailsToShow, setCompletedTaskDetailsToShow] = useState(null);//completedtaskdetailmodel
  const handleSubmittedClick = (task) => {
    setCompletedTaskDetailsToShow(task);
  };
  const handleCloseCompletedTaskDetails = () => {
    setCompletedTaskDetailsToShow(null);
  };
  const [date, setDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState("Assigned");
  const [showNextArrow, setShowNextArrow] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState(3);
  const [PresentTasks, setPresentTasks] = useState(2);//today task
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
  const More = () => {
    setPresentTasks((PresentTasks) => PresentTasks + 2);
  };
  const Less = () => {
    if (PresentTasks > 2) {
      setPresentTasks((PresentTasks) => PresentTasks - 2);
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
      <div className="mt-3 flex flex-col lg:flex-row">
        <div className="mb-2 lg:w-1/2 flex-1 lg:ml-1">
          <div className="custom-container-task">
            <Typography variant="h5" color="blue-gray" className="mb-1">
              Timeline: Tasks Closing Soon
            </Typography>

            <div>
              <p className="ml-2 mt-3 text-gray-500 dark:text-gray-400">Complete your pending task</p>


              {todaysTasks
                .slice(0, PresentTasks)
                .map(({ id, description, title, image, details,reward }) => (

                  <div
                    onClick={() =>
                      handleCompleteTask({
                        id,
                        title,
                        image,
                        description: description.toLocaleDateString(), // Convert Date to string
                        reward,
                        details,
                       })
                    }
                    className="p-1 md:p-1">
                    <ul className="flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                      <li className="w-full flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <img className="w-10 h-10 mt-0.5 " src="/img/task.png" alt="Neil image" />
                        </div>
                        <div className="ml-5 block flex-1 min-w-0">
                        <Typography
                          variant="h5" className=" pr-12 mt-2 lg:mt-0 mb-1 lg:mb-1">
                          {title}
                        </Typography>
                          <h5 className="flex items-center mb-1 lg:mb-2">
                            Reward:  <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " /> {reward}
                          </h5>
                          <h5 className="flex items-center mb-1 lg:mb-2">
                            Time Remaining: 30 minutes
                          </h5>
                          <label className="mt-2 block text-md font-medium text-gray-900 dark:text-white">
                            <TimeLeftCalculator targetTime={new Date(description)} />
                          </label>
                        </div>
                        <div className="flex items-center">

                        <Link to="/dashboard/submitTask">
                        <button
                          className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                        >
                          Complete
                        </button>
                      </Link>

                        </div>
                      </li>
                    </ul>
                  </div>
                ))
              }
              <div className=" mr-6 flex justify-end">
                <button
                  className="mt-4 mb-[-4] text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                  onClick={PresentTasks === 2 ? More : Less}
                >
                  {PresentTasks === 2 ? "View more" : "View less"}
                </button>
              </div>
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
                .map(({ id, title, image, description, reward, details}) => (

                  <div
                  onClick={() => handleMoreInfoClick({
                    id,
                    title,
                    image,
                    description: description.toLocaleDateString(),
                    reward,
                    details,
                  })}
                    className="mb-2 bg-white border border-gray-200 rounded-lg text-blue-gray-900  p-4 lg:p-6 relative cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                    <div
                    
                      className="flex items-center">
                      <img className="w-10 h-10 mt-0.5 " src="/img/task.png" alt="Neil image" />
                      <div>
                        <Typography
                          variant="h5" className=" pr-12 mt-2 lg:mt-0 mb-1 lg:mb-1">
                          {title}
                        </Typography>
                        <h5 className="flex items-center ml-2 mb-1 lg:mb-2">
                          Reward:  <GiftIcon className="ml-1 mr-1 h-4 w-4 rounded-sm text-MyPurple-400 " /> {reward}
                        </h5>
                        <Typography className="ml-2 lg:mb-4 text-justify font-normal">
                          Submission date: {description.toLocaleDateString()}
                        </Typography>
                      </div>
                    </div>

                    <div className="mr-5 absolute inset-0 flex items-center justify-end">
                      <label className="-mt-9 block text-sm font-medium text-gray-900 dark:text-white">
                        Time Left: 1 day 10 hours <TimeLeftCalculator targetTime={new Date(description)} />
                      </label>
                    </div>
                    <div className="ml-auto sm:flex items-end mr-3 absolute inset-0 flex items-center justify-end">

                      <Link to="/dashboard/submitTask">
                        <button
                          className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                        >
                          Complete
                        </button>
                      </Link>
                    </div>
                  </div>

                ))

              }
              
              <div className="mr-3 text-right">
                <button
                  className="mt-4 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                  onClick={visibleTasks === 3 ? loadMore : loadLess}
                >
                  {visibleTasks === 3 ? "View more" : "View less"}
                </button>
              </div>


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

          <div>

            {tasksData
              .sort((a, b) => a.description - b.description)
              .slice(0, visibleTasks)
              .map(({ id, title, image, description, reward, details}) => (

                <div
                onClick={() => handleSubmittedClick({
                  id,
                  title,
                  image,
                  description: description.toLocaleDateString(),
                  reward,
                  details,
                })}
                  className="mb-2 bg-white border border-gray-200 rounded-lg text-blue-gray-900  p-4 lg:p-6 relative cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">
                  <div
                  
                    className="flex items-center">
                    <img
                      src="/img/bookmark.png"
                      alt=""
                      className="ml-2 lg:ml-5 rounded-full w-8 h-8 lg:w-12 lg:h-12 mr-2 lg:mr-6"
                    />
                    <div>
                      <Typography
                        variant="h5" className=" pr-12 mt-2 lg:mt-0 mb-1 lg:mb-1">
                        {title}
                      </Typography>
                      <h5 className="flex items-center ml-2 mb-1 lg:mb-2">
                        Reward:  <GiftIcon className="ml-1 mr-1 h-4 w-4 rounded-sm text-MyPurple-400 " /> {reward}
                      </h5>
                      <Typography className="ml-2 lg:mb-4 text-justify font-normal">
                        Submission date: {description.toLocaleDateString()}
                      </Typography>
                    </div>
                  </div>

                  <div className="ml-auto flex items-end mr-3 absolute inset-0 flex items-center justify-end">

                    
                      <button
                        className="mt-14 text-white bg-gray-400  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                      >
                        Submitted
                      </button>
                   
                  </div>
                </div>

              ))
             }
           <div className="mr-3 text-right">
              <button
                className="mt-4 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                onClick={visibleTasks === 3 ? loadMore : loadLess}
              >
                {visibleTasks === 3 ? "View more" : "View less"}
              </button>
            </div>


          </div>

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
        {taskDetailsToShow && (
          <TaskDetailsModal
            selectedTaskDetails={taskDetailsToShow}
            handleCloseTaskDetails={handleCloseTaskDetails}
          // handleSubmitTask={/* Pass your handleSubmitTask function here */}
          />
        )}
        {CompletedtaskDetailsToShow && (
          <CompletedTaskDetailsModal
            selectedTaskDetails={CompletedtaskDetailsToShow}
            handleCloseCompletedTaskDetails={handleCloseCompletedTaskDetails}
          // handleSubmitTask={/* Pass your handleSubmitTask function here */}
          />
        )}
 
      </div>

    </div>

  );
}

export default Home;

