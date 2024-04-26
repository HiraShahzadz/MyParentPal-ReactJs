import { Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DropDownMenu from "./DropDownMenu";
import { GiftIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
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

  const [taskname, settaskname] = useState("");
  const [taskdescription, settaskdescription] = useState("");
  const [desiredreward, setdesiredreward] = useState("");
  const [rewarddescription, setrewarddescription] = useState("");
  
  const [requestrs, setrequestrs] = useState([]);
 
  useEffect(() => {
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

    try {
      await axios.post("http://localhost:8081/api/v1/Reward_Request/save", {
        taskname: taskname,
        taskdescription: taskdescription,
        desiredreward: desiredreward,
        rewarddescription: rewarddescription,
        
      });
      await axios.post("http://localhost:8081/api/v1/messages/send", {
        taskname: taskname,
        taskdescription: taskdescription,
        desiredreward: desiredreward,
        rewarddescription: rewarddescription,
       });
      toast.success("Request Sent Successfully");
      settaskname("");
      settaskdescription("");
      setdesiredreward("");
      setrewarddescription("");
      Load();
    }
    catch (err) {
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
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
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
      <div className="p-4 bg-white mt-4 mb-8 flex flex-col lg:flex-row gap-4 rounded-lg">
        <div className="lg:w-1/2">
          <Typography variant="h5" color="blue-gray" className="mt-3 mb-8">
            Reward Request
          </Typography>


          <div className="mb-6">
            <label htmlFor="taskName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
              type="text"
              name="taskDescription"
              value={taskdescription}
              onChange={(event) => {
                settaskdescription(event.target.value);
              }}
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
              value={desiredreward}
              onChange={(event) => {
                setdesiredreward(event.target.value);
              }}
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
              type="text"
              value={rewarddescription}
              onChange={(event) => {
                setrewarddescription(event.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 h-32 resize-none dark:bg-gray-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
              placeholder="Please provide reasons for your need for this reward"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={save}
            className="text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
          >
            Submit
          </button>



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
          <div>
          <div
              className='text-sm font-medium text-center text-purple-500 mt-3 ml-3 req-nav-item'
             >
          <DropDownMenu onOptionSelected={(option) => Load(option.value)} />
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
                  <th scope="col" class="px-6 py-3 text-purple-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
              {requestrs
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, displayedRequests)
          .map((request) => (
            <tr key={request.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {request.taskdescription}
              </th>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {request.taskname}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {request.desiredreward}
              </td>
              <td className="px-6 py-4">
                {request.status}
              </td>
              <td className="px-6 py-4">
                {request.date}
              </td>
            </tr>
          ))}
      </tbody>
      {!showAllRequests && requestrs.length > displayedRequests && (
        <tfoot className="bg-white">
          <tr>
            <td colSpan="5" className="text-center py-4">
              <button onClick={handleShowMore} className="bg-[#b089be] text-white px-4 py-2 rounded-md hover:bg-purple-400">
                Show More
              </button>
            </td>
          </tr>
        </tfoot>
      )}
      {showAllRequests && (
        <tfoot className="bg-white">
          <tr>
            <td colSpan="5" className="text-center py-4">
              <button onClick={handleShowLess} className="bg-[#b089be] text-white px-4 py-2 rounded-md hover:bg-purple-400">
                Show Less
              </button>
            </td>
          </tr>
        </tfoot>
      )}
    

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
                {requestrs.map((request) => (
                  <tr key={request.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {request.taskdescription}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {request.taskname}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {request.desiredreward}
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
                {requestrs.map((request) => (
                  <tr key={request.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {request.taskdescription}
                    </th>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {request.taskname}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {request.desiredreward}
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
