import { Button } from "@material-tailwind/react";
import React from "react";

function Feedback() {
  return (
    <div>
      <div className="ml-2 pb-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
          <div className="sm:col-span-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                <input
                  type="text"
                  name="task"
                  id="task"
                  autoComplete="task"
                  className="ml-1 block w-full flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter your name"
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
                id="about"
                name="about"
                rows={5}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                placeholder="Write a few sentences about our website."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Button className="mt-2 rounded-md bg-MyPurple-400 px-7 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Feedback;
