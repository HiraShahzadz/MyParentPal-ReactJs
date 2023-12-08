import React, { useState } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import NotificationData from "@/parent/data/NotificationData";

export function Notifications() {
  const [hiddenImages, setHiddenImages] = useState([]);

  const handleImageClick = (index) => {
    // Set the index of the clicked image to the hiddenImages state
    setHiddenImages([...hiddenImages, index]);
  };

  const [showAlerts, setShowAlerts] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
    MyPurple: true,
  });
  const [showAlertsWithIcon, setShowAlertsWithIcon] = React.useState({
    blue: true,
    green: true,
    orange: true,
    red: true,
    MyPurple: true,
  });
  const alerts = ["blue", "green", "orange", "red", "MyPurple"];

  return (
    <div className="mx-auto my-10 flex max-w-screen-lg flex-col gap-8">
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Notifications
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-3">
          {NotificationData.map(
            ({ time, name, description, image, task }, index) => (
              <div
                href=""
                className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
                key={index}
              >
                <div className="flex">
                  <img className="h-10 w-10 rounded-full" src={image} alt="" />
                  <div className="ml-3">
                    <span className="font-medium text-black">{name}</span>
                    <span className="text-black">{description}</span>
                    <span className="text-neutral-400 ml-2 mt-2 text-gray-400">
                      {time}
                    </span>
                    <div className="mt-1.5 flex">
                      <img className="h-3 w-3" src="/img/task.png" alt="" />
                      <span className="ml-1 text-xs text-black hover:underline">
                        {task}
                      </span>
                    </div>
                  </div>
                </div>
                {!hiddenImages.includes(index) && (
                  <div
                    className="ml-auto flex items-end rounded-full border p-1 hover:border-MyPurple-400"
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      className="h-1.5 w-1.5 rounded-full"
                      src="/img/purple.png"
                      alt=""
                    />
                  </div>
                )}
              </div>
            )
          )}
        </CardBody>
      </Card>
      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Respond Notifications
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-3">
          {NotificationData.map(
            ({ time, name, description, image, task }, index) => (
              <a
                href=""
                className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
              >
                <div className="flex">
                  <img className="h-10 w-10 rounded-full" src={image} alt="" />
                  <div className="ml-3">
                    <span className="font-medium text-black">{name}</span>
                    <span className="text-black">{description}</span>
                    <span className="text-neutral-400 ml-2 mt-2 text-gray-400">
                      {time}
                    </span>
                    <div className="mt-1.5 flex">
                      <img className="h-3 w-3" src="/img/task.png" alt="" />
                      <span className="ml-1 text-xs text-black hover:underline">
                        {task}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex items-end">
                  <Button className="mb-2 mr-3 bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white md:rounded-md">
                    Reject
                  </Button>
                  <Button className="mb-2 border border-MyPurple-400 bg-white px-3 py-2 text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-white hover:bg-MyPurple-400 hover:text-white hover:shadow-white md:rounded-md">
                    Accept
                  </Button>
                </div>
              </a>
            )
          )}
        </CardBody>
      </Card>
    </div>
  );
}
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
export default Notifications;
