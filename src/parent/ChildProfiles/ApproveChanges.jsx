import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import axios from "axios"; // Import axios for making HTTP requests

function ApproveChanges({ childData, onClose, profileRequest }) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); // State to hold the selected profile
  const [ProfileStatus, setProfileStatus] = useState();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = () => {
    setProfileStatus("Reject");
  };

  const handleAccept = () => {
    if (selectedProfile) {
      setProfileStatus("Accept");
    }
  };

  useEffect(() => {
    // Find the profile matching the childData id
    const matchedProfile = profileRequest.find(
      (profile) =>
        profile.childId === childData.id && profile.status === "Pending"
    );
    setSelectedProfile(matchedProfile); // Set the matched profile to state
  }, [childData, profileRequest]);

  useEffect(() => {
    if (ProfileStatus) {
      // Call the update functions only when ProfileStatus is set
      update(selectedProfile);
      updateProfileStatus();
    }
  }, [ProfileStatus]);

  async function update(profile) {
    try {
      await axios.put(
        `http://localhost:8081/api/v1/user/editChild/${profile.childId}`,
        {
          // Use the profile details for the request
          email: profile.email,
          password: profile.password,
          name: profile.name,
          dob: profile.dob,
          tags: childData.tags,
          gender: childData.gender,
          image: profile.image,
          img: profile.img,
        }
      );
      toast.success("Profile updated successfully"); // Notify success
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }
      toast.error("Failed to save information");
    }
  }

  async function updateProfileStatus() {
    try {
      await axios.put(
        `http://localhost:8081/api/v1/profile/edit-profile-req/${selectedProfile.id}`,
        {
          status: ProfileStatus,
        }
      );

      // If the update is successful, display a success message
      toast.success("Profile status updated");
      // Reload the page
      window.location.reload();
    } catch (error) {
      // If the update fails, display an error message
      toast.error("Failed to update profile details");
      console.error("Error updating profile details:", error);
    }
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-gray-900 bg-opacity-20">
      <div className="w-full rounded-lg bg-white p-3 shadow-lg  md:w-9/12 lg:w-6/12">
        <div className="pt-22 relative flex items-center justify-end">
          <XMarkIcon
            className="h-7 w-7 hover:bg-gray-300"
            onClick={() => onClose(false)}
          />
        </div>

        <div className=" relative flex flex-col overflow-hidden overflow-y-auto rounded-xl bg-white bg-clip-border text-gray-700  xl:col-span-2">
          <form className="m-2 ">
            <DndProvider backend={HTML5Backend}>
              <Toaster />
            </DndProvider>

            <div className="pb-6">
              {selectedProfile && ( // Render only if selectedProfile is not null
                <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                  {/* Render profile details */}
                  <div className="flex justify-center sm:col-span-full">
                    <label
                      htmlFor="username"
                      className="mb-2 text-xl font-bold leading-6 text-MyPurple-400"
                    >
                      Profile Changes Request
                    </label>
                  </div>
                  <div className="col-span-1 flex justify-center sm:col-span-6">
                    <div className="h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 bg-gray-100">
                      <img
                        src={
                          selectedProfile.img
                            ? `data:image/jpeg;base64,${selectedProfile.img}`
                            : "/img/user.png"
                        }
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Child Name
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedProfile.name}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Date of Birth
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedProfile.dob}
                    </label>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      User Name
                    </label>
                    <label
                      htmlFor="name"
                      className="block rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:text-white"
                    >
                      {selectedProfile.email}
                    </label>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="flex items-center">
                      <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          className="block w-full rounded-md border-0 bg-gray-100 py-2 pl-2 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                          value={selectedProfile.password} // Use selectedProfile password value
                          readOnly
                        />
                      </div>
                      <div
                        className="bottom-30 absolute right-6 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5 text-black"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5 text-black"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="mt-2 flex justify-center ">
              <button
                type="button" // Change to button to prevent form submission
                onClick={handleAccept}
                className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
              >
                Accept
              </button>
              <button
                type="button" // Change to button to prevent form submission
                onClick={handleClose}
                className="mr-2 rounded-md bg-gray-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white"
              >
                Decline
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ApproveChanges;
