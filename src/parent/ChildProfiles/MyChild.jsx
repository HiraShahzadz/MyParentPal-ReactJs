import React, { useState, useEffect } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import ChildProfileData from "../data/child-profile-data";
import { MyProfile } from "./Profile/profile";
import AddAccount from "./Profile/AddAccount";
import { Link } from "react-router-dom";
import ApproveChanges from "./ApproveChanges";
import axios from "axios";

function MyChild() {
  const [showProfiles, setShowProfiles] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [childProfileData, setChildProfileData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedChild, setSelectedChild] = useState(null); // State to hold selected child's data

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "http://localhost:8081/api/v1/user/get-child"
    );
    setChildProfileData(result.data);
    console.log(result.data);
  }

  const handleViewProfile = (child) => {
    setSelectedChild(child); // Set selected child's data
    setShowProfiles(false);
  };

  const handleShowRequest = (requests) => {
    setShowRequest(requests > 0);
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
                      <Button
                        onClick={() => handleShowRequest(requests)}
                        className={`mt-3 rounded-md  ${
                          requests === 0 ? "bg-gray-400" : "bg-gray-500"
                        } px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:text-white hover:shadow-white`}
                      >
                        <span className="mr-1 rounded-full bg-MyPurple-400 pl-1 pr-1">
                          {requests}
                        </span>
                        Requests
                      </Button>
                    </div>
                    {showRequest && <ApproveChanges onClose={setShowRequest} />}
                  </CardBody>
                </Card>
              )
            )}
          </div>
        </>
      ) : (
        <MyProfile childData={selectedChild} />
      )}
    </div>
  );
}

export default MyChild;
