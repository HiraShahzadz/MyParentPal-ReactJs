import React, { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/solid";

import { tasksData } from "../data/tasksData";

import bgImage from "/img/bgcover.jpeg";
import AboutSection from "./AboutSection";
import Feedback from "./Feedback";
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
              <div className="mb-1 mt-6  w-full items-center justify-between pl-3 pr-10">
                <div className="text-center text-lg font-bold text-black">
                  About
                </div>
                <div>
                  <AboutSection />
                </div>
              </div>
            </div>

            {/* Right side div covering remaining space */}
            <div className="mb-5 ml-5 mr-5 mt-5  rounded-lg border border-gray-200 p-2 shadow-lg md:flex-1">
              <div className="mb-1 mt-6  w-full items-center justify-between pl-3 pr-10">
                <div className="text-center text-lg font-bold text-black">
                  Give Feedback
                </div>
                <div>
                  <Feedback />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
