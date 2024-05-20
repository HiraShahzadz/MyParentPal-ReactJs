import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import RespondNotifications from "@/parent/pages/dashboard/RespondNotifications";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";

export function Notifications() {
  const [hiddenImages, setHiddenImages] = useState([]);
  const [requestrs, setrequestrs] = useState([]);
  const [childProfileData, setChildProfileData] = useState([]);
  const [respondNotifications, setRespondNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    loadNotifications();
    loadChildProfileData();
    loadRespondNotifications();
    const interval = setInterval(() => {
      loadNotifications();
      loadRespondNotifications();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  async function loadNotifications(filter = "") {
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

  async function loadChildProfileData() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/get-child"
      );
      setChildProfileData(result.data);
    } catch (error) {
      console.error("Error fetching child profile data:", error);
    }
  }

  async function loadRespondNotifications() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/Reward_Request/get_requests"
      );
      setRespondNotifications(result.data);
    } catch (error) {
      console.error("Error fetching reward requests:", error);
    }
  }

  const filteredNotifications = requestrs.filter((request) => {
    if (request.ChildId !== undefined && request.ChildId !== null) {
      return childProfileData.some((child) => child.id === request.ChildId);
    } else if (request.childId !== undefined && request.childId !== null) {
      return childProfileData.some((child) => child.id === request.childId);
    } else {
      return false;
    }
  });

  const filteredRespond = respondNotifications.filter((request) => {
    if (request.ChildId !== undefined && request.ChildId !== null) {
      return childProfileData.some((child) => child.id === request.ChildId);
    } else if (request.childId !== undefined && request.childId !== null) {
      return childProfileData.some((child) => child.id === request.childId);
    } else {
      return false;
    }
  });

  const handleImageClick = (index) => {
    setHiddenImages((prevHiddenImages) =>
      prevHiddenImages.includes(index)
        ? prevHiddenImages.filter((item) => item !== index)
        : [...prevHiddenImages, index]
    );
  };

  const handleViewRequestClick = (data) => {
    const filteredRespondNotifications = respondNotifications.filter(
      (notification) => notification.childId === data.childId
    );
    setSelectedNotification({
      ...data,
      respondNotifications: filteredRespondNotifications,
    });
  };

  return (
    <div className="mx-auto my-10 flex max-w-screen-lg flex-col gap-8">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>
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
        <CardBody className="flex max-h-64 flex-col gap-4 overflow-y-auto p-3">
          {filteredNotifications.length === 0 && (
            <div className="items-center justify-center">
              <p className="text-center text-sm">
                You haven't recieved any notifications yet
              </p>
              <div className="m-3 flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            </div>
          )}
          {filteredNotifications
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((data, index) => (
              <>
                {!data.message.startsWith("Your parent") && (
                  <div
                    className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
                    key={index}
                  >
                    <div className="flex">
                      {childProfileData.map(
                        (child) =>
                          child.id === data.ChildId && (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                child.img
                                  ? `data:image/jpeg;base64,${child.img}`
                                  : "/img/user.png"
                              }
                              alt=""
                            />
                          )
                      )}
                      <div className="flex">
                        {childProfileData.map(
                          (child) =>
                            child.id === data.childId && (
                              <>
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={
                                    child.img
                                      ? `data:image/jpeg;base64,${child.img}`
                                      : "/img/user.png"
                                  }
                                  alt=""
                                />
                              </>
                            )
                        )}
                      </div>
                      <div className="ml-3">
                        <span className="text-black">{data.message}</span>
                        <span className="text-neutral-400 ml-2 mt-2 text-gray-400">
                          {data.time}
                        </span>
                        <div className="mt-1.5 flex">
                          <img className="h-3 w-3" src="/img/task.png" alt="" />
                          <span className="ml-1 text-xs text-black hover:underline">
                            {data.taskname ? data.taskname : "Pending"}
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
                          src="/img/userc.png"
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
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
        <CardBody className="flex max-h-64 flex-col gap-4 overflow-y-auto p-3">
          {filteredRespond.filter((data) => data.status === "Pending")
            .length === 0 && (
            <div className="items-center justify-center">
              <p className="text-center text-sm">No more requests pending</p>
              <div className="m-3 flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationCircle} />
              </div>
            </div>
          )}
          {filteredRespond.map((data, index) => {
            if (data.status === "Pending") {
              return (
                <div
                  className="items-center rounded-md p-3 text-sm hover:bg-blue-gray-50 sm:flex"
                  key={index}
                >
                  <div className="flex">
                    {childProfileData.map(
                      (child) =>
                        child.id === data.childId && (
                          <>
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={
                                child.img
                                  ? `data:image/jpeg;base64,${child.img}`
                                  : "/img/user.png"
                              }
                              alt=""
                            />
                            <div className="ml-3">
                              <span className="mr-1 font-medium text-black">
                                {child.name}
                              </span>
                              <span className="mr-1 text-black">
                                Requested for a reward
                              </span>
                              <span className=" mt-2 font-bold text-MyPurple-400">
                                {data.desiredreward}
                              </span>
                              <span className="text-neutral-400 ml-2 mt-2 text-gray-400">
                                {data.date}
                              </span>

                              <div className="mt-1.5 flex">
                                <img
                                  className="h-3 w-3"
                                  src="/img/task.png"
                                  alt=""
                                />
                                <span className="ml-1 text-xs text-black hover:underline">
                                  {data.taskname}
                                </span>
                              </div>
                            </div>
                          </>
                        )
                    )}
                  </div>
                  <div className="ml-12 mt-3 flex items-end sm:ml-auto">
                    <Button
                      onClick={() => handleViewRequestClick(data)}
                      className="mb-2 border border-MyPurple-400 bg-white px-3 py-2 text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent hover:bg-MyPurple-400 hover:text-white hover:shadow-white md:rounded-md"
                    >
                      View Request
                    </Button>
                  </div>
                </div>
              );
            } else {
              return null; // Handle other statuses if needed
            }
          })}
        </CardBody>
      </Card>
      {selectedNotification && (
        <RespondNotifications
          childProfileData={childProfileData}
          selectedNotification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
        />
      )}
    </div>
  );
}

export default Notifications;
