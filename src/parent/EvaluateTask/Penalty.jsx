import React, { useState } from "react";
import MonitorTask from "../dragDrop/TaskCreationForum/MonitorTask";
import CalenderInput from "../attributes/CalenderInput";
import TaskTime from "../attributes/TaskTime";
import CheatTags from "./CheatTags";
import RegulateAccess from "../dragDrop/TaskCreationForum/RegulateAccess";
function Penalty(props) {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
    props.setStatus(event.target.value);
  };

  return (
    <div className="space-y-10 ">
      <fieldset>
        <legend className="flex text-sm font-semibold leading-6 text-gray-900">
          Penalty Task / Give reward
        </legend>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          In case of cheating add cheat tags and give panelty task else give
          reward
        </p>
        <div className="mt-5 flex gap-x-20 ">
          <div className="flex items-center gap-x-3">
            <input
              id="Reviewed"
              name="Reviewed"
              type="radio"
              className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
              value="Reviewed"
              onChange={handleChange}
              checked={selectedOption === "Reviewed"}
              required
            />
            <label
              htmlFor="push-everything"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Penalty Task
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              id="Reward"
              name="Reward"
              type="radio"
              className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
              value="Rewarded"
              onChange={handleChange}
              checked={selectedOption === "Rewarded"}
              required
            />
            <label
              htmlFor="push-email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Give Rewards
            </label>
          </div>
        </div>

        {selectedOption === "Reviewed" && (
          <>
            <div className="mt-3">
              <CheatTags
                cheatTags={props.cheatTags}
                setCheatTags={props.setCheatTags}
              />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-4">
              <div className="sm:col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Task
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                    <input
                      type="text"
                      name="taskname"
                      id="taskname"
                      value={props.taskname}
                      onChange={(event) => {
                        props.setTaskname(event.target.value);
                      }}
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
                <div className="mt-2">
                  <textarea
                    type="text"
                    id="taskdescription"
                    name="taskdescription"
                    value={props.taskdescription}
                    rows={3}
                    onChange={(event) => {
                      props.setTaskdescription(event.target.value);
                    }}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder="Write a few sentences about task."
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <MonitorTask
                taskfiletype={props.taskfiletype}
                setTaskfiletype={props.setTaskfiletype}
              />
            </div>
            <div>
              <RegulateAccess />
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
                  taskdate={props.taskdate}
                  setTaskdate={props.setTaskdate}
                />
              </div>
              <div className="ml-10 mt-3">
                <label
                  htmlFor="about"
                  className=" block text-sm font-medium leading-6 text-gray-900"
                >
                  Submission Time
                </label>
                <TaskTime
                  tasktime={props.tasktime}
                  setTasktime={props.setTasktime}
                  taskdate={props.taskdate}
                />
              </div>
            </div>
          </>
        )}
        <div className="col-span-full">
          <label
            htmlFor="about"
            className="mt-3 block text-sm font-medium leading-6 text-gray-900"
          >
            Add Your remarks
          </label>
          <div className="mt-2">
            <textarea
              type="text"
              id="remarks"
              name="remarks"
              value={props.taskRemarks}
              rows={3}
              onChange={(event) => {
                props.setTaskRemarks(event.target.value);
              }}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
              placeholder="Write a few sentences explaining why a task is being penalized or rewarded.."
              required
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}

export default Penalty;
