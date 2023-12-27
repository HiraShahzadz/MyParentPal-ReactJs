import React, { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Assignee from "../../attributes/Assignee";
import CalenderInput from "../../attributes/CalenderInput";
import TaskStatus from "../../attributes/TaskStatus";
import TaskTime from "../../attributes/TaskTime";
import RewardPoints from "./RewardPoints";
import MonitorTask from "./MonitorTask";
import Tags from "@/parent/Report/Tags";
import RegulateAccess from "./ RegulateAccess";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const mystatus = [
  { label: "Todo", image: "/img/purple.png" },
  { label: "Completed", image: "/img/green.png" },
  { label: "Reviewed", image: "/img/orange.png" },
  { label: "Rewarded", image: "/img/blue.png" },
];
export function TaskCreation() {
  const [selectedStatus, setSelectedStatus] = useState(mystatus[0]); // Initial selected status

  const [tasks, setTasks] = useState(mystatus[0]);

  console.log("tasks", tasks);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")));
  }, []);
  //***********************************
  //********************************* */ */
  const [task, setTask] = useState({
    id: uuidv4(),
    name: "",
    status: "todo",
  });

  useEffect(() => {
    // Initialize tasks from localStorage or provide an empty array as initial value
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      return toast.error("A task must have more than 3 characters");
    }

    if (task.name.length > 100) {
      return toast.error("A task must not be more than 100 characters");
    }

    // Update tasks using the callback form to ensure proper state update
    setTasks((prevTasks) => {
      // Make sure prevTasks is always an array
      const updatedTasks = [...(prevTasks || []), task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    toast.success("Task Created");

    // Reset the form after submission
    setTask({
      id: uuidv4(),
      name: "",
      status: "todo",
    });
  };
  const [taskid, setId] = useState("");
  const [taskname, setTaskname] = useState("");
  const [taskdescription, setTaskdescription] = useState("");
  const [status, setStatus] = useState(mystatus[0].label);
  const [rewardname, setRewardname] = useState("");
  const [taskfiletype, setTaskfiletype] = useState([]);
  const [taskdate, setTaskdate] = useState("");
  const [tasktime, setTasktime] = useState("12:00");
  const [tasktag, setTasktag] = useState("");
  const [taskassignee, setTaskassignee] = useState("");
  const [tasktype, setTasktype] = useState("");
  console.log("setStatus value:", status);
  //for saving in database
  async function save(event) {
    event.preventDefault();
    try {
      if (taskname.length > 3 && taskname.length < 100) {
        await axios.post("http://localhost:8080/api/v1/task/save", {
          taskname: taskname,
          taskdescription: taskdescription,
          status: status,
          rewardname: rewardname,
          taskfiletype: taskfiletype,
          taskdate: taskdate,
          tasktime: tasktime,
          tasktag: tasktag,
          taskassignee: taskassignee,
          tasktype: tasktype,
        });
        toast.success("Task Created");

        setTaskname("");
        setTaskdescription("");
        setStatus("");
        setRewardname("");
        setTaskfiletype([]);
        setTaskdate("");
        setTasktime("");
        setTasktag("");
        setTaskassignee("");
        setTasktype("");
      }
      if (taskname.length < 3) {
        return toast.error("A task must have more than 3 characters");
      }

      if (taskname.length > 100) {
        return toast.error("A task must not be more than 100 characters");
      }
    } catch (err) {
      return toast.error("Task creation is faild");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-9">
        <DndProvider backend={HTML5Backend}>
          <Toaster />
        </DndProvider>

        <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3 ">
          <Card className="overflow-hidden xl:col-span-2">
            <CardBody className="overflow-x-scroll px-0 pb-3 pt-0">
              <div className=" pb-2 pl-6 pt-6 text-left text-lg font-bold text-black">
                Create Task
              </div>

              <div className="px-6 pb-4">
                <div className="space-y-5">
                  <div className="border-b border-gray-900/10 pb-7">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                      <div className="sm:col-span-full">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Task
                        </label>
                        <div className="mt-1">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                            <input
                              type="text"
                              value={taskname}
                              onChange={(event) => {
                                setTaskname(event.target.value);
                              }}
                              name="taskname"
                              id="taskname"
                              autoComplete="taskname"
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
                        <div className="mt-1">
                          <textarea
                            type="text"
                            id="taskdescription"
                            name="taskdescription"
                            value={taskdescription}
                            rows={3}
                            onChange={(event) => {
                              setTaskdescription(event.target.value);
                            }}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                            placeholder="Write a few sentences about task."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <RewardPoints
                      rewardname={rewardname}
                      setRewardname={setRewardname}
                    />
                  </div>
                  <div>
                    <MonitorTask
                      taskfiletype={taskfiletype}
                      setTaskfiletype={setTaskfiletype}
                    />
                  </div>
                  <div>
                    <RegulateAccess />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="h-fit">
            <div className=" pb-2 pl-6 pt-6 text-left text-lg font-bold text-black">
              Details
            </div>

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
                  <div className="mt-10">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Time
                    </label>
                  </div>
                  <div className="mt-10">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tags
                    </label>
                  </div>
                  <div className="mt-10">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type
                    </label>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="mb-7">
                    <Assignee />
                  </div>

                  <div className="mb-7">
                    <TaskStatus setStatus={setStatus} />
                  </div>

                  <div className="mb-7">
                    <CalenderInput
                      taskdate={taskdate}
                      setTaskdate={setTaskdate}
                    />
                  </div>
                  <div className="mb-7">
                    <TaskTime tasktime={tasktime} setTasktime={setTasktime} />
                  </div>
                  <div>
                    <Tags />
                  </div>

                  <div className="mb-20 space-y-10">
                    <fieldset>
                      <div className="mt-8 flex gap-x-10">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-everything"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                          />
                          <label
                            htmlFor="push-everything"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            One Time
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="push-email"
                            name="push-notifications"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                          />
                          <label
                            htmlFor="push-email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Series
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-5  mt-8 flex justify-end gap-x-6 lg:mt-52">
                <button
                  type="submit"
                  onClick={save}
                  className="mt-6 rounded-md bg-[#B089BE] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  + Create
                </button>
                <button
                  type="button"
                  className="mt-6 rounded-md bg-gray-400 px-4 py-1 font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                >
                  Cancel
                </button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </form>
  );
}

export default TaskCreation;
