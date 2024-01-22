import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import FileUploader from "./FileUploader";
import Panelty from "./Panelty";
import Assignee from "../attributes/Assignee";
import TaskStatus from "../attributes/TaskStatus";
import Tags from "../Report/Tags";

function PaneltyTask(props) {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    dob: "",
    name: "",
  });

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  const [taskdate, setTaskdate] = useState("");
  const [tasktime, setTasktime] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!taskdate || !tasktime) {
      toast.error("Please fill in all required fields");
      return;
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
    // Include logic to handle form submission with formData and image
    // This might involve sending a request to the backend or triggering notifications

    console.log("Form Data:", formData);
    console.log("Image File:", image);

    toast.success("Task evaluadted");
    props.onClose(false);
  };
  const handledecline = (event) => {
    event.preventDefault();
    props.onClose(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-20">
      <div className="rounded-lg bg-white p-3 shadow-lg md:w-9/12 lg:w-9/12">
        <div class="pt-22 relative flex items-center justify-end">
          <XMarkIcon
            className="h-7 w-7 hover:bg-gray-300"
            onClick={() => props.onClose(false)}
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
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Room Cleaning
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
                      className="block text-gray-900 dark:text-white"
                    >
                      Keep your room neat and organized by putting away toys,
                      clothes, and books in their designated places ........
                    </label>
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
              </div>
              <div>
                <FileUploader />
              </div>
              <div className="rounded-lg border border-gray-400 bg-gray-100 p-2">
                <Panelty
                  taskdate={taskdate}
                  setTaskdate={setTaskdate}
                  tasktime={tasktime}
                  setTasktime={setTasktime}
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
                <div className="mb-10">
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

                <div className="mt-10">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Tags
                  </label>
                </div>
                <div className="mt-10">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-7">
                  <Assignee />
                </div>

                <div className=" mb-7">
                  <TaskStatus />
                </div>

                <div>
                  <Tags />
                </div>

                <div className=" space-y-10">
                  <fieldset>
                    <div className="mt-9 flex items-center gap-x-3">
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        One Time
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" ml-64 mt-2 flex justify-start">
          <button
            type="submit"
            onClick={handleSubmit}
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
