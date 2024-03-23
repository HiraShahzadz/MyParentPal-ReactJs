import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AboutSection({ profile }) {
  const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
  const [isLastNameFocused, setIsLastNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isCnicFocused, setIsCnicFocused] = useState(false);

  const handleFirstNameFocus = () => {
    setIsFirstNameFocused(true);
  };

  const handleFirstNameBlur = () => {
    setIsFirstNameFocused(false);
  };

  const handleLastNameFocus = () => {
    setIsLastNameFocused(true);
  };

  const handleLastNameBlur = () => {
    setIsLastNameFocused(false);
  };

  const handlePhoneFocus = () => {
    setIsPhoneFocused(true);
  };

  const handlePhoneBlur = () => {
    setIsPhoneFocused(false);
  };

  const handleCnicFocus = () => {
    setIsCnicFocused(true);
  };

  const handleCnicBlur = () => {
    setIsCnicFocused(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Profile updated");
  };
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [cnic, setCnic] = useState("");

  async function update(event) {
    event.preventDefault();
    if (!firstName || !lastName || !phoneNo || !cnic) {
      return toast.error("Please fill in all fields");
    }
    try {
      await axios.put(
        "http://localhost:8081/api/v1/user/editParent/" + profile.id,
        {
          id: profile.id,
          email: profile.email,
          password: profile.password,
          firstName: firstName,
          lastName: lastName,
          phoneNo: phoneNo,
          cnic: cnic,
        }
      );
      toast.success("Parent profile is created Successfully");
      setFirstName("");
      setLastName("");
      setPhoneNo("");
      setCnic("");
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
    <div>
      <div>
        <form onSubmit={handleSubmit} className="">
          <DndProvider backend={HTML5Backend}>
            <Toaster />
          </DndProvider>
          <div className="ml-2 mt-1 pb-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="ml-2 mr-2 text-black"
                  />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={profile.firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    pattern="[A-Za-z]+"
                    title="Please enter only letters"
                    autoComplete="task"
                    onFocus={handleFirstNameFocus}
                    onBlur={handleFirstNameBlur}
                    className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md  border-0 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder={isFirstNameFocused ? "" : "Your first name"}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="ml-2 mr-2 text-black"
                  />
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={profile.lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    pattern="[A-Za-z ]+"
                    title="Please enter only letters"
                    autoComplete="task"
                    onFocus={handleLastNameFocus}
                    onBlur={handleLastNameBlur}
                    className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md  border-0 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder={isLastNameFocused ? "" : "Your last name"}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-3 flex items-center">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="ml-2 mr-2 text-black"
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    id="phoneNo"
                    value={profile.phoneNo}
                    onChange={(event) => {
                      setPhoneNo(event.target.value);
                    }}
                    pattern="\+\d{12}"
                    title="Enter a valid phone no. (e.g., +929081675668)"
                    autoComplete="task"
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md  border-0 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder={isPhoneFocused ? "" : "Your phone number"}
                    required
                  />
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-3 flex items-center">
                  <img
                    className="ml-2 mr-2 h-4 w-4 text-black"
                    src="/img/id-card.png"
                    alt=""
                  />
                  <input
                    type="text"
                    name="cnic"
                    id="cnic"
                    value={profile.cnic}
                    onChange={(event) => {
                      setCnic(event.target.value);
                    }}
                    pattern="\d{5}-\d{7}-\d"
                    title="Enter a valid CNIC no. (e.g., 12345-6789012-3)"
                    autoComplete="task"
                    onFocus={handleCnicFocus}
                    onBlur={handleCnicBlur}
                    className="block w-full flex-1 overflow-hidden whitespace-nowrap rounded-md  border-0 py-1.5 text-sm font-medium text-gray-900 ring-1 ring-inset ring-transparent  placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder={isCnicFocused ? "" : "Your CNIC"}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              onClick={update}
              className="mr-2 mt-2 rounded-md bg-MyPurple-400 px-5 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
            >
              Save
            </button>
            <button className="mt-2 rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AboutSection;
