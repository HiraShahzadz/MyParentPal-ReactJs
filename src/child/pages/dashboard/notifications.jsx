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
import NotificationData from "@/data/NotificationData";

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
          <div className="ml-3 mt-4">
      <Typography variant="h5" color="black">
        Notifications
      </Typography>
    </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
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
      </div>
  );
}

export default Notifications;