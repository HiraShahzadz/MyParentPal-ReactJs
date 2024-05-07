import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
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
  const [requestrs, setrequestrs] = useState([]);
 
  useEffect(() => {
    Load(); // Load data initially
    const interval = setInterval(() => {
      Load(); // Fetch new notifications periodically
    }, 30000); // Fetch data every minute (adjust interval as needed)
    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, []);

  async function Load(filter = "") {
    try {
      let url = "http://localhost:8081/api/v1/notify/getall";
      if (filter === "latest") {
        url += "?filter=latest";
      }
      const allrequests = await axios.get(url);
      setrequestrs(allrequests.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const [childProfile, setChildProfile] = useState([]);
  useEffect(() => {
    loadParentProfile();
  }, []);
  async function loadParentProfile() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/getChildId"
      );
      setChildProfile(result.data);
      console.log("child profile:", result.data);
    } catch (error) {
      console.error("Error loading parentProfile:", error);
      
    }
  }
  const myProfile = childProfile.find((profile) => profile);
  console.log(myProfile);

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
        {myProfile && (
          <>
          {requestrs
          .filter((Notification) => Notification.childId === myProfile.id)
          .filter(({ message }) => message.startsWith("Your parent"))
          .map(
            ({  ChildName, message, taskname,time }, index) => (
              <div
                href=""
                className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
                key={index}
              >
                <div className="flex">
                  <img className="h-10 w-10 rounded-full" src="/img/userc.png" alt="" />
                  <div className="ml-3">
                    <span className="text-black">{message}</span>
                    <span className="text-neutral-400 ml-2 mt-2 text-gray-400">
                      {time}
                    </span>
                    <div className="mt-1.5 flex">
                      <img className="h-3 w-3" src="/img/task.png" alt="" />
                      <span className="ml-1 text-xs text-black hover:underline">
                        {taskname}
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
          </>
        )}
        </CardBody>
      </Card>
      </div>
  );
}

export default Notifications;