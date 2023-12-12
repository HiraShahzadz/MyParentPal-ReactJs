import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import tasksData from "@/parent/data/tasksData";
export function SkillTasks() {
  return (
    <div className="ml-6 mr-6">
      <div className="mb-1 mt-6 flex w-full items-center justify-between pl-3 pr-10">
        <div className="text-left text-lg font-bold text-black">
          Task Summary
        </div>
        <div className="text-right">
          <a
            href="child/pages/dashboard/home"
            className="text-black hover:underline"
          >
            View All
          </a>
        </div>
      </div>
      <h2 className="text-md mb-3 ml-3 mt-5 font-bold">Assigned Tasks</h2>
      <div className="max-h-96">
        {tasksData.map(
          ({ id, title, image, description, points, details, rewardImage }) => (
            <div
              key={id}
              href=""
              className="mb-2 flex items-center rounded-md border p-3 text-sm hover:bg-blue-gray-50"
            >
              <div className="flex">
                <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                <div className="ml-3">
                  <span className="font-medium text-black">{title}</span>
                  <br></br>
                  <span className="mt-2 text-black">
                    Submission date: {description.toLocaleDateString()}
                  </span>
                  <span className="text-black"></span>
                  <div className="mt-1.5 flex">
                    <img className="h-3 w-3" src="/img/coin.png" alt="" />
                    <span className="ml-1 text-xs text-black ">
                      Reward: {points}
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
                    })
                  }
                  className="mb-2 mt-14 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
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
              }) => (
                <div
                  key={id}
                  href=""
                  className="mb-2 flex items-center rounded-md border p-3 text-sm hover:bg-blue-gray-50"
                >
                  <div className="flex">
                    <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                    <div className="ml-3">
                      <span className="font-medium text-black">{title}</span>
                      <br></br>
                      <span className="mt-2 text-black">
                        Submission date: {description.toLocaleDateString()}
                      </span>
                      <span className="text-black"></span>
                      <div className="mt-1.5 flex">
                        <img className="h-3 w-3" src="/img/coin.png" alt="" />
                        <span className="ml-1 text-xs text-black ">
                          Reward: {points}
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
                        })
                      }
                      className="mb-2 mt-14 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
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
              }) => (
                <div
                  key={id}
                  href=""
                  className="mb-2 flex items-center rounded-md border  p-3 text-sm hover:bg-blue-gray-50"
                >
                  <div className="flex">
                    <img className="mt-2 h-6 w-6 " src="/img/task.png" alt="" />
                    <div className="ml-3">
                      <span className="font-medium text-black">{title}</span>
                      <br></br>
                      <span className="mt-2 text-black">
                        Submission date: {description.toLocaleDateString()}
                      </span>
                      <span className="text-black"></span>
                      <div className="mt-1.5 flex">
                        <img className="h-3 w-3" src="/img/coin.png" alt="" />
                        <span className="ml-1 text-xs text-black ">
                          Reward: {points}
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
                        })
                      }
                      className="mb-2 mt-14 rounded-lg bg-[#b089be] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-400 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 sm:mb-0"
                    >
                      more info
                    </button>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
