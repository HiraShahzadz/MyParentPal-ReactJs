import React, { useState, useEffect } from "react";
import { GiftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Toaster, toast } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CalenderInput from "@/parent/attributes/CalenderInput";
import TaskTime from "@/parent/attributes/TaskTime";
import axios from "axios";

function RespondNotifications({
  onClose,
  childProfileData,
  selectedNotification,
}) {
  const [fileTypes, setFileTypes] = useState([]);
  const [taskdate, setTaskdate] = useState("");
  const [tasktime, setTasktime] = useState("");
  const [taskfiletype, setTaskfiletype] = useState([]);
  const [requestStatus, setRequestStatus] = useState("");

  const handleAccept = async () => {
    if (!taskdate || !tasktime) {
      return toast.error("Please fill in all fields");
    }

    const taskDate = new Date(taskdate);
    const currentDate = new Date();
    const taskDateWithoutTime = new Date(taskDate.toDateString());
    const currentDateWithoutTime = new Date(currentDate.toDateString());

    if (taskDateWithoutTime < currentDateWithoutTime) {
      return toast.error("Task submission date cannot be in the past");
    }
    const selectedTime = new Date(`${taskdate} ${tasktime}`);
    const currentTime = new Date();

    if (selectedTime <= currentTime) {
      return toast.error(
        "Task submission time cannot be in the past or present (1-24)"
      );
    }
    setRequestStatus("Accept");
    try {
      const taskAssignee = childProfileData.find(
        (child) => child.id === selectedNotification.childId
      );

      if (!taskAssignee) {
        return toast.error("Assignee not found");
      }

      const [saveTaskResponse, notifyResponse] = await Promise.all([
        axios.post("http://localhost:8081/api/v1/task/save", {
          taskname: selectedNotification.taskname,
          taskdescription: selectedNotification.taskdescription,
          status: "Todo",
          rewardname: selectedNotification.desiredreward,
          taskfiletype: taskfiletype,
          taskdate: taskdate,
          tasktime: tasktime,
          taskassignee: taskAssignee.name,
          tasktype: "One Time",
          childId: selectedNotification.childId,
        }),
        axios.post(
          "http://localhost:8081/api/v1/notify/assigntaskNotification",
          {
            taskname: selectedNotification.taskname,
          }
        ),
      ]);

      if (saveTaskResponse.status === 200 && notifyResponse.status === 200) {
        toast.success("Request Accepted and Task Created");
        setTaskfiletype([]);
        setTaskdate("");
        setTasktime("");
        onClose(false);
      } else {
        throw new Error("Reward task creation failed");
      }
    } catch (err) {
      toast.error("Reward task creation failed");
    }
  };

  const handleDecline = () => {
    setRequestStatus("Reject");
    toast.error("Request Declined");
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedFileTypes = [...fileTypes];
    if (checked) {
      updatedFileTypes.push(value);
    } else {
      updatedFileTypes = updatedFileTypes.filter((type) => type !== value);
    }
    setFileTypes(updatedFileTypes);
    setTaskfiletype(updatedFileTypes);
  };

  useEffect(() => {
    if (requestStatus) {
      updateRequestStatus();
    }
  }, [requestStatus]);

  const updateRequestStatus = async () => {
    try {
      await axios.put(
        `http://localhost:8081/api/v1/Reward_Request/edit-reward-req/${selectedNotification._id}`,
        {
          status: requestStatus,
        }
      );
      onClose(false);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update request details");
      console.error("Error updating request details:", error);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-20">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>
      <div className="rounded-lg bg-white p-3 shadow-lg md:w-9/12 lg:w-8/12">
        <div className="pt-22 relative flex items-center justify-end">
          <XMarkIcon
            className="h-7 w-7 hover:bg-gray-300"
            onClick={() => onClose(false)}
          />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div className="relative flex max-h-[45vh] flex-col overflow-hidden overflow-y-auto rounded-xl bg-white bg-clip-border text-gray-700 lg:max-h-[50vh] xl:col-span-2">
            <form className="m-2">
              <div className="pb-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  <div className="sm:col-span-full">
                    <label
                      htmlFor="username"
                      className="flex text-lg font-medium leading-6 text-gray-900"
                    >
                      <GiftIcon className="mr-2 h-5 w-5 rounded-sm text-MyPurple-400" />
                      Reward Request
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Task Name
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedNotification.taskname}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedNotification.taskdescription}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Desired Reward
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedNotification.desiredreward}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label className="block font-medium leading-6 text-gray-900">
                      Submission File Type
                    </label>
                    <div>
                      <label className="mr-4 inline-flex items-center">
                        <input
                          type="checkbox"
                          value="Picture"
                          checked={fileTypes.includes("Picture")}
                          onChange={handleCheckboxChange}
                          className="border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
                        />
                        <span className="ml-2 text-black">Picture</span>
                      </label>
                      <label className="mr-4 inline-flex items-center">
                        <input
                          type="checkbox"
                          value="Video"
                          checked={fileTypes.includes("Video")}
                          onChange={handleCheckboxChange}
                          className="border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
                        />
                        <span className="ml-2 text-black">Video</span>
                      </label>
                      <label className="mr-4 inline-flex items-center">
                        <input
                          type="checkbox"
                          value="Audio"
                          checked={fileTypes.includes("Audio")}
                          onChange={handleCheckboxChange}
                          className="border-gray-300 text-MyPurple-400  focus:ring-MyPurple-400"
                        />
                        <span className="ml-2 text-black">Audio</span>
                      </label>
                      <label className="mr-4 inline-flex items-center">
                        <input
                          type="checkbox"
                          value="Text"
                          checked={fileTypes.includes("Text")}
                          onChange={handleCheckboxChange}
                          className="border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
                        />
                        <span className="ml-2 text-black">Text</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      value={fileTypes.join(", ")}
                      readOnly={true}
                      placeholder="File Type"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="mt-3">
                    <label
                      htmlFor="about"
                      className="mb-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Submission Date
                    </label>
                    <CalenderInput
                      taskdate={taskdate}
                      setTaskdate={setTaskdate}
                    />
                  </div>
                  <div className="ml-10 mt-3">
                    <label
                      htmlFor="about"
                      className="mb-2 block text-sm font-medium leading-6 text-gray-900"
                    >
                      Submission Time
                    </label>
                    <TaskTime tasktime={tasktime} setTasktime={setTasktime} />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="m-2 flex w-auto flex-col rounded-md border border-gray-400 bg-white bg-clip-border p-2 text-gray-700">
            <div className="-m-2 rounded-t-sm bg-MyPurple-400 p-2">
              <label
                htmlFor="photo"
                className="block text-base font-medium leading-6 text-white"
              >
                Details
              </label>
            </div>
            <div className="mt-6 flex">
              <div className="mr-4 mt-2">
                <div className="mb-10">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Requested by
                  </label>
                </div>
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Request at
                </label>
              </div>
              <div className="flex flex-col">
                <div className="mb-8 inline-flex w-auto gap-x-1.5 rounded-md bg-white p-2 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {childProfileData.map(
                    (child) =>
                      child.id === selectedNotification.childId && (
                        <React.Fragment key={child.id}>
                          <img
                            className="h-6 w-6 rounded-full object-cover"
                            src={
                              child.img
                                ? `data:image/jpeg;base64,${child.img}`
                                : "/img/user.png"
                            }
                            alt=""
                          />
                          <span className="mt-1">{child.name}</span>
                        </React.Fragment>
                      )
                  )}
                </div>
                <div className="mb-2">
                  <span className="text-sm font-normal text-black">
                    {selectedNotification.date}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center gap-6">
              <button
                className="mr-2 rounded-md border border-MyPurple-400 bg-white px-4 py-2 text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-white  hover:bg-purple-400 hover:text-white hover:shadow-white"
                onClick={handleDecline}
              >
                Decline
              </button>
              <button
                className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
                onClick={handleAccept}
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RespondNotifications;
