import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import { GiftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { requestData } from "@/child/data";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import {
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
export function Reward_Request() {
  const [taskname, settaskname] = useState("");
  const [taskdescription, settaskdescription] = useState("");
  const [desiredreward, setdesiredreward] = useState("");
  const [rewarddescription, setrewarddescription] = useState("");
  const navigate = useNavigate();

  const [requestrs, setrequestrs] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
    Load();
  }, []);

  async function Load(filter = "") {
    try {
      let url = "http://localhost:8081/api/v1/Reward_Request/getall";
      if (filter === "latest") {
        url += "?filter=latest";
      }
      const allrequests = await axios.get(url);
      setrequestrs(allrequests.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function save(event) {
    event.preventDefault();

    if (!taskname || !taskdescription || !desiredreward || !rewarddescription) {
      return toast.error("Please fill in all fields");
    }

    let url1 = "http://localhost:8081/api/v1/Reward_Request/save";
    let url2 = "http://localhost:8081/api/v1/notify/sendRequestNotification";

    let promise1 = axios.post(url1, {
      taskname: taskname,
      taskdescription: taskdescription,
      desiredreward: desiredreward,
      rewarddescription: rewarddescription,
    });

    let promise2 = axios.post(url2, {
      taskname: taskname,
      taskdescription: taskdescription,
      desiredreward: desiredreward,
      rewarddescription: rewarddescription,
    });

    try {
      // Send both requests simultaneously using Promise.all()
      Promise.all([promise1, promise2]);

      toast.success("Request Sent Successfully");
      settaskname("");
      settaskdescription("");
      setdesiredreward("");
      setrewarddescription("");
      Load();
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }

      toast.error("Failed to send request");
    }
  }

  const [childProfile, setChildProfile] = useState([]);
  useEffect(() => {
    loadParentProfile();
  }, []);
  async function loadParentProfile() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/getChildId"
      );
      setChildProfile(result.data);
      console.log("child profile:", result.data);
    } catch (error) {
      console.error("Error loading parentProfile:", error);
    }
  }
  const myProfile = childProfile.find((profile) => profile);
  console.log();

  const images = [
    "/img/re02.png",
    "/img/re03.png",
    // Add more image URLs as needed
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedTask, setSelectedTask] = useState("All Requests");
  useEffect(() => {
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
  const [displayedRequests, setDisplayedRequests] = useState(4);
  const [showAllRequests, setShowAllRequests] = useState(false);

  const handleShowMore = () => {
    setDisplayedRequests(requestrs.length);
    setShowAllRequests(true);
  };

  const handleShowLess = () => {
    setDisplayedRequests(4);
    setShowAllRequests(false);
  };

  return (
    <div>
      <div className="mb-8 mt-4 flex flex-col gap-4 rounded-lg bg-white p-4 lg:flex-row">
        <div className="lg:w-1/2">
          <Typography variant="h5" color="blue-gray" className="mb-8 mt-3">
            Reward Request
          </Typography>

          <div className="mb-6">
            <label
              htmlFor="taskName"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={taskname}
              onChange={(event) => {
                settaskname(event.target.value);
              }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              placeholder="Enter task name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="taskDescription"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Task Description
            </label>
            <textarea
              id="taskDescription"
              type="text"
              name="taskDescription"
              value={taskdescription}
              onChange={(event) => {
                settaskdescription(event.target.value);
              }}
              className="block h-32 w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-purple-600 dark:bg-gray-700 dark:text-white dark:placeholder-purple-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              placeholder="Enter task description"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="desiredReward"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Desired Reward
            </label>
            <input
              type="text"
              id="desiredReward"
              name="desiredReward"
              value={desiredreward}
              onChange={(event) => {
                setdesiredreward(event.target.value);
              }}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              placeholder="Enter desired reward"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="rewardDescription"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Why do you need this reward?
            </label>
            <textarea
              id="rewardDescription"
              name="rewardDescription"
              type="text"
              value={rewarddescription}
              onChange={(event) => {
                setrewarddescription(event.target.value);
              }}
              className="block h-32 w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-purple-600 dark:bg-gray-700 dark:text-white dark:placeholder-purple-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              placeholder="Please provide reasons for your need for this reward"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={save}
            className="mb-2 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
          >
            Submit
          </button>
        </div>
        <div className="lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center">
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

      <div className="mb-8 mt-7 flex-col gap-4 rounded-lg bg-white p-4">
        <Typography variant="h5" color="blue-gray" className="mb-8 mt-5">
          Request History
        </Typography>
        <div className="flex gap-4">
          <div className="flex rounded-lg text-purple-500 shadow-lg">
            <div
              className={`req-nav-item mb-2 ml-3 mt-3  text-center text-sm font-medium text-purple-500 ${
                selectedTask === "All Requests" ? "active" : ""
              } cursor-pointer p-2`}
              onClick={() => setSelectedTask("All Requests")}
            >
              All Requests
            </div>
            <div
              className={`req-nav-item mb-2 ml-3 mt-3  text-center text-sm font-medium text-purple-500 ${
                selectedTask === "Accepted" ? "active" : ""
              } cursor-pointer p-2`}
              onClick={() => setSelectedTask("Accepted")}
            >
              Accepted Requests
            </div>
            <div
              className={`req-nav-item mb-2 ml-3 mt-3 text-center text-sm font-medium text-purple-500 ${
                selectedTask === "Rejected" ? "active" : ""
              } cursor-pointer p-2`}
              onClick={() => setSelectedTask("Rejected")}
            >
              Rejected Requests
            </div>
          </div>
          <div></div>
        </div>
        {selectedTask === "All Requests" && (
          <div class="relative mt-8 overflow-x-auto">
            <table class="w-full rounded-lg bg-purple-800 text-left text-sm text-gray-500 dark:text-gray-700 rtl:text-right ">
              <thead class="bg-purple-50 text-xs uppercase text-gray-700 dark:bg-gray-100 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Task Description
                  </th>
                  <th scope="col" class="px-6 py-3  text-purple-400">
                    Task Name
                  </th>
                  <th scope="col" class="px-6 py-3  text-purple-400">
                    Desired Reward
                  </th>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {myProfile && (
                  <>
                    {requestrs
                      .filter((request) => request.childId === myProfile.id)
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, displayedRequests)
                      .map((request) => (
                        <tr
                          key={request.id}
                          className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {request.taskdescription}
                          </th>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {request.taskname}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {request.desiredreward}
                          </td>
                          <td className="px-6 py-4">{request.status}</td>
                          <td className="px-6 py-4">{request.date}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
              {!showAllRequests && requestrs.length > displayedRequests && (
                <tfoot className="bg-white">
                  <tr>
                    <td colSpan="5" className="py-4 text-center">
                      <button
                        onClick={handleShowMore}
                        className="rounded-md bg-[#b089be] px-4 py-2 text-white hover:bg-purple-400"
                      >
                        Show More
                      </button>
                    </td>
                  </tr>
                </tfoot>
              )}
              {showAllRequests && (
                <tfoot className="bg-white">
                  <tr>
                    <td colSpan="5" className="py-4 text-center">
                      <button
                        onClick={handleShowLess}
                        className="rounded-md bg-[#b089be] px-4 py-2 text-white hover:bg-purple-400"
                      >
                        Show Less
                      </button>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}

        {selectedTask === "Accepted" && (
          <div class="relative mt-8 overflow-x-auto">
            <table class="w-full rounded-lg bg-purple-800 text-left text-sm text-gray-500 dark:text-gray-700 rtl:text-right ">
              <thead class="bg-purple-50 text-xs uppercase text-gray-700 dark:bg-gray-100 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Task Description
                  </th>
                  <th scope="col" class="px-6 py-3  text-purple-400">
                    Task Name
                  </th>
                  <th scope="col" class="px-6 py-3  text-purple-400">
                    Desired Reward
                  </th>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {myProfile && (
                  <>
                    {requestrs
                      .filter(
                        (request) =>
                          request.childId === myProfile.id &&
                          request.status === "Accepted"
                      )
                      .map((request) => (
                        <tr
                          key={request.id}
                          className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {request.taskdescription}
                          </th>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {request.taskname}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {request.desiredreward}
                          </td>
                          <td className="px-6 py-4">{request.status}</td>
                          <td className="px-6 py-4">{request.date}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}

        {selectedTask === "Decline" && (
          <div class="relative mt-8 overflow-x-auto">
            <table class="w-full rounded-lg bg-purple-800 text-left text-sm text-gray-500 dark:text-gray-700 rtl:text-right ">
              <thead class="bg-purple-50 text-xs uppercase text-gray-700 dark:bg-gray-100 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Task Description
                  </th>
                  <th scope="col" class="px-6 py-3  text-purple-400">
                    Task Name
                  </th>
                  <th scope="col" class="px-6 py-3  text-purple-400">
                    Desired Reward
                  </th>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {myProfile && (
                  <>
                    {requestrs
                      .filter(
                        (request) =>
                          request.childId === myProfile.id &&
                          request.status === "Rejected"
                      )
                      .map((request) => (
                        <tr
                          key={request.id}
                          className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <th
                            scope="row"
                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                          >
                            {request.taskdescription}
                          </th>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {request.taskname}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {request.desiredreward}
                          </td>
                          <td className="px-6 py-4">{request.status}</td>
                          <td className="px-6 py-4">{request.date}</td>
                        </tr>
                      ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>
    </div>
  );
}

export default Reward_Request;
