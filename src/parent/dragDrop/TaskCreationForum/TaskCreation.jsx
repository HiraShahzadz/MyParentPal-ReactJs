import React, { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Card, CardBody } from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import Assignee from "../../attributes/Assignee";
import CalenderInput from "../../attributes/CalenderInput";
import TaskStatus from "../../attributes/TaskStatus";
import TaskTime from "../../attributes/TaskTime";
import RewardPoints from "./RewardPoints";
import MonitorTask from "./MonitorTask";
import Tags from "@/parent/Report/Tags";
import RegulateAccess from "./RegulateAccess";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const mystatus = [{ label: "Todo", image: "/img/purple.png" }];
export function TaskCreation() {
  const navigate = useNavigate();

  const [selectedStatus, setSelectedStatus] = useState(mystatus[0]); // Initial selected status

  const [tasks, setTasks] = useState(mystatus[0]);

  console.log("tasks", tasks);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
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
  const [tasktime, setTasktime] = useState();
  const [tasktag, setTasktag] = useState("");
  const [taskassignee, setTaskassignee] = useState("");
  const [tasktype, setTasktype] = useState("");
  const [childId, setChildId] = useState("");
  console.log("setStatus value:", status);
  //for saving in database
  async function save(event) {
    event.preventDefault();
    if (!taskname || !taskdescription || !rewardname) {
      return toast.error("Please fill in all fields");
    }
    if (!taskassignee || !childId) {
      return toast.error("Please select task assignee");
    }
    if (!tasktag) {
      return toast.error("tags create in child profile");
    }
    if (!tasktype) {
      return toast.error("Select the type of task");
    }
    if (!taskdate) {
      return toast.error("Please select the submission date");
    }
    if (!tasktime) {
      return toast.error("Please select the submission time");
    }
    const taskDate = new Date(taskdate);
    const currentDate = new Date();

    // Extract the date part without considering the time
    const taskDateWithoutTime = new Date(taskDate.toDateString());
    const currentDateWithoutTime = new Date(currentDate.toDateString());

    if (taskDateWithoutTime < currentDateWithoutTime) {
      return toast.error("Task submission date cannot be in the past ");
    }
    const selectedTime = new Date(taskdate + " " + tasktime);

    // Compare with the current time
    const currentTime = new Date();

    if (selectedTime <= currentTime) {
      return toast.error(
        "Task submission time cannot be in the past or present (1-24)"
      );
    }

    try {
      if (
        taskname.length > 3 &&
        taskname.length < 15 &&
        taskdescription.length > 20 &&
        taskdescription.length < 200 &&
        rewardname.length > 3
      ) {
        let url1 = "http://localhost:8081/api/v1/task/save";
        let url2 = "http://localhost:8081/api/v1/notify/assigntaskNotification";

        let promise1 = axios.post(url1, {
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
          childId: childId,
        });

        let promise2 = axios.post(url2, {
          taskname: taskname,
          childId: childId,
        });

        Promise.all([promise1, promise2]);
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
        setChildId("");
      }
      if (taskname.length <= 3) {
        return toast.error("A task must have more than 3 characters");
      }

      if (taskname.length >= 15) {
        return toast.error("A task must not be more than 15 characters");
      }
      if (taskdescription.length <= 20) {
        return toast.error(
          "Description should have a minimum of 20 characters"
        );
      }

      if (taskdescription.length >= 200) {
        return toast.error(
          "Description should have a maximum of 200 characters"
        );
      }
      if (rewardname.length <= 3) {
        return toast.error("Reward name should contain more then 3 characters");
      }
      window.location.reload();
    } catch (err) {
      return toast.error("Task creation is faild", err);
    }
  }
  const [childProfileData, setChildProfileData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    loadChildProfileData();
    loadTasks();
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
      setTasksData(result.data);
      console.log("All tasks:", result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  useEffect(() => {
    if (selectedChildId && selectedTag) {
      const filtered = tasksData.filter(
        (task) =>
          task.childId === selectedChildId &&
          task.tags &&
          task.tags.includes(selectedTag)
      );
      setFilteredTasks(filtered);
    } else if (selectedChildId) {
      const filtered = tasksData.filter(
        (task) => task.childId === selectedChildId
      );
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasksData);
    }
  }, [selectedChildId, selectedTag, tasksData]);

  const filterTasksByChild = (childId) => {
    setSelectedChildId(childId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-9">
        <DndProvider backend={HTML5Backend}>
          <Toaster />
        </DndProvider>

        <div className="mb-4 grid grid-cols-1 gap-3 xl:grid-cols-3 ">
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
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                              placeholder="Task name"
                              required
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                            placeholder="Write a few sentences about task."
                            required
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
                </div>
              </div>
            </CardBody>
          </Card>
          <Card className="h-fit">
            <div className=" pb-2 pl-6 pt-6 text-left text-lg font-bold text-black">
              Details
            </div>

            <CardBody className="overflow-hidden overflow-x-scroll pt-0">
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
                    <Assignee
                      setTaskassignee={setTaskassignee}
                      setChildId={setChildId}
                      childProfileData={childProfileData}
                      filterTasks={filterTasksByChild}
                    />
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
                    <TaskTime
                      tasktime={tasktime}
                      setTasktime={setTasktime}
                      taskdate={taskdate}
                    />
                  </div>
                  <div>
                    <Tags
                      childProfileData={childProfileData}
                      setTasktag={setTasktag}
                      selectedChildId={selectedChildId}
                    />
                  </div>

                  <div className="mb-20 space-y-10">
                    <fieldset>
                      <div className="mt-8 flex gap-x-10">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="onetime"
                            name="type"
                            type="radio"
                            value="One Time"
                            onChange={(event) => {
                              setTasktype(event.target.value);
                            }}
                            className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                            required
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
                            id="series"
                            name="type"
                            type="radio"
                            value="Series"
                            onChange={(event) => {
                              setTasktype(event.target.value);
                            }}
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
