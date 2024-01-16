import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  requestData
} from "@/child/data";
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
  const images = [
    "/img/re02.png",
    "/img/re03.png",
    // Add more image URLs as needed
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [selectedParent, setSelectedParent] = useState('');
  const [selectedTask, setSelectedTask] = useState("All Requests");
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

  const [childName, setChildName] = useState('ChildName'); // Replace with actual child's name
  const [parentName, setParentName] = useState('');

  useEffect(() => {
    const fetchParentFromDatabase = async () => {
      try {
        // Send a request to your backend API endpoint to retrieve the parent's name based on the child's name
        const response = await fetch(`https://your-api-url.com/parents?childName=${childName}`, {
          method: 'GET',
          // Add headers or authentication tokens if required
        });

        const parentData = await response.json();

        // Assuming the response contains the parent's name associated with the child's name
        if (parentData && parentData.parentName) {
          setParentName(parentData.parentName);
        }
      } catch (error) {
        console.error('Error fetching parent data:', error);
        // Handle errors if necessary
      }
    };

    fetchParentFromDatabase();
  }, [childName]);

  //
  const handleSubmit = (event) => {
    event.preventDefault();

    // Include logic to handle form submission with selectedParent data
    // This might involve sending a request to the backend or triggering notifications

    console.log('Task Name:', event.target.taskName.value);
    console.log('Task Description:', event.target.taskDescription.value);
    console.log('Desired Reward:', event.target.desiredReward.value);
    console.log('Selected Parent:', selectedParent);
  };
  // State variables for managing request history
  const [requests, setRequests] = useState([]); // List of all requests
  const [approvedRequests, setApprovedRequests] = useState([]); // List of approved requests
  const [rejectedRequests, setRejectedRequests] = useState([]); // List of rejected requests

  // Function to simulate fetching request history data from the backend
  const fetchRequestHistory = () => {
    // Simulated data for request history (replace this with actual data retrieval logic)
    const allRequests = [
      { id: 1, taskName: "Task 1", status: "approved" },
      { id: 2, taskName: "Task 2", status: "rejected" },
      // Add more request objects as needed
    ];

    // Filter requests based on status
    const approved = allRequests.filter((req) => req.status === "approved");
    const rejected = allRequests.filter((req) => req.status === "rejected");

    // Update state with fetched data
    setRequests(allRequests);
    setApprovedRequests(approved);
    setRejectedRequests(rejected);
  };
  async function sendrequest(event) {
    toast.success("Request sent successfully!");
  }
  
  useEffect(() => {
    // Fetch request history data when component mounts
    fetchRequestHistory();
  }, []);
  return (
    
    <div>
      <div className="p-4 bg-white mt-4 mb-8 flex flex-col lg:flex-row gap-4 rounded-lg">
        <div className="lg:w-1/2">
          <Typography variant="h5" color="blue-gray" className="mt-3 mb-8">
            Reward Request
          </Typography>

          <form onSubmit={sendrequest}>
            <div className="mb-6">
              <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                placeholder="Enter task name"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="taskDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Task Description
              </label>
              <textarea
                id="taskDescription"
                name="taskDescription"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 h-32 resize-none dark:bg-gray-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                placeholder="Enter task description"
                required
              ></textarea>
            </div>
            <div className="mb-6">
              <label htmlFor="desiredReward" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Desired Reward
              </label>
              <input
                type="text"
                id="desiredReward"
                name="desiredReward"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                placeholder="Enter desired reward"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="rewardDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Why do you need this reward?
              </label>
              <textarea
                id="rewardDescription"
                name="rewardDescription"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 h-32 resize-none dark:bg-gray-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                placeholder="Please provide reasons for your need for this reward"
                required
              ></textarea>
            </div>

            <button
              type="submit"
             
              className="text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
            >
              Submit
            </button>
            

          </form>
        </div>
        <div className="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:items-center">
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


      <div className="p-4 bg-white mt-7 mb-8 flex-col gap-4 rounded-lg">
        <Typography variant="h5" color="blue-gray" className="mt-5 mb-8">
          Request History
        </Typography>
        <div className="flex gap-4">
          <div className="flex text-purple-500 shadow-lg rounded-lg">
            <div
              className={`text-sm font-medium text-center text-purple-500  mt-3 mb-2 ml-3 req-nav-item ${selectedTask === "All Requests" ? "active" : ""} p-2 cursor-pointer`}
              onClick={() => setSelectedTask("All Requests")}
            >
              All Requests
            </div>
            <div
              className={`text-sm font-medium text-center text-purple-500  mt-3 mb-2 ml-3 req-nav-item ${selectedTask === "Approved Requests" ? "active" : ""} p-2 cursor-pointer`}
              onClick={() => setSelectedTask("Approved Requests")}
            >
              Approved Requests
            </div>
            <div
              className={`text-sm font-medium text-center text-purple-500 mt-3 mb-2 ml-3 req-nav-item ${selectedTask === "Rejected Requests" ? "active" : ""} p-2 cursor-pointer`}
              onClick={() => setSelectedTask("Rejected Requests")}
            >
              Rejected Requests
            </div>
          </div>
        </div>
        {selectedTask === "All Requests" && (

          <div class="mt-8 relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700 bg-purple-800 rounded-lg ">
              <thead class="text-xs text-gray-700 uppercase bg-purple-50 dark:bg-gray-100 dark:text-gray-400">
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
                </tr>
              </thead>
              <tbody>
                {requestData.map(({ id, title, description, reward, status }) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {description}
                    </th>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {title}
                    </td>
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {reward}
                    </td>
                    <td class="px-6 py-4 ">
                      {status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTask === "Approved Requests" && (
          <div class="mt-8 relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700 bg-purple-800 rounded-lg ">
              <thead class="text-xs text-gray-700 uppercase bg-purple-50 dark:bg-gray-100 dark:text-gray-400">
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

                </tr>
              </thead>
              <tbody>
                {requestData
                  .filter(({ id }) => id === 1)
                  .map(({ id, title, description, reward, status }) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {description}
                      </th>
                      <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {title}
                      </td>
                      <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {reward}
                      </td>

                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTask === "Rejected Requests" && (
          <div class="mt-8 relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700 bg-purple-800 rounded-lg ">
              <thead class="text-xs text-gray-700 uppercase bg-purple-50 dark:bg-gray-100 dark:text-gray-400">
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

                </tr>
              </thead>
              <tbody>
                {requestData
                  .filter(({ id }) => id === 2)
                  .map(({ id, title, description, reward, status }) => (
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {description}
                      </th>
                      <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {title}
                      </td>
                      <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {reward}
                      </td>

                    </tr>
                  ))}
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
