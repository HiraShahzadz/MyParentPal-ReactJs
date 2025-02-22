import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import ChildProfileData from "../data/child-profile-data";
import { MyProfile } from "./Profile/profile";
import AddAccount from "./Profile/AddAccount";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ApproveChanges from "./ApproveChanges";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

function MyChild() {
  const [showProfiles, setShowProfiles] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [childProfileData, setChildProfileData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedChild, setSelectedChild] = useState(null); // State to hold selected child's data
  const [profileRequest, setProfileRequest] = useState([]); // State to hold profile request data
  const [showApproveChanges, setShowApproveChanges] = useState(false); // Flag to indicate whether to show ApproveChanges component
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
    if (childProfileData) {
      (async () => {
        await LoadChildData();
        await LoadProfileRequestData();
      })();
    }
  }, [selectedChild]);

  async function LoadChildData() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/get-child"
      );
      setChildProfileData(result.data);
      console.log("Child Profiles:", result.data); // Update console log message
    } catch (error) {
      console.error("Error loading child profiles:", error); // Update console error message
    }
  }

  async function LoadProfileRequestData() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/profile/getall"
      );
      setProfileRequest(result.data);
      console.log("Profile Requests:", result.data);

      // Check if there's a match between child IDs in childProfileData and profileRequest
      const hasMatchingChild = childProfileData.some((child) => {
        return result.data.some((profile) => profile.childId === child.id);
      });
      setShowApproveChanges(hasMatchingChild);
    } catch (error) {
      console.error("Error loading profile requests:", error);
    }
  }

  const handleViewProfile = (child) => {
    setSelectedChild(child); // Set selected child's data
    setShowProfiles(false);
  };

  const handleShowRequest = (child) => {
    setSelectedChild(child);
    setShowRequest(true);
  };

  // Filter child profiles based on search input
  const filteredChildProfiles = childProfileData.filter(
    (profile) =>
      profile.role === "child" &&
      profile.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      {showProfiles ? (
        <>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Child User Name"
                className="mb-8 mr-8 mt-8 w-60 rounded-md border-0 py-1.5 pl-3 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:w-96"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#B089BE"
                className="absolute right-10 top-10 h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="rounded-md bg-[#B089BE] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              + Add Account
            </button>
            {showModal && <AddAccount onClose={setShowModal} />}
          </div>
          {filteredChildProfiles.length === 0 && (
            <div className="m-10 items-center justify-center">
              <img
                className="mx-auto my-auto h-32 w-32 object-cover"
                src="/img/basketball.png"
                alt=""
              />
              <p className="mt-6 text-center text-sm">
                Create your child account
              </p>
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            </div>
          )}
          <div className="mb-12 grid gap-16 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
            {filteredChildProfiles.map(
              (
                {
                  id,
                  dob,
                  gender,
                  tags,
                  image,
                  img,
                  parentId,
                  name,
                  email,
                  password,
                  role,
                  requests,
                },
                index
              ) => (
                <Card
                  key={index}
                  className="rounded-md bg-white p-2 hover:shadow-xl "
                >
                  <CardBody className="p-4">
                    <CardBody className="p-4">
                      <img
                        className="mx-auto my-auto h-20 w-20 rounded-full object-cover"
                        src={
                          img
                            ? `data:image/jpeg;base64,${img}`
                            : "/img/user.png"
                        }
                        alt=""
                      />
                    </CardBody>
                    <Typography className="mt-3 block text-center text-sm font-medium leading-6 text-gray-900">
                      {name}
                    </Typography>
                    <Typography className="ml-1 text-center text-xs text-black  hover:underline">
                      {email}
                    </Typography>
                    <div className=" items-center justify-center text-center">
                      <Button
                        onClick={() =>
                          handleViewProfile({
                            id,
                            dob,
                            gender,
                            tags,
                            image,
                            img,
                            parentId,
                            name,
                            email,
                            password,
                            role,
                          })
                        } // Pass child data to handleViewProfile
                        className="mr-1 mt-3 rounded-md border border-MyPurple-400 bg-white px-3 py-2 text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-white hover:bg-MyPurple-400 hover:text-white hover:shadow-white"
                      >
                        View Profile
                      </Button>
                      {profileRequest.map(
                        (profile) =>
                          profile.childId === id &&
                          profile.status === "Pending" && (
                            <Button
                              onClick={() =>
                                handleShowRequest({
                                  id,
                                  dob,
                                  gender,
                                  tags,
                                  image,
                                  img,
                                  parentId,
                                  name,
                                  email,
                                  password,
                                  role,
                                })
                              }
                              className="mt-3 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:text-white hover:shadow-white"
                            >
                              <span className="mr-1 rounded-full bg-red-700 pl-1 pr-1">
                                1
                              </span>
                              Requests
                            </Button>
                          )
                      )}
                    </div>
                  </CardBody>
                </Card>
              )
            )}
          </div>
        </>
      ) : (
        <MyProfile childData={selectedChild} />
      )}
      {showRequest &&
        showApproveChanges &&
        profileRequest.some(
          (profile) =>
            profile.childId === selectedChild.id && profile.status === "Pending"
        ) && (
          <ApproveChanges
            onClose={() => setShowRequest(false)}
            childData={selectedChild}
            profileRequest={profileRequest}
          />
        )}
    </div>
  );
}

export default MyChild;
