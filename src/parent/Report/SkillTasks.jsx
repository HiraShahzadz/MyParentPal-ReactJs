import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { GiftIcon } from "@heroicons/react/24/solid";
import tasksData from "@/parent/data/tasksData";
import TaskDetailsModal from "../ChildProfiles/Profile/TaskDetailsModal";
export function SkillTasks({ tasksData, childProfileData }) {
  const [childName, setChildName] = useState(null);
  const [taskDetailsToShow, setTaskDetailsToShow] = useState(null); //taskdetailmodel
  const handleMoreInfoClick = (task) => {
    const child = childProfileData.find((child) => child.id === task.childId);
    if (child) {
      setChildName(child.name);
    } else {
      setChildName(null); // Reset childName if no child is found
    }
    setTaskDetailsToShow(task);
  };
  const handleCloseTaskDetails = () => {
    setTaskDetailsToShow(null);
  };
  return (
    <div className="ml-6 mr-6 overflow-x-scroll">
      <div className="max-h-96">
        <h2 className="text-md mb-3 ml-3 mt-3 font-bold">Assigned Tasks</h2>
        <div className="mb-5 max-h-96 overflow-y-auto">
          {tasksData.filter((task) => task).length === 0 ? (
            <div className="items-center justify-center">
              <p className="text-center text-sm">No task is assigned yet</p>
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            </div>
          ) : (
            tasksData.map((task) => (
              <div
                key={task.id}
                href=""
                className="mb-2 flex items-center rounded-md border  p-3 text-sm hover:bg-blue-gray-50"
              >
                <div className="flex">
                  <img className="mt-0.5 h-6 w-6 " src="/img/task.png" alt="" />
                  <div className="ml-3">
                    <span className="font-medium text-black">
                      {task.taskname}
                    </span>
                    <br></br>
                    <span className="mt-2 text-black">
                      Submission date: {task.taskdate}
                    </span>
                    <span className="text-black"></span>
                    <div className="mt-1.5 flex">
                      <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />

                      <span className="ml-1 mt-0.5 text-xs text-black ">
                        Reward: {task.rewardname}
                      </span>
                    </div>
                    <div className="mt-1.5 flex">
                      {childProfileData.map(
                        (child) =>
                          child.id === task.childId && (
                            <>
                              <img
                                className="mt-0.5 h-5 w-5 rounded-full object-cover"
                                src={
                                  child.img
                                    ? `data:image/jpeg;base64,${child.img}`
                                    : "/img/userc.png"
                                }
                                alt=""
                              />
                              <span className="ml-1 mt-1 text-xs text-black ">
                                {child.name}
                              </span>
                            </>
                          )
                      )}
                    </div>
                    <div className="mr-28 mt-2 rounded-full bg-[#f2d3ff]">
                      <p className="pl-3 pr-3 text-sm text-black">
                        {task.taskTypeIs}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex items-end  hover:border-MyPurple-400">
                  <button
                    onClick={() => handleMoreInfoClick(task)}
                    className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                  >
                    more info
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <h2 className="text-md mb-3 ml-3 mt-3 font-bold">Completed Tasks</h2>
        <div className="max-h-96 overflow-y-auto">
          {tasksData.filter((task) => task.status === "Completed").length ===
          0 ? (
            <div className="items-center justify-center">
              <p className="text-center text-sm">No task is completed yet</p>
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            </div>
          ) : (
            tasksData
              .filter((task) => task.status === "Completed")
              .map((task) => (
                <div
                  key={task.id}
                  href=""
                  className="mb-2 flex items-center rounded-md border p-3 text-sm hover:bg-blue-gray-50"
                >
                  <div className="flex">
                    <img
                      className="mt-0.5 h-6 w-6 "
                      src="/img/task.png"
                      alt=""
                    />
                    <div className="ml-3">
                      <span className="font-medium text-black">
                        {task.taskname}
                      </span>
                      <br></br>
                      <span className="mt-2 text-black">
                        Submission date: {task.taskdate}
                      </span>
                      <span className="text-black"></span>
                      <div className="mt-1.5 flex">
                        <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />

                        <span className="ml-1 mt-0.5 text-xs text-black ">
                          Reward: {task.rewardname}
                        </span>
                      </div>
                      <div className="mt-1.5 flex">
                        {childProfileData.map(
                          (child) =>
                            child.id === task.childId && (
                              <>
                                <img
                                  className="mt-0.5 h-5 w-5 rounded-full object-cover"
                                  src={
                                    child.img
                                      ? `data:image/jpeg;base64,${child.img}`
                                      : "/img/userc.png"
                                  }
                                  alt=""
                                />
                                <span className="ml-1 mt-1 text-xs text-black ">
                                  {child.name}
                                </span>
                              </>
                            )
                        )}
                      </div>
                      <div className="mr-28 mt-2 rounded-full bg-[#f2d3ff]">
                        <p className="pl-3 pr-3 text-sm text-black">
                          {task.taskTypeIs}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-end  hover:border-MyPurple-400">
                    <button
                      onClick={() => handleMoreInfoClick(task)}
                      className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                    >
                      more info
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
        <h2 className="text-md mb-3 ml-3 mt-3 font-bold">Pending Tasks</h2>
        <div className="mb-5 max-h-96 overflow-y-auto">
          {tasksData.filter((task) => task.status === "Todo").length === 0 ? (
            <div className="items-center justify-center">
              <p className="text-center text-sm">No task is pending</p>
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            </div>
          ) : (
            tasksData
              .filter((task) => task.status === "Todo")
              .map((task) => (
                <div
                  key={task.id}
                  href=""
                  className="mb-2 flex items-center rounded-md border  p-3 text-sm hover:bg-blue-gray-50"
                >
                  <div className="flex">
                    <img
                      className="mt-0.5 h-6 w-6 "
                      src="/img/task.png"
                      alt=""
                    />
                    <div className="ml-3">
                      <span className="font-medium text-black">
                        {task.taskname}
                      </span>
                      <br></br>
                      <span className="mt-2 text-black">
                        Submission date: {task.taskdate}
                      </span>
                      <span className="text-black"></span>
                      <div className="mt-1.5 flex">
                        <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />

                        <span className="ml-1 mt-0.5 text-xs text-black ">
                          Reward: {task.rewardname}
                        </span>
                      </div>
                      <div className="mt-1.5 flex">
                        {childProfileData.map(
                          (child) =>
                            child.id === task.childId && (
                              <>
                                <img
                                  className="mt-0.5 h-5 w-5 rounded-full object-cover"
                                  src={
                                    child.img
                                      ? `data:image/jpeg;base64,${child.img}`
                                      : "/img/userc.png"
                                  }
                                  alt=""
                                />
                                <span className="ml-1 mt-1 text-xs text-black">
                                  {child.name}
                                </span>
                              </>
                            )
                        )}
                      </div>
                      <div className="mr-28 mt-2 rounded-full bg-[#f2d3ff]">
                        <p className="pl-3 pr-3 text-sm text-black">
                          {task.taskTypeIs}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-end  hover:border-MyPurple-400">
                    <button
                      onClick={() => handleMoreInfoClick(task)}
                      className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                    >
                      more info
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>

        {taskDetailsToShow && (
          <TaskDetailsModal
            childData={childName}
            selectedTaskDetails={taskDetailsToShow}
            handleCloseTaskDetails={handleCloseTaskDetails}
            // handleSubmitTask={/* Pass your handleSubmitTask function here */}
          />
        )}
      </div>
    </div>
  );
}
