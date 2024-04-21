import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import bgImage from "/img/bgcover.jpeg";
import AboutSection from "./AboutSection";
import Feedback from "./Feedback";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
export function ParentProfile() {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });

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
    // Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result, // Store Base64 string
      });
    };
    reader.readAsDataURL(selectedImage);
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
  const [parentProfile, setParentProfile] = useState([]);
  useEffect(() => {
    loadParentProfile();
  }, []);
  async function loadParentProfile() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/get-parent"
      );
      setParentProfile(result.data);
      console.log("Parent profile:", result.data);
    } catch (error) {
      console.error("Error loading parentProfile:", error);
    }
  }
  const myProfile = parentProfile.find((profile) => profile);

  async function update(event) {
    event.preventDefault();
    try {
      const base64Image = formData.image.split(",")[1];
      await axios.put(
        "http://localhost:8081/api/v1/user/editParent/" + myProfile.id,
        {
          id: myProfile.id,
          email: myProfile.email,
          password: myProfile.password,
          firstName: myProfile.firstName,
          lastName: myProfile.lastName,
          phoneNo: myProfile.phoneNo,
          cnic: myProfile.cnic,
          img: base64Image,
        }
      );
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }
      toast.error("Failed to save in information");
    }
  }
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>
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
              <div className=" absolute -right-2 bottom-8 z-10 flex rounded-md border border-gray-300 bg-white p-1 pl-1 pr-3 text-sm font-medium text-black shadow-sm">
                <PencilIcon class="text-inheri h-5 w-5 pr-1" />
                <span>Edit</span>
              </div>
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
                  <>
                    {parentProfile.map(
                      (profile) =>
                        profile.role === "parent" && (
                          <>
                            <div className="relative flex items-center justify-center">
                              <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 bg-gray-100">
                                <img
                                  src={
                                    profile.img
                                      ? `data:image/jpeg;base64,${profile.img}`
                                      : "/img/user.png"
                                  }
                                  className="h-full w-full rounded-full object-cover"
                                />
                              </div>
                            </div>
                          </>
                        )
                    )}
                  </>
                )}
              </div>
            </label>
          </div>

          <div className="mb-4 mt-10 flex flex-col rounded-lg bg-white md:flex-row">
            {/* Left side div */}

            <div className="mb-5 ml-5 mr-5 mt-5 rounded-lg border border-gray-200 p-3 shadow-lg md:w-1/4">
              {parentProfile.map(
                (profile) =>
                  profile.role === "parent" && (
                    <div className="mb-1 mt-6  w-full items-center justify-between pl-3 pr-10">
                      <div className="text-center text-lg font-bold text-black">
                        About
                      </div>
                      <div>
                        <AboutSection profile={profile} updatePhoto={update} />
                      </div>
                    </div>
                  )
              )}
            </div>

            {/* Right side div covering remaining space */}
            <div className="mb-5 ml-5 mr-5 mt-5  rounded-lg border border-gray-200 p-2 shadow-lg md:flex-1">
              <div className="mb-1 mt-6  w-full items-center justify-between pl-3 pr-10">
                <div className="text-center text-lg font-bold text-black">
                  Give Feedback
                </div>
                <div>
                  <Feedback myProfile={myProfile} />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
