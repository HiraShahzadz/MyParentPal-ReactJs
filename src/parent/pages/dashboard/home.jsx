import React, { useEffect, useState } from "react";
import axios from "axios";
import ListTasks from "@/parent/dragDrop/ListTasks";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FilterChildTask from "@/parent/dragDrop/FilterChildTask";

export function ParentHome() {
  const [childProfileData, setChildProfileData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    loadChildProfileData();
    loadTasks();
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
  }, []);

  async function loadChildProfileData() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/get-child"
      );
      setChildProfileData(result.data);
      console.log("Child profile data:", result.data);
    } catch (error) {
      console.error("Error loading child profile data:", error);
    }
  }

  async function loadTasks() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/task/getall"
      );
      setTasks(result.data);
      console.log("All tasks:", result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  // Filter tasks based on child IDs and search input
  const filteredTasks = tasks.filter(
    (task) =>
      childProfileData.some((child) => child.id === task.childId) &&
      (selectedChildId ? task.childId === selectedChildId : true) &&
      (searchInput
        ? task.taskname.toLowerCase().includes(searchInput.toLowerCase())
        : true)
  );

  const filterTasksByChild = (childId) => {
    setSelectedChildId(childId);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="mt-6">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="relative mt-4 rounded-md sm:flex md:flex lg:flex">
          <div className="relative sm:col-span-2 sm:col-start-1">
            <div className="mt-2">
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search tasks"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#B089BE"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4 sm:col-span-2">
            <FilterChildTask
              childProfileData={childProfileData}
              setChildProfileData={setChildProfileData}
              filterTasks={filterTasksByChild}
            />
          </div>
        </div>
        {/* Pass the filtered tasks to the ListTasks component */}
        <ListTasks tasks={filteredTasks} setTasks={setTasks} />
      </DndProvider>
    </div>
  );
}

export default ParentHome;
