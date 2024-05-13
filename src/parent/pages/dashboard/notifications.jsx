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
import NotificationData from "@/parent/data/NotificationData";
import RespondNotificationsData from "@/parent/data/RespondNotificationsData";
import RespondNotifications from "@/parent/pages/dashboard/RespondNotifications";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
export function Notifications() {
  const [hiddenImages, setHiddenImages] = useState([]);
  const [requestrs, setrequestrs] = useState([]);
  const [childProfileData, setChildProfileData] = useState([]);

  useEffect(() => {
    loadNotifications();
    loadChildProfileData();
    const interval = setInterval(() => {
      loadNotifications();
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

  const filteredNotifications = requestrs.filter((request) => {
    if (request.ChildId !== undefined && request.ChildId !== null) {
      return childProfileData.some((child) => child.id === request.ChildId);
    } else if (request.childId !== undefined && request.childId !== null) {
      return childProfileData.some((child) => child.id === request.childId);
    } else {
      console.log(
        "ChildId or childId is undefined or null for request:",
        request
      );
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

  const [showModal, setShowModal] = useState(false);
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
          {filteredNotifications
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(({ ChildId, ChildName, message, taskname, time }, index) => (
              <>
                {!message.startsWith("Your parent") && (
                  <div
                    href=""
                    className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
                    key={index}
                  >
                    <div className="flex">
                      {childProfileData.map(
                        (child) =>
                          child.id === ChildId && (
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
                      <div className="ml-3">
                        <span className="mr-1 font-medium text-black">
                          {ChildName}
                        </span>
                        <span className="text-black">{message}</span>
                        <span className="text-neutral-400 ml-2 mt-2 text-gray-400">
                          {time}
                        </span>
                        <div className="mt-1.5 flex">
                          <img className="h-3 w-3" src="/img/task.png" alt="" />
                          <span className="ml-1 text-xs text-black hover:underline">
                            {taskname ? taskname : "Pending"}
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
          {filteredNotifications
            .filter((request) => request.taskdescription)
            .map(({ ChildName, message, image, taskname, time }, index) => (
              <div className="items-center rounded-md p-3 text-sm hover:bg-blue-gray-50 sm:flex">
                <div className="flex">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="/img/userc.png"
                    alt=""
                  />
                  <div className="ml-3">
                    <span className="mr-1 font-medium text-black">
                      {ChildName}
                    </span>
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
                <div className="ml-12 mt-3 flex items-end sm:ml-auto">
                  <Button
                    onClick={() => setShowModal(true)}
                    className="mb-2 border border-MyPurple-400 bg-white px-3 py-2 text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent hover:bg-MyPurple-400 hover:text-white hover:shadow-white md:rounded-md"
                  >
                    View Request
                  </Button>
                </div>
                {showModal && <RespondNotifications onClose={setShowModal} />}
              </div>
            ))}
        </CardBody>
      </Card>
    </div>
  );
}
export default Notifications;
