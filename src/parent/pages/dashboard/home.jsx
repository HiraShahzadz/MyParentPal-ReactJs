import React, { useEffect, useState } from "react";
import ListTasks from "@/parent/dragDrop/ListTasks";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FilterChildTask from "@/parent/dragDrop/FilterChildTask";
import { Button } from "@material-tailwind/react";
import axios from "axios";
export function ParentHome() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://localhost:8081/api/v1/task/getall");
    setTasks(result.data);
    console.log(result.data);
  }
  console.log("tasks", tasks);

  return (
    <div className="mt-6">
      <DndProvider backend={HTML5Backend}>
        <Toaster />

        <div className="relative mt-4 grid grid-cols-1 gap-x-2 gap-y-3 rounded-md sm:grid-cols-8">
          <div className="relative sm:col-span-2 sm:col-start-1">
            <div className="mt-2">
              <div className="relative">
                <input
                  type="text"
                  name="text"
                  id="file"
                  placeholder="Search tasks"
                  autoComplete="address-level2"
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
            <FilterChildTask />
          </div>
        </div>
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </DndProvider>
    </div>
  );
}

export default ParentHome;
