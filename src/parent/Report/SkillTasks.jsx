import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { GiftIcon } from "@heroicons/react/24/solid";
import tasksData from "@/parent/data/tasksData";
import TaskDetailsModal from "../ChildProfiles/Profile/TaskDetailsModal";
export function SkillTasks() {
  const [taskDetailsToShow, setTaskDetailsToShow] = useState(null); //taskdetailmodel
  const handleMoreInfoClick = (task) => {
    setTaskDetailsToShow(task);
  };
  const handleCloseTaskDetails = () => {
    setTaskDetailsToShow(null);
  };

  return (
    <div className="ml-6 mr-6">
      <div className="mb-1 mt-3 flex w-full items-center justify-between pl-3 pr-10">
        <div className="text-left text-lg font-bold text-black">
          Task Summary
        </div>
      </div>
      <h2 className="text-md mb-3 ml-3 mt-3 font-bold">Assigned Tasks</h2>
      <div className="max-h-96">
        {tasksData.map(
          ({
            id,
            title,
            image,
            description,
            points,
            details,
            rewardImage,
            name,
          }) => (
            <div
              key={id}
              href=""
              className="mb-2 items-center rounded-md border p-3 text-sm hover:bg-blue-gray-50 sm:flex"
            >
              <div className="flex">
                <img className="mt-0.5 h-6 w-6 " src="/img/task.png" alt="" />
                <div className="ml-3">
                  <span className="font-medium text-black">{title}</span>
                  <br></br>
                  <span className="mt-2 text-black">
                    Submission date: {description.toLocaleDateString()}
                  </span>
                  <span className="text-black"></span>
                  <div className="mt-1.5 flex">
                    <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />

                    <span className="ml-1 mt-0.5 text-xs text-black ">
                      Reward: {points}
                    </span>
                  </div>
                  <div className="mt-1.5 flex">
                    <img
                      className="mt-0.5 h-5 w-5 rounded-s-full "
                      src="/img/user.png"
                      alt=""
                    />
                    <span className="ml-1 mt-1 text-xs text-black ">
                      {name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="ml-auto flex items-end  hover:border-MyPurple-400">
                <button
                  onClick={() =>
                    handleMoreInfoClick({
                      id,
                      title,
                      image,
                      description: description.toLocaleDateString(),
                      points,
                      details,
                      rewardImage,
                      name,
                    })
                  }
                  className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                >
                  more info
                </button>
              </div>
            </div>
          )
        )}
        <h2 className="text-md mb-3 ml-3 mt-3 font-bold">Completed Tasks</h2>
        <div className="max-h-96 ">
          <p className="text-center text-sm">
            Content for Completed Task goes here
          </p>
          <div className="flex items-center justify-center">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          {tasksData
            .filter((task) => task.status === "completed")
            .map(
              ({
                id,
                title,
                image,
                description,
                points,
                details,
                rewardImage,
                name,
              }) => (
                <div
                  key={id}
                  href=""
                  className="mb-2 items-center rounded-md border p-3 text-sm hover:bg-blue-gray-50 sm:flex"
                >
                  <div className="flex">
                    <img
                      className="mt-0.5 h-6 w-6 "
                      src="/img/task.png"
                      alt=""
                    />
                    <div className="ml-3">
                      <span className="font-medium text-black">{title}</span>
                      <br></br>
                      <span className="mt-2 text-black">
                        Submission date: {description.toLocaleDateString()}
                      </span>
                      <span className="text-black"></span>
                      <div className="mt-1.5 flex">
                        <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />

                        <span className="ml-1 mt-0.5 text-xs text-black ">
                          Reward: {points}
                        </span>
                      </div>
                      <div className="mt-1.5 flex">
                        <img
                          className="mt-0.5 h-5 w-5 rounded-s-full "
                          src="/img/user.png"
                          alt=""
                        />
                        <span className="ml-1 mt-1 text-xs text-black ">
                          {name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-end  hover:border-MyPurple-400">
                    <button
                      onClick={() =>
                        handleMoreInfoClick({
                          id,
                          title,
                          image,
                          description: description.toLocaleDateString(),
                          points,
                          details,
                          rewardImage,
                          name,
                        })
                      }
                      className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                    >
                      more info
                    </button>
                  </div>
                </div>
              )
            )}
        </div>

        <h2 className="text-md mb-3 ml-3 mt-3 font-bold">Pending Tasks</h2>
        <div className="mb-5 max-h-96">
          <p className="text-center text-sm">
            Content for pending Task goes here
          </p>
          <div className="mb-3 flex items-center justify-center">
            <FontAwesomeIcon icon={faExclamationCircle} />
          </div>
          {tasksData
            .filter((task) => task.status === "pending")
            .map(
              ({
                id,
                title,
                image,
                description,
                points,
                details,
                rewardImage,
                name,
              }) => (
                <div
                  key={id}
                  href=""
                  className="mb-2 items-center rounded-md border p-3  text-sm hover:bg-blue-gray-50 sm:flex"
                >
                  <div className="flex">
                    <img
                      className="mt-0.5 h-6 w-6 "
                      src="/img/task.png"
                      alt=""
                    />
                    <div className="ml-3">
                      <span className="font-medium text-black">{title}</span>
                      <br></br>
                      <span className="mt-2 text-black">
                        Submission date: {description.toLocaleDateString()}
                      </span>
                      <span className="text-black"></span>
                      <div className="mt-1.5 flex">
                        <GiftIcon className="h-4 w-4 rounded-sm text-MyPurple-400 " />

                        <span className="ml-1 mt-0.5 text-xs text-black ">
                          Reward: {points}
                        </span>
                      </div>
                      <div className="mt-1.5 flex">
                        <img
                          className="mt-0.5 h-5 w-5 rounded-s-full "
                          src="/img/user.png"
                          alt=""
                        />
                        <span className="ml-1 mt-1 text-xs text-black ">
                          {name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-auto flex items-end  hover:border-MyPurple-400">
                    <button
                      onClick={() =>
                        handleMoreInfoClick({
                          id,
                          title,
                          image,
                          description: description.toLocaleDateString(),
                          points,
                          details,
                          rewardImage,
                          name,
                        })
                      }
                      className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                    >
                      more info
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
        {taskDetailsToShow && (
          <TaskDetailsModal
            selectedTaskDetails={taskDetailsToShow}
            handleCloseTaskDetails={handleCloseTaskDetails}
            // handleSubmitTask={/* Pass your handleSubmitTask function here */}
          />
        )}
      </div>
    </div>
  );
}
