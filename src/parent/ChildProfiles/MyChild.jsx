import React, { useState } from "react";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import ChildProfileData from "../data/child-profile-data";
import { MyProfile } from "./Profile/profile";
import AddAccount from "./Profile/AddAccount";

function MyChild() {
  const [showProfiles, setShowProfiles] = useState(true);

  const handleViewProfile = () => {
    setShowProfiles(false);
  };
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      {showProfiles ? (
        <>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Child"
                className="mb-8 mr-8 mt-8 w-64 rounded-md border-0 py-1.5 pl-3 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:w-96"
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
            {ChildProfileData.map(({ img, name, username }, index) => (
              <Card
                key={index}
                className="rounded-md bg-white p-2 hover:shadow-xl "
              >
                <CardBody className="p-4">
                  <img
                    className="mx-auto my-auto h-20 w-20 rounded-full "
                    src={img}
                    alt=""
                  />
                  <Typography className="mt-3 block text-center text-sm font-medium leading-6 text-gray-900">
                    {name}
                  </Typography>
                  <Typography className="ml-1 text-center text-xs text-black  hover:underline">
                    {username}
                  </Typography>
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={handleViewProfile}
                      className="mt-9 rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white"
                    >
                      View Profile
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <MyProfile />
      )}
    </div>
  );
}

export default MyChild;
