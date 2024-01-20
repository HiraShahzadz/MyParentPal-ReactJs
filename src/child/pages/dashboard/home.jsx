import React, { useEffect, useState } from "react";
import "../../styles/ChildHome.css"; // Reference your CSS file here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import {
  tasksData,
} from "@/child/data";
import { GiftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
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
const icon = {
  className: "w-5 h-5 text-inherit",
};
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
          <div className="mr-2  mb-1 p-4 bg-white rounded-lg">
            <div className="text-black text-left font-bold text-lg">
              Timeline: Tasks Closing Soon
            </div>

            <div>
              <p className="ml-2 mt-3 mb-3 text-gray-500 dark:text-gray-400">Complete your pending task</p>


              {todaysTasks
                .slice(0, PresentTasks)
                .map(({ id, description, title, image, details, reward }) => (

                  <div onClick={() => handleMoreInfoClick({
                    id,
                    title,
                    image,
                    description: description.toLocaleDateString(),
                    reward,
                    details
                  })}
                    key={id} href="" className="ml-4 mr-4 mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                    <div className="flex"
                    >
                      <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                      <div className="ml-3">
                        <span className="font-medium text-black">{title}</span>
                        <br></br>
                        <span className="mt-3 text-black">Time Remaining: 4 hours</span>
                        <span className="text-black">

                        </span>
                        <div className="mt-1.5 flex">
                          <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />
                          <span className="ml-1 text-xs text-black ">
                            Reward: {reward}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="ml-auto flex items-end  hover:border-MyPurple-400"
                    >
                      <Link to="/childDashboard/submitTask">
                        <button
                          className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                        >
                          Complete
                        </button>
                      </Link>
                    </div>

                  </div>
                )
                )
              }
              <div className="mt-5 flex justify-center">
                <a
                  className="text-purple-500 hover:underline flex items-center"
                  onClick={PresentTasks === 2 ? More : Less}
                >
                  <span>
                    {PresentTasks === 2 ? "View more" : "View less"}
                  </span>
                  {PresentTasks === 2 && <ChevronDownIcon className="h-4 w-4 ml-1" />}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mr-2  mb-4 p-4 bg-white rounded-lg">
        <div className="text-black text-left font-bold text-lg">Summary</div>
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
          <div className="ml-4 mr-4 mb-2">
            <br></br>
            <br></br>



            {tasksData
              .sort((a, b) => a.description - b.description)
              .slice(0, visibleTasks)
              .map(({ id, title, image, description, reward, details }) => (

                <div
                  onClick={() => handleMoreInfoClick({
                    id,
                    title,
                    image,
                    description: description.toLocaleDateString(),
                    reward,
                    details,
                  })}
                  key={id} href="" className="ml-4 mr-4 mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                  <div className="flex">
                    <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                    <div className="ml-3">
                      <span className="font-medium text-black">{title}</span>
                      <br></br>
                     <div className="mt-2"></div>
                      <span className="mt-2 mb-3  text-black">Submission date: {description.toLocaleDateString()}</span><br></br>
                       Time Remaining: 1 day 3 hours
                      <span className="text-black">

                      </span>
                      <div className="mt-1.5 flex">
                        <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />
                        <span className="ml-1 text-xs text-black ">
                          Reward: {reward}
                        </span>
                        <br></br>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ml-auto flex items-end  hover:border-MyPurple-400"
                  >
                  
                    <button
                      onClick={() => handleMoreInfoClick({
                        id,
                        title,
                        image,
                        description: description.toLocaleDateString(),
                        reward,
                        details
                      })}
                      className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                    >
                      more info
                    </button>
                  </div>

                </div>
              )
              )}

            <div className="mt-5 flex justify-center">
              <a
                className="text-purple-500 hover:underline flex items-center"
                onClick={visibleTasks === 3 ? loadMore : loadLess}
              >
                <span>
                  {visibleTasks === 3 ? "View more" : "View less"}
                </span>
                {visibleTasks === 3 && <ChevronDownIcon className="h-4 w-4 ml-1" />}
              </a>
            </div>




          </div>
        )}

        {selectedTask === "Pending" && (
            <div className="ml-4 mr-4 mb-2">
            <br></br>
            <br></br>



            {tasksData
              .sort((a, b) => a.description - b.description)
              .slice(0, visibleTasks)
              .map(({ id, title, image, description, reward, details }) => (

                <div
                  onClick={() => handleMoreInfoClick({
                    id,
                    title,
                    image,
                    description: description.toLocaleDateString(),
                    reward,
                    details,
                  })}
                  key={id} href="" className="ml-4 mr-4 mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                  <div className="flex">
                    <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                    <div className="ml-3">
                      <span className="font-medium text-black">{title}</span>
                      <br></br>
                     <div className="mt-2"></div>
                      <span className="mt-2 mb-3  text-black">Submission date: {description.toLocaleDateString()}</span><br></br>
                       Time Remaining: 1 day 3 hours
                      <span className="text-black">

                      </span>
                      <div className="mt-1.5 flex">
                        <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />
                        <span className="ml-1 text-xs text-black ">
                          Reward: {reward}
                        </span>
                        <br></br>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ml-auto flex items-end  hover:border-MyPurple-400"
                  >
                  
                    <button
                      onClick={() => handleMoreInfoClick({
                        id,
                        title,
                        image,
                        description: description.toLocaleDateString(),
                        reward,
                        details
                      })}
                      className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                    >
                      more info
                    </button>
                  </div>

                </div>
              )
              )}

            <div className="mt-5 flex justify-center">
              <a
                className="text-purple-500 hover:underline flex items-center"
                onClick={visibleTasks === 3 ? loadMore : loadLess}
              >
                <span>
                  {visibleTasks === 3 ? "View more" : "View less"}
                </span>
                {visibleTasks === 3 && <ChevronDownIcon className="h-4 w-4 ml-1" />}
              </a>
            </div>




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
                .map(({ id, title, image, description, reward, details }) => (

                  <div
                    onClick={() => handleSubmittedClick({
                      id,
                      title,
                      image,
                      description: description.toLocaleDateString(),
                      reward,
                      details,
                    })}
                         key={id} href="" className="ml-4 mr-4 mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                  <div className="flex">
                    <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                    <div className="ml-3">
                      <span className="font-medium text-black">{title}</span>
                      <br></br>
                     <div className="mt-2"></div>
                      <span className="mt-2 mb-3  text-black">Submission date: {description.toLocaleDateString()}</span><br></br>
                      
                      <span className="text-black">

                      </span>
                      <div className="mt-1.5 flex">
                        <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />
                        <span className="ml-1 text-xs text-black ">
                          Reward: {reward}
                        </span>
                        <br></br>
                      </div>
                    </div>
                  </div>
                  <div
                    className="ml-auto flex items-end  hover:border-MyPurple-400"
                  >
                  
                  <button
                        className="mt-14 text-white bg-gray-400  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                      >
                        Submitted
                      </button>
                  </div>

                </div>
              )
              )}

           
              <div className="mt-5 flex justify-center">
                <a
                  className="text-purple-500 hover:underline flex items-center"
                  onClick={visibleTasks === 3 ? loadMore : loadLess}
                >
                  <span>
                    {visibleTasks === 3 ? "View more" : "View less"}
                  </span>
                  {visibleTasks === 3 && <ChevronDownIcon className="h-4 w-4 ml-1" />}
                </a>
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

