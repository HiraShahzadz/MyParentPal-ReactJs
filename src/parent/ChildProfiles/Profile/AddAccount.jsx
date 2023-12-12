import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import MilstoneTags from "./MilstoneTags";

function AddAccount(props) {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Include logic to handle form submission with formData and image
    // This might involve sending a request to the backend or triggering notifications

    console.log("Form Data:", formData);
    console.log("Image File:", image);
    toast.success("Information saved");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="rounded-lg bg-white p-6 shadow-lg md:w-9/12 lg:w-6/12">
        <div className="flex items-end justify-end">
          <XMarkIcon
            className="h-7 w-7 hover:bg-gray-300"
            onClick={() => props.onClose(false)}
          />
        </div>
        <form onSubmit={handleSubmit} className="">
          <DndProvider backend={HTML5Backend}>
            <Toaster />
          </DndProvider>
          <div className="flex flex-col items-center justify-center ">
            <label htmlFor="image-upload" className="cursor-pointer">
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="relative mb-5 flex  h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 bg-gray-100">
                {image ? (
                  <div className="h-full w-full">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <CameraIcon className="h-12 w-12 text-gray-400" />
                )}
              </div>
            </label>
          </div>

          <div className="mt-2 flex flex-wrap">
            <div className="mb-3 w-full pl-3 pr-10 sm:w-1/2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>

            <div className="mb-3 w-full pl-3 pr-10 sm:w-1/2">
              <label
                htmlFor="dob"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="mb-3 w-full pl-3  pr-10 sm:w-1/2">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="username@gmail.com"
                  required
                />
              </div>
            </div>
            <div className="mb-3 w-full pl-3 pr-10 sm:w-1/2">
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="mb-3 w-full pl-3 pr-10 sm:w-1/2">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="react-datepicker-ignore-onclickoutside block w-full rounded-md border-0 py-1.5 pl-2 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            <div className="mb-6 w-full pl-3 pr-10 sm:w-1/2">
              <label
                htmlFor="gender"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    className="mr-2 h-4 w-4 border-gray-300 text-MyPurple-600 focus:ring-MyPurple-400"
                  />
                  <label
                    htmlFor="male"
                    className="mt-1 text-gray-900 dark:text-white"
                    onClick="changeRadioColor()"
                  >
                    Male
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    className="mr-2 h-4 w-4 border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
                  />
                  <label
                    htmlFor="female"
                    className="mt-1 text-gray-900 dark:text-white"
                    onClick="changeRadioColor()"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="item-center flex justify-center">
            <MilstoneTags />
          </div>
          <div className="mt-4 flex justify-center">
            <Button
              type="submit"
              className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
            >
              Save
            </Button>
            <Button
              onClick={() => props.onClose(false)}
              className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAccount;
