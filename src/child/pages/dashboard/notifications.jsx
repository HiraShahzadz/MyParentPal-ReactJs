import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";

export function Notifications() {
  const navigate = useNavigate();
  const [hiddenImages, setHiddenImages] = useState([]);

  const handleImageClick = (index) => {
    setHiddenImages([...hiddenImages, index]);
  };

  const [requestrs, setrequestrs] = useState([]);
  const [childProfile, setChildProfile] = useState([]);
  useEffect(() => {
    Load(); // Load data initially
    const interval = setInterval(() => {
      Load(); // Fetch new notifications periodically
    }, 10000); // Fetch data every 30 seconds (adjust interval as needed)
    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, [childProfile]);

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

  async function Load(filter = "") {
    try {
      let url = "http://localhost:8081/api/v1/notify/getall";
      if (filter === "latest") {
        url += "?filter=latest";
      }
      const allrequests = await axios.get(url);

      const currentDate = new Date();
      const currentHours = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();

      console.log("Current time:", currentHours, currentMinutes);

      // Assuming myProfile is fetched elsewhere in your code

      // Check if myProfile is valid and contains startTime and endTime
      if (myProfile && myProfile.startTime && myProfile.endTime) {
        // Parse start and end time from myProfile
        const parseTime = (timeString) => {
          const [time, meridiem] = timeString.split(" ");
          let [hours, minutes] = time.split(":").map(Number);
          if (meridiem === "PM" && hours !== 12) {
            hours += 12;
          }
          if (meridiem === "AM" && hours === 12) {
            hours = 0;
          }
          return { hours, minutes };
        };

        console.log("Start time:", myProfile.startTime);
        const { hours: startHours, minutes: startMinutes } = parseTime(
          myProfile.startTime
        );
        const { hours: endHours, minutes: endMinutes } = parseTime(
          myProfile.endTime
        );

        console.log("Parsed start time:", startHours, startMinutes);
        console.log("Parsed end time:", endHours, endMinutes);

        const filteredRequests = allrequests.data
          .filter((request) => {
            if (!request.localtime || !request.date) return false;

            const requestDate = new Date(request.date);
            const [reqHours, reqMinutes] = request.localtime
              .split(":")
              .map(Number);

            // Only compare times, ignore the date
            if (
              currentHours > startHours ||
              (currentHours === startHours && currentMinutes >= startMinutes)
            ) {
              if (
                currentHours < endHours ||
                (currentHours === endHours && currentMinutes <= endMinutes)
              ) {
                return true;
              }
            }

            return false;
          })
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setrequestrs(filteredRequests);
      } else {
        console.error("Invalid myProfile data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
          {requestrs.length > 0
            ? requestrs.map(({ ChildName, message, taskname, time }, index) => (
                <div
                  className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
                  key={index}
                >
                  <div className="flex">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/img/userc.png"
                      alt=""
                    />
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
              ))
            : myProfile && (
                <Typography color="gray">
                  Your notifications are scheduled between {myProfile.startTime}{" "}
                  and {myProfile.endTime}.
                </Typography>
              )}
        </CardBody>
      </Card>
    </div>
  );
}

export default Notifications;
