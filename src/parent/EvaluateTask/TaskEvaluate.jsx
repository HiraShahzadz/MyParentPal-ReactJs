import React, { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { GiftIcon } from "@heroicons/react/24/solid";
import tasksData from "@/parent/data/tasksData";
import PaneltyTask from "./PaneltyTask";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tags from "../Report/Tags";
import ChildSelection from "../Report/ChildSelection";
export function TaskEvaluate() {
  const [showModal, setShowModal] = useState(false);
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
              <ChildSelection />
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
                        <img
                          className="mt-0.5 h-6 w-6 "
                          src="/img/task.png"
                          alt=""
                        />
                        <div className="ml-3">
                          <span className="font-medium text-black">
                            {title}
                          </span>
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
                          onClick={() => setShowModal(true)}
                          className=" mb-2 ml-8 mt-3 select-none rounded-lg border border-MyPurple-400 bg-white px-3 py-2 text-center align-middle font-sans text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent transition-all hover:bg-MyPurple-400 hover:text-white hover:shadow-lg hover:shadow-white focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none md:rounded-md"
                        >
                          Evaluate now
                        </button>
                      </div>
                      {showModal && <PaneltyTask onClose={setShowModal} />}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
