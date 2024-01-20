import React, { useState } from "react";
import MonitorTask from "../dragDrop/TaskCreationForum/MonitorTask";
import CalenderInput from "../attributes/CalenderInput";
import TaskTime from "../attributes/TaskTime";
import CheatTags from "./CheatTags";
import Time from "./Time";

function Panelty() {
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [selectedTime, setSelectedTime] = useState("");

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
  const [childtags, setChildtags] = useState([]);
  return (
    <div className="space-y-10 ">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="flex text-sm font-semibold leading-6 text-gray-900">
            Panelty Task
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            In case of cheating add cheat tags and give panelty task
          </p>
          <div className="mt-5 flex gap-x-20 ">
            <div className="flex items-center gap-x-3">
              <input
                id="push-everything"
                name="monitor-task"
                type="radio"
                className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                value="file-proof"
                onChange={handleChange}
                checked={selectedOption === "file-proof"}
                required
              />
              <label
                htmlFor="push-everything"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Panelty Task
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-email"
                name="monitor-task"
                type="radio"
                className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                value="monitor-physically"
                onChange={handleChange}
                checked={selectedOption === "monitor-physically"}
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

          {selectedOption === "file-proof" && (
            <>
              <div className="mt-3">
                <CheatTags childtags={childtags} setChildtags={setChildtags} />
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
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                      placeholder="Write a few sentences about task."
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <MonitorTask />
              </div>
              <div className="flex">
                <div className="mt-3">
                  <label
                    htmlFor="about"
                    className="mb-2 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Submission Date
                  </label>
                  <CalenderInput />
                </div>
                <div className="ml-10 mt-3">
                  <label
                    htmlFor="about"
                    className="mb-2 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Submission Time
                  </label>
                  <Time />
                </div>
              </div>
            </>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export default Panelty;
