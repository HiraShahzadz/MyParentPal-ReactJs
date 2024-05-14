import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import FileUploader from "./FileUploader";
import Penalty from "./Penalty";
import { TagIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { GiftIcon } from "@heroicons/react/24/solid";
function PaneltyTask({ onClose, task, childProfileData }) {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handledecline = (event) => {
    event.preventDefault();
    onClose(false);
  };

  const [taskid, setId] = useState("");
  const [taskname, setTaskname] = useState("");
  const [taskdescription, setTaskdescription] = useState("");
  const [status, setStatus] = useState("Reviewed");
  const [taskfiletype, setTaskfiletype] = useState([]);
  const [taskdate, setTaskdate] = useState("");
  const [tasktime, setTasktime] = useState();
  const [taskTypeIs, setTaskTypeIs] = useState("Penalty");
  const [taskId, setTaskId] = useState("");
  const [cheatTags, setCheatTags] = useState([]);
  const [childId, setChildId] = useState("");
  const [taskRemarks, setTaskRemarks] = useState("");
  const [percentage, setPercentage] = useState("");
  //for saving in database
  async function save(event) {
    event.preventDefault();
    if (!taskname || !taskdescription || !taskdate || !cheatTags) {
      return toast.error("Please fill in all fields");
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
      if (taskname.length > 3 && taskname.length < 15) {
        await axios.post("http://localhost:8081/api/v1/task/save_penalty", {
          taskname,
          taskdescription,
          status: "Todo",
          taskfiletype,
          taskdate,
          tasktime,
          rewardname: task.rewardname,
          taskassignee: task.taskassignee,
          childId: task.childId,
          taskTypeIs,
          tasktag: task.tasktag,
          tasktype: task.tasktype,
          taskId: task._id,
          cheatTags,
          taskRemarks: taskRemarks,
        });
        toast.success("Task Created");
        setTaskname("");
        setTaskdescription("");
        setStatus("");
        setTaskfiletype([]);
        setTaskdate("");
        setTasktime("");
        setChildId("");
        setTaskTypeIs("");
        setTaskId("");
        setCheatTags([]);
      }
      if (taskname.length <= 3) {
        return toast.error("A task must have more than 3 characters");
      }

      if (taskname.length >= 15) {
        return toast.error("A task must not be more than 15 characters");
      }
    } catch (err) {
      return toast.error("Task creation is faild" + err);
    }
  }

  async function update(event) {
    try {
      await axios.put(`http://localhost:8081/api/v1/task/edit/${task._id}`, {
        status: status,
      });

      // If the update is successful, display a success message
      toast.success("Task details edited");
      // Reload the page
      window.location.reload();
    } catch (error) {
      // If the update fails, display an error message
      toast.error("Failed to update task details");
      console.error("Error updating task details:", error);
    }
  }

  async function updateTask(event) {
    if (!taskRemarks) {
      return toast.error("Please Add remarks");
    }
    try {
      await axios.put(
        `http://localhost:8081/api/v1/task/edit_task/${task._id}`,
        {
          taskname: task.taskname,
          taskdescription: task.taskdescription,
          rewardname: task.rewardname,
          taskdate: task.taskdate,
          tasktime: task.tasktime,
          tasktag: task.tasktag,
          taskfiletype: task.taskfiletype,
          status: status,
          taskRemarks: taskRemarks,
          percentage: percentage,
        }
      );

      // If the update is successful, display a success message
      toast.success("Task details edited");
      setTaskRemarks("");
      setPercentage("");
    } catch (error) {
      // If the update fails, display an error message
      toast.error("Failed to update task details");
      console.error("Error updating task details:", error);
    }
  }
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-20">
      <div className="rounded-lg bg-white p-3 shadow-lg md:w-9/12 lg:w-9/12">
        <div class="pt-22 relative flex items-center justify-end">
          <XMarkIcon
            className="h-7 w-7 hover:bg-gray-300"
            onClick={() => onClose(false)}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3  ">
          <div className=" relative flex max-h-[45vh] flex-col overflow-hidden overflow-y-auto rounded-xl bg-white bg-clip-border text-gray-700 sm:max-h-[40vh] md:max-h-[40vh]  lg:max-h-[50vh]  xl:col-span-2">
            <form onSubmit={handleSubmit} className="m-2 ">
              <DndProvider backend={HTML5Backend}>
                <Toaster />
              </DndProvider>

              <div className="pb-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-full">
                    <label
                      htmlFor="username"
                      className="block text-xl font-medium leading-6 text-gray-900"
                    >
                      Task Name: {task.taskname}
                    </label>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="text block font-medium leading-6 text-gray-900"
                    >
                      Description:
                    </label>
                    <label
                      htmlFor="name"
                      className="block text-gray-900 dark:text-white"
                    >
                      {task.taskdescription}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <div className="flex">
                      {" "}
                      <GiftIcon className="mr-1 mt-0.5 h-4 w-4 rounded-sm text-MyPurple-400 " />
                      <label
                        htmlFor="about"
                        className="text block font-medium leading-6 text-gray-900"
                      >
                        Reward :
                      </label>
                      <label
                        htmlFor="name"
                        className="ml-1 block text-gray-900 dark:text-white"
                      >
                        {task.rewardname}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="about"
                  className="block font-medium leading-6 text-gray-900"
                >
                  Proof
                </label>
                <div>
                  <FileUploader taskId={task._id} />
                </div>
              </div>

              <div className="rounded-lg border border-gray-400 bg-gray-100 p-2">
                <Penalty
                  taskid={taskid}
                  taskname={taskname}
                  status={status}
                  setStatus={setStatus}
                  taskdescription={taskdescription}
                  taskfiletype={taskfiletype}
                  cheatTags={cheatTags}
                  setTaskname={setTaskname}
                  setTaskdescription={setTaskdescription}
                  setTaskfiletype={setTaskfiletype}
                  setCheatTags={setCheatTags}
                  taskdate={taskdate}
                  setTaskdate={setTaskdate}
                  tasktime={tasktime}
                  setTasktime={setTasktime}
                  taskRemarks={taskRemarks}
                  setTaskRemarks={setTaskRemarks}
                  percentage={percentage}
                  setPercentage={setPercentage}
                />
              </div>
            </form>
          </div>
          <div className="m-2 flex flex-col rounded-md border border-gray-400 bg-white bg-clip-border p-2 text-gray-700">
            <div className=" -m-2 rounded-t-sm bg-MyPurple-400 p-2 ">
              <label
                htmlFor="photo"
                className=" block text-base font-medium leading-6 text-white"
              >
                Details
              </label>
            </div>
            <div className="mt-6 flex">
              <div className="mr-4 mt-2">
                <div className="mb-6">
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

                <div className="mt-6">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tags
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative mb-4 inline-block text-left">
                  <div className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {childProfileData.map(
                      (child) =>
                        child.id === task.childId && (
                          <div key={child.id}>
                            <img
                              className="mt-0.5 h-5 w-5 rounded-full object-cover"
                              src={
                                child.img
                                  ? `data:image/jpeg;base64,${child.img}`
                                  : "/img/userc.png"
                              }
                              alt=""
                            />
                          </div>
                        )
                    )}
                    <span className="mt-0.5">{task.taskassignee}</span>
                  </div>
                </div>

                <div className=" mb-4">
                  <div className="inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ">
                    <img
                      className="rounded-fullr m-1 h-3 w-3"
                      src="/img/green.png"
                      alt=""
                    />
                    <span>{task.status}</span>
                  </div>
                </div>

                <div>
                  <div className="inline-flex justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ">
                    <TagIcon className="h-4 w-4 text-MyPurple-400" />
                    <span>{task.tasktag}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-2 flex flex-col rounded-md border border-gray-400 bg-white bg-clip-border text-gray-700">
              <div className="grid grid-cols-3 gap-x-4">
                <div className="col-span-1 border-r border-gray-400 pl-4 pt-1">
                  <label className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                    Time
                  </label>
                  <div className="mt-1">{task.tasktime}</div>
                </div>
                <div className="col-span-1  border-r border-gray-400 pt-1">
                  <label className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                    Date
                  </label>
                  <div className="mt-1">{task.taskdate}</div>
                </div>
                <div className="col-span-1 pt-1">
                  <label className="mt-2 block text-sm font-medium leading-6 text-gray-900">
                    Type
                  </label>
                  <div className="mt-1">{task.tasktype}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-64 mt-2 flex justify-start">
          <button
            type="submit"
            onClick={(event) => {
              save(event);
              update(event);
              updateTask(event);
            }}
            className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
          >
            Save
          </button>
          <button
            onClick={handledecline}
            className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaneltyTask;
