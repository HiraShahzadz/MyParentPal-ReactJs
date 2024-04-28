import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody } from "@material-tailwind/react";
import { GiftIcon } from "@heroicons/react/24/solid";

import PenaltyTask from "./PenaltyTask";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tags from "../Report/Tags";
import ChildSelection from "../Report/ChildSelection";

export function TaskEvaluate() {
  const [childProfileData, setChildProfileData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

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

  // Filter tasks based on child IDs
  const filteredTasks = tasksData.filter(
    (task) =>
      childProfileData.some((child) => child.id === task.childId) &&
      (selectedChildId ? task.childId === selectedChildId : true)
  );

  const filterTasksByChild = (childId) => {
    setSelectedChildId(childId);
  };

  const handleEvaluateTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  return (
    <div className="mb-4 mt-9 flex flex-col gap-12">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>
      <Card>
        <div className="mb-2 ml-6 mr-6 ">
          <div className="mb-1 mt-6 flex w-full items-center justify-between  pr-10">
            <div className="text-left text-lg font-bold text-black">
              Evaluate Task
            </div>
          </div>
          <div className="mt-4 flex">
            <Tags />
            <div className="ml-3">
              <ChildSelection
                childProfileData={childProfileData}
                setChildProfileData={setChildProfileData}
                filterTasks={filterTasksByChild}
              />
            </div>
          </div>
        </div>
        <CardBody className="overflow-x-scroll px-0 pb-3 pt-0">
          <div className="mb-12 pb-2.5">
            <div className="ml-6 mr-6">
              <h2 className="text-md mb-3 ml-3 mt-5 font-bold">
                Completed Tasks
              </h2>
              <div className="max-h-96">
                {filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
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
                                <img
                                  className="mt-0.5 h-5 w-5 rounded-full object-cover"
                                  src={
                                    child.img
                                      ? `data:image/jpeg;base64,${child.img}`
                                      : "/img/userc.png"
                                  }
                                  alt=""
                                />
                              )
                          )}
                          <span className="ml-1 mt-1 text-xs text-black ">
                            {task.taskassignee}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-auto flex items-end  hover:border-MyPurple-400">
                      <button
                        onClick={() => handleEvaluateTask(task)}
                        className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                      >
                        Evaluate now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
      {showModal && (
        <PenaltyTask
          onClose={setShowModal}
          task={selectedTask}
          childProfileData={childProfileData}
        />
      )}
    </div>
  );
}
