import React from "react";
import { Typography } from "@material-tailwind/react";
import TaskDetailsModal from "./TaskDetailsModel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileUploader from "./FileUploader";
import ChatForm from "./Recorder";
import RequestExtension from "./ExtendDeadline";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
const SubmitTask = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Your component logic goes here
  const images = [
    "/img/re02.png",
    "/img/re03.png",
    // Add more image URLs as needed
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000); // Change the interval time as needed (in milliseconds)

    return () => clearInterval(interval);
  }, [images.length]);

  const goToPreviousSlide = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
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
  //check which file type should be accepted
  const [allowedTypes, setAllowedTypes] = useState([]);

  useEffect(() => {
    if (location.state.filetype && Array.isArray(location.state.filetype)) {
      setAllowedTypes(location.state.filetype);
    }
    console.log("Allowed types:", allowedTypes);
  }, [location.state.filetype]);

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
  console.log("submission", submission);
  return (
    <>
      <div
        className={`mt-4 flex flex-col gap-4 rounded-lg bg-white p-4 lg:flex-row ${
          submissionClicked ? "h-full" : "h-screen"
        }`}
      >
        <div className="lg:w-1/2">
          <Typography variant="h5" color="black" className=" mb-8 mt-3">
            Submit Your Task
          </Typography>
          <p variant="h5" className=" mb-3">
            {location.state.taskname}
          </p>
          <Typography
            variant="h6"
            className="justify-left mb-1 flex font-semibold"
          >
            Description:
          </Typography>
          <p className="text-md justify-left mb-5 flex">
            {location.state.taskdescription}
          </p>

          {/* Table displaying task details */}
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
                <tr
                  className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                  style={{ marginBottom: "1rem" }}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Submission date:
                  </th>
                  <td className="px-6 py-4 ">
                    {" "}
                    {/* Added pb-8 class for bottom margin */}
                    {location.state.taskdate} at {location.state.tasktime}
                  </td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Time left:
                  </th>
                  <td className="px-6 py-4">{location.state.timeleft}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Reward
                  </th>
                  <td className="px-6 py-4">{location.state.rewardname}</td>
                </tr>
                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="whitespace-nowrap border-r px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    Submission Required
                  </th>
                  <td className="px-6 py-4">
                    {console.log("File type:", location.state.filetype)}
                    {location.state.filetype &&
                    location.state.filetype.length > 0
                      ? location.state.filetype.join(", ")
                      : "None"}
                  </td>
                </tr>

                <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                  <th
                    scope="row"
                    className="text-md whitespace-nowrap border-r  px-6 py-4 font-medium text-black text-gray-900 dark:text-white"
                  >
                    File Submitted
                  </th>
                  {submission.length > 0 ? (
                    <td className="text-md text-gray border-r px-6 py-4">
                      {submission.find(
                        (sub) => sub.taskid === location.state.id
                      )?.fileName || "No file submitted"}
                    </td>
                  ) : (
                    <td className="text-md text-gray border-r px-6 py-4">
                      No submission yet
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            {(!location.state.tasktime ||
              !location.state.tasktime.includes("passed")) && (
              <>
                {location.state.timeleft &&
                location.state.timeleft.includes("passed") &&
                !submission.some((sub) => sub.taskid === location.state.id) ? (
                  <div className="mb-3 mt-5">
                    <Typography
                      variant="h5"
                      className="center mb-4 mt-6 text-justify text-lg text-black "
                    >
                      <p> Request your parent for time extension</p>
                    </Typography>
                    <RequestExtension taskId={location.state.id} />
                  </div>
                ) : (
                  <>
                    {(!allowedTypes || allowedTypes.length === 0) && (
                      <div className="mb-3 mt-5">
                        <ChatForm taskId={location.state.id} />
                      </div>
                    )}

                    {allowedTypes.includes("Text") && (
                      <>
                        <div className="mb-3 mt-5">
                          <ChatForm taskId={location.state.id} />
                        </div>
                      </>
                    )}

                    {allowedTypes.includes("Text") &&
                      allowedTypes.length > 1 &&
                      !submission.some(
                        (sub) => sub.taskid === location.state.id
                      ) && (
                        <div className="mt-5 flex items-center justify-center">
                          <button
                            className="mb-2 ml-5 mt-5 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
                            onClick={handleAddSubmissionClick}
                          >
                            Add Submission
                          </button>
                        </div>
                      )}

                    {allowedTypes.length > 0 &&
                      !allowedTypes.includes("Text") &&
                      !submission.some(
                        (sub) => sub.taskid === location.state.id
                      ) && (
                        <div className="mt-5 flex items-center justify-center">
                          <button
                            className="mb-2 ml-5 mt-5 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
                            onClick={handleAddSubmissionClick}
                          >
                            Add Submission
                          </button>
                        </div>
                      )}
                  </>
                )}
                {showFileUploader && (
                  <div className="bg-white">
                    <FileUploader
                      taskId={location.state.id}
                      filetype={location.state.filetype}
                    />
                    <DndProvider backend={HTML5Backend}>
                      <Toaster />
                    </DndProvider>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-6 lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
          {/* Image Slideshow */}
          <div className="relative">
            <img
              src={images[currentImage]}
              alt="Slideshow"
              className="h-auto w-full rounded-lg"
            />
            <div className="absolute top-1/2 flex w-full -translate-y-1/2 transform justify-between px-4">
              <button
                onClick={goToPreviousSlide}
                className="rounded-full bg-gray-800 bg-opacity-50 p-2 text-white focus:outline-none"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={goToNextSlide}
                className="rounded-full bg-gray-800 bg-opacity-50 p-2 text-white focus:outline-none"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmitTask;
