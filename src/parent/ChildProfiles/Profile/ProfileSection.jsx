import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarAlt,
  faVenusMars,
  faEnvelope,
  faLock,
  faLockOpen,
} from "@fortawesome/free-solid-svg-icons";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import DobInput from "@/parent/attributes/DobInput";

function ProfileSection() {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleNameFocus = () => {
    setIsNameFocused(true);
  };

  const handleNameBlur = () => {
    setIsNameFocused(false);
  };

  const handleUsernameFocus = () => {
    setIsUsernameFocused(true);
  };

  const handleUsernameBlur = () => {
    setIsUsernameFocused(false);
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate Date of Birth
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > currentDate) {
      toast.error("Date of birth cannot be in the future");
      return;
    }

    // Validate Password
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(.{8,})$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should be at least 8 characters long, contain at least one uppercase letter, and one special character"
      );
      return;
    }

    // If both validations pass, proceed
    toast.success("Profile updated");
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="">
          <DndProvider backend={HTML5Backend}>
            <Toaster />
          </DndProvider>
          <div className="ml-2 mt-4 pb-2">
            <div className="text-center text-lg font-bold text-black">
              About
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-6 flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="ml-2 mr-2 text-black"
                  />
                  <input
                    type="text"
                    name="task"
                    id="task"
                    pattern="[A-Za-z ]+"
                    title="Please enter only letters"
                    autoComplete="task"
                    onFocus={handleNameFocus}
                    onBlur={handleNameBlur}
                    className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md  border-0 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder={isNameFocused ? "" : "Name"}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="ml-2 mr-2 text-black"
                  />
                  <DobInput dob={dob} setDob={setDob} />
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-3 flex flex-wrap items-center gap-x-3">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    className="ml-2 mr-2 mt-1 text-black"
                  />
                  <div className="flex flex-wrap">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="Male"
                        name="type"
                        type="radio"
                        value="Male"
                        className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                        required
                      />
                      <label
                        htmlFor="push-everything"
                        className="mr-2 block text-sm font-medium leading-6 text-gray-900"
                      >
                        Male
                      </label>
                    </div>
                    <div className=" flex items-center gap-x-3 ">
                      <input
                        id="Female"
                        name="type"
                        type="radio"
                        value="Female"
                        className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="ml-2 mr-2 text-black"
                  />
                  <input
                    type="username"
                    name="text"
                    id="task"
                    autoComplete="task"
                    onFocus={handleUsernameFocus}
                    onBlur={handleUsernameBlur}
                    className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md border-0  py-1.5 pl-3 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder={isUsernameFocused ? "" : "Username"}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-3 flex items-center">
                  {showPassword ? (
                    <FontAwesomeIcon
                      icon={faLockOpen}
                      onClick={togglePasswordVisibility}
                      className="ml-2 mr-2 text-black"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faLock}
                      onClick={togglePasswordVisibility}
                      className="ml-2 mr-2 text-black"
                    />
                  )}

                  <input
                    type={showPassword ? "text" : "password"}
                    name="task"
                    id="task"
                    autoComplete="task"
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md  border-0 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder={isPasswordFocused ? "" : "Password"}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="mr-2 mt-3 rounded-md bg-MyPurple-400 px-5 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
            >
              Save
            </button>
            <button className="mt-3 rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileSection;
