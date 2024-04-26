import React from 'react';
import { Typography } from "@material-tailwind/react";
import TaskDetailsModal from './TaskDetailsModel';
import { useState, useEffect } from "react";
import FileUploader from './FileUploader';
import ChatForm from './Recorder';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
const SubmitTask = (Details) => {

  // Your component logic goes here
  const images = [
    "/img/re02.png",
    "/img/re03.png",
    // Add more image URLs as needed
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change the interval time as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPreviousSlide = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [submittedFile, setSubmittedFile] = useState(""); // Initialize with an empty string
  const handleFileSelection = (file) => {
    setSelectedFile(file); // Update the selected file state
  };
  const handleAddSubmissionClick = () => {
    setShowFileUploader(true);

  };
  const handleCancelClick = async () => {
    setShowFileUploader(false);
    toast.error("Submission Cancelled!");
  };


  const [submissionClicked, setSubmissionClicked] = useState(false);
  const [submission, setsubmission] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      let url = "http://localhost:8081/api/v1/task_submission/getall";
      const all = await axios.get(url);
      setsubmission(all.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    Details && (
      <div className={`p-4 bg-white mt-4 flex flex-col lg:flex-row gap-4 rounded-lg ${submissionClicked ? 'h-full' : 'h-screen'}`}>
        <div className="lg:w-1/2">
          <Typography variant="h5" color="black" className=" mt-3 mb-8">
            Submit Your Task
          </Typography>
          <p variant="h5" className=" mb-3">
            {Details.taskname}
          </p>
          <Typography variant="h6" className="mb-1 flex justify-left font-semibold">Description:</Typography>
          <p className="text-md mb-5 flex justify-left">{Details.taskdescription}</p>

          {/* Table displaying task details */}
          <div className="rounded-lg mt-2 relative overflow-x-auto">

            <table className="w-full rounded-lg border border-gray-100 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-[#b089be] dark:bg-gray-100 dark:text-gray-400">
                <tr>
                  <th colSpan="2" className="px-6 py-3 text-sm text-white text-center">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>

                <tr >
                  <th scope="row" className="border-r px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Submission date:
                  </th>
                  <td className="px-6 py-4 "> {/* Added pb-8 class for bottom margin */}
                    {Details.taskdate}
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="border-r px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Reward
                  </th>
                  <td className="px-6 py-4">
                    {Details.rewardname}
                  </td>
                </tr>

                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="border-r px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Submission Required
                  </th>
                  <td className="px-6 py-4">
                    {Details.taskfiletype}
                  </td>
                </tr>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="border-r px-6 py-4  text-md text-black font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    File Submitted
                  </th>
                  {submission
                    .map((submit) => (
                      <td className="px-6 py-4 text-md text-gray border-r">
                        {submit.fileName || 'No file submitted'} {/* Display submittedFile or a message */}
                      </td>
                    ))}
                </tr>

              </tbody>
            </table>

            <div className="flex justify-center items-center mt-5">
              <button
                className="mt-5 ml-5 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
                onClick={handleAddSubmissionClick}
              >
                Add Submission
              </button>

            </div>
            {showFileUploader && (
              <div className="bg-white ">

                <FileUploader />
                <DndProvider backend={HTML5Backend}>
                  <Toaster />
                </DndProvider>
              </div>
            )}
          </div>
        </div>



        <div className="mt-6 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center">
          {/* Image Slideshow */}
          <div className="relative">
            <img
              src={images[currentImage]}
              alt="Slideshow"
              className="rounded-lg w-full h-auto"
            />
            <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
              <button
                onClick={goToPreviousSlide}
                className="bg-gray-800 bg-opacity-50 text-white rounded-full p-2 focus:outline-none"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={goToNextSlide}
                className="bg-gray-800 bg-opacity-50 text-white rounded-full p-2 focus:outline-none"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

        </div>
      </div>
    )
  );
};

export default SubmitTask;
