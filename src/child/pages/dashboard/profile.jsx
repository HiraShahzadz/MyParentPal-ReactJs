import React, { useState } from 'react';
import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { CameraIcon } from '@heroicons/react/24/solid';
import ProfileSection from './ProfileSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import TaskDetailsModal from './TaskDetailsModel';
import defaultImage from '/img/women1.jpg';
import {
  requestData
} from "@/child/data";
import { GiftIcon } from "@heroicons/react/24/solid";
import {
  tasksData,
} from "@/child/data";
import { Typography } from "@material-tailwind/react";
import bgImage from '/img/bgcover.jpeg'; // Import the image
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export function Profile() {
  const [taskDetailsToShow, setTaskDetailsToShow] = useState(null);//taskdetailmodel
  const handleMoreInfoClick = (task) => {
    setTaskDetailsToShow(task);
  };

  const handleCloseTaskDetails = () => {
    setTaskDetailsToShow(null);
  };

  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    dob: '',
    name: ''
  });
  const [hiddenImages, setHiddenImages] = useState([]);
  const [image, setImage] = useState(defaultImage);
  const [editing, setEditing] = useState(false);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
      setEditing(false); // Save the image
    }
  };

  const handleImageClick = () => {
    setEditing(true);
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
 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Include logic to handle form submission with selectedParent data
    // This might involve sending a request to the backend or triggering notifications

    console.log('Form Data:', formData);
    console.log('Image File:', image);
  };
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
  return (
    <>
      <div className="relative mt-3 h-72 w-full overflow-hidden rounded-xl" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 h-30 w-full " />
      </div>
      <Card className="mx-3 -mt-[150px] mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <label htmlFor="image-upload" className="ml-10 cursor-pointer absolute left-0">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
           <div className="ml-10 mb-5 relative w-40 h-40 border-2 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center mt-[-70px]">
      {editing || !image ? (
        <label htmlFor="upload-image" className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            id="upload-image"
            className="hidden"
            onChange={handleImageChange}
          />
          <CameraIcon className="text-gray-400 w-10 h-10" />
        </label>
      ) : (
        <div className="w-full h-full">
          <img
            src={image}
            alt="Selected"
            className="object-cover w-full h-full rounded-full"
            onClick={handleImageClick}
          />
        </div>
      )}
    </div>
            </label>
          </div>

          <div className="flex flex-col md:flex-row mb-4 mt-10 bg-white mb-8 rounded-lg">
            {/* Left side div */}
            <div className="ml-5 mr-5 mt-5 mb-5 md:w-1/4 p-3 border border-gray-200 rounded-lg shadow-lg">
            
              <ProfileSection />
              
            </div>

            {/* Right side div covering remaining space */}
            <div className="ml-5 mr-5 mt-5 mb-5 md:flex-1 p-2 mt-2 border border-gray-200 rounded-lg shadow-lg">
              <div className="w-full mt-6 mb-1 pl-3 pr-10 flex justify-between items-center">
                <div className="text-black text-left font-bold text-lg">Task Summary</div>
                <div className="text-right">
                <Link to="/childDashboard/home"> 
                <a className="text-purple-500 hover:underline">View All</a>
               </Link>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
              <h2 className="ml-3 mb-3 mt-5 text-md text-black font-bold">Task Rewarded</h2>
              
                {tasksData
                  .filter(task => task.id === 1 || task.id === 2)
                  .map(({ id, title, image, description, reward, details }) => (
                    <div key={id} href="" className="ml-4 mr-4 mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                      <div className="flex">
                        <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                        <div className="ml-3">
                          <span className="font-medium text-black">{title}</span>
                          <br></br>
                          <span className="mt-2 text-black">Submission date: {description.toLocaleDateString()}</span>
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
                 
              <h2 className="ml-3 mb-3 mt-5 text-md text-black font-bold">Assigned Tasks</h2>
              <div className="">
                {tasksData
                  .map(({ id, title, image, description, reward, details }) => (
                    <div key={id} href="" className="ml-4 mr-4 mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                      <div className="flex">
                      <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                        <div className="ml-3">
                          <span className="font-medium text-black">{title}</span>
                          <br></br>
                          <span className="mt-2 text-black">Submission date: {description.toLocaleDateString()}</span>
                          <span className="text-black">

                          </span>
                          <div className="mt-1.5 flex">
                            <img className="h-3 w-3" src="/img/gift.png" alt="" />
                            <span className="ml-1 text-xs text-black ">
                              Reward: {reward}
                            </span>
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
                <h2 className="ml-3 mb-5 mt-5 text-md text-black font-bold">Completed Tasks</h2>
                <div className="max-h-96 overflow-y-auto">
                  <p className="text-sm text-center">Content for Completed Task goes here</p>
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </div>
                  {tasksData
                    .filter(task => task.status === 'completed')
                    .map(({ id, title, image, description, points, details, rewardImage }) => (
                      <div key={id} href="" className="mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                        <div className="flex">
                        <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                          <div className="ml-3">
                            <span className="font-medium text-black">{title}</span>
                            <br></br>
                            <span className="mt-2 text-black">Submission date: {description.toLocaleDateString()}</span>
                            <span className="text-black">

                            </span>
                            <div className="mt-1.5 flex">
                              <img className="h-3 w-3" src="/img/coin.png" alt="" />
                              <span className="ml-1 text-xs text-black ">
                                Reward: {points}
                              </span>
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
                              points,
                              details,
                              rewardImage
                            })}
                            className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                          >
                            more info
                          </button>
                        </div>

                      </div>
                    ))}
                </div>

                <h2 className="ml-3 mb-5 mt-5 text-md text-black font-bold">Pending Tasks</h2>
                <div className="mb-5 max-h-96 overflow-y-auto">
                  <p className='text-sm text-center'>Content for pending Task goes here</p>
                  <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                  </div>
                  {tasksData
                    .filter(task => task.status === 'pending')
                    .map(({ id, title, image, description, points, details, rewardImage }) => (
                      <div key={id} href="" className="mb-2 flex items-center border p-1 rounded-md p-3 text-sm hover:bg-blue-gray-50">

                        <div className="flex">
                          <img className="mt-2 h-6 w-6 " src="/img/bookmark.png" alt="" />
                          <div className="ml-3">
                            <span className="font-medium text-black">{title}</span>
                            <br></br>
                            <span className="mt-2 text-black">Submission date: {description.toLocaleDateString()}</span>
                            <span className="text-black">

                            </span>
                            <div className="mt-1.5 flex">
                              <img className="h-3 w-3" src="/img/coin.png" alt="" />
                              <span className="ml-1 text-xs text-black ">
                                Reward: {points}
                              </span>
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
                              points,
                              details,
                              rewardImage
                            })}
                            className="mt-14 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                          >
                            more info
                          </button>
                        </div>

                      </div>
                    ))}
                </div>
                {taskDetailsToShow && (
                  <TaskDetailsModal
                    selectedTaskDetails={taskDetailsToShow}
                    handleCloseTaskDetails={handleCloseTaskDetails}
                  // handleSubmitTask={/* Pass your handleSubmitTask function here */}
                  />
                )}
              </div>
              </div>
            </div>
          </div>

        </CardBody>
      </Card>
    </>
  );
}
