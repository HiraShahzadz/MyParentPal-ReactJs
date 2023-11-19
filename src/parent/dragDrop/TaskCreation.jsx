import React, { useEffect, useState } from "react";

import {
  Typography,
  Card,
  CardHeader,
  IconButton,
  CardBody,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import CreateTask from "@/parent/dragDrop/CreateTask";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Assignee from "../attributes/Assignee";

export function TaskCreation() {
  const status = [
    { label: "Todo", image: "path_to_image_1.png" },
    { label: "In Progress", image: "path_to_image_2.png" },
    { label: "Closed", image: "path_to_image_3.png" },
  ];
  const [tasks, setTasks] = useState([]);

  console.log("tasks", tasks);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);

  return (
    <div className="mt-12">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
        <div className="mb-10">
          <CreateTask tasks={tasks} setTasks={setTasks} />
        </div>
      </DndProvider>

      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="overflow-hidden xl:col-span-2">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Create Task
              </Typography>
            </div>
            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>

          <div className="px-6 pb-6">
            <form>
              <div className="space-y-5">
                <div className="border-b border-gray-900/10 pb-7">
                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-full">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Task
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="task"
                            id="task"
                            autoComplete="task"
                            className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Task name"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                          placeholder="Write a few sentences about task."
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="city"
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Points
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="region"
                          id="region"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Reward
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-10 border-b border-gray-900/10 pb-12">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Proof
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Do you want proof of task from your child?
                    </p>
                    <div className="mt-6 flex gap-x-20 ">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          No
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[#B089BE] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#B089BE] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  + Create
                </button>
              </div>
            </form>
          </div>
        </Card>
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Details
            </Typography>
          </CardHeader>
          <CardBody className="pt-0">
            <div className="flex">
              <div className="mr-4 mt-2">
                <div className="mb-10">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Assignee
                  </label>
                </div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status
                </label>
                <div className="mt-10">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-4">
                  <Assignee />
                </div>
                <div>
                  <input type="text" className="mb-2" placeholder="Input 2" />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default TaskCreation;
