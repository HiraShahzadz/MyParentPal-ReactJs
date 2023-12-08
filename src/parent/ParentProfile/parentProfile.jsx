import React, { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/solid";

import { tasksData } from "../data/tasksData";

import bgImage from "/img/bgcover.jpeg";
import AboutSection from "./AboutSection";
export function ParentProfile() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    dob: "",
    name: "",
  });
  const [hiddenImages, setHiddenImages] = useState([]);

  const handleImageClick = (index) => {
    // Set the index of the clicked image to the hiddenImages state
    setHiddenImages([...hiddenImages, index]);
  };
  function DiscardChangesModal({ show, setShow }) {
    // Function to handle confirmation of discarding changes
    const handleDiscardChanges = (confirmDiscard) => {
      if (confirmDiscard) {
        // Handle discarding changes here
        console.log("Changes discarded");
      }
      setShow(false); // Close the modal
    };

    return (
      <div
        className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50 ${
          show ? "" : "hidden"
        }`}
      >
        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
          <p className="mb-4 text-gray-800">
            Are you sure you want to discard changes?
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => handleDiscardChanges(false)}
              className="mr-4 text-gray-500 hover:text-gray-700"
            >
              No
            </button>
            <button
              onClick={() => handleDiscardChanges(true)}
              className="rounded-lg bg-purple-400 px-4 py-2 text-white hover:bg-purple-500"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Include logic to handle form submission with selectedParent data
    // This might involve sending a request to the backend or triggering notifications

    console.log("Form Data:", formData);
    console.log("Image File:", image);
  };
  document.addEventListener("DOMContentLoaded", function () {
    const discardButton = document.querySelector(
      '[data-modal-toggle="popup-modal"]'
    );
    const modal = document.getElementById("popup-modal");
    const closeModalButton = modal.querySelector(
      '[data-modal-hide="popup-modal"]'
    );

    discardButton.addEventListener("click", function () {
      modal.classList.toggle("hidden");
    });

    closeModalButton.addEventListener("click", function () {
      modal.classList.add("hidden");
    });
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className="relative mt-3 h-72 w-full overflow-hidden rounded-xl"
        style={{
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="h-30 absolute inset-0 w-full " />
      </div>
      <Card className="mx-3 -mt-[150px] mb-6 lg:mx-4">
        <CardBody className="p-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <label
              htmlFor="image-upload"
              className="absolute left-0 ml-10 cursor-pointer"
            >
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="relative mb-5 ml-10 mt-[-70px] flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 bg-gray-100">
                {image ? (
                  <div className="h-full w-full">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Selected"
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <CameraIcon className="h-10 w-10 text-gray-400" />
                )}
              </div>
            </label>
          </div>

          <div className="mb-4 mt-10 flex flex-col rounded-lg bg-white md:flex-row">
            {/* Left side div */}
            <div className="mb-5 ml-5 mr-5 mt-5 rounded-lg border border-gray-200 p-3 shadow-lg md:w-1/4">
              <AboutSection />
            </div>

            {/* Right side div covering remaining space */}
            <div className="mb-5 ml-5 mr-5 mt-2  rounded-lg border border-gray-200 p-2 shadow-lg md:flex-1">
              <div className="mb-1 mt-6 flex w-full items-center justify-between pl-3 pr-10">
                <div className="text-left text-lg font-bold text-black">
                  Task Summary
                </div>
                <div className="text-right">
                  <a
                    href="child/pages/dashboard/home"
                    className="text-blue-500 hover:underline"
                  >
                    View All
                  </a>
                </div>
              </div>
              <h2 className="text-md mb-3 ml-3 mt-5 font-bold">
                Assigned Tasks
              </h2>
              <div className="max-h-96 overflow-y-auto">
                {tasksData.map(
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
                      className="mb-2 flex items-center rounded-md border p-1 text-sm hover:bg-blue-gray-50"
                    >
                      <div className="flex">
                        <img
                          className="mt-2 h-6 w-6 "
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
                            <img
                              className="h-3 w-3"
                              src="/img/coin.png"
                              alt=""
                            />
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
        </CardBody>
      </Card>
    </>
  );
}
