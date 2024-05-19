import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  CardHeader,
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  MenuList,
  CardBody,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/parent/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [requests, setRequests] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [hiddenNotifications, setHiddenNotifications] = useState([]);
  const [readNotifications, setReadNotifications] = useState([]);
  const [childProfileData, setChildProfileData] = useState([]);

  useEffect(() => {
    loadNotifications();
    loadChildProfileData();
    const storedHiddenNotifications = JSON.parse(localStorage.getItem("hiddenNotifications"));
    const storedReadNotifications = JSON.parse(localStorage.getItem("readNotifications"));
    if (storedHiddenNotifications) {
      setHiddenNotifications(storedHiddenNotifications);
    }
    if (storedReadNotifications) {
      setReadNotifications(storedReadNotifications);
    }
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("hiddenNotifications", JSON.stringify(hiddenNotifications));
    localStorage.setItem("readNotifications", JSON.stringify(readNotifications));
  }, [hiddenNotifications, readNotifications]);

 useEffect(() => {
  // Calculate clickCount based on the number of unread notifications (excluding those that start with "Your parent")
  const unreadCount = requests.filter(notification => !notification.message.startsWith("Your parent") && !readNotifications.includes(notification.id)).length;
  setClickCount(unreadCount);
}, [requests, readNotifications]);

  const loadNotifications = async () => {
    try {
      const url = "http://localhost:8081/api/v1/notify/getall";
      const allRequests = await axios.get(url);

      // Merge the newly fetched notifications with existing read statuses
      const updatedRequests = allRequests.data.map(notification => {
        if (readNotifications.includes(notification.id)) {
          notification.read = true;
        }
        return notification;
      });

      // Filter out the hidden notifications
      const filteredNotifications = updatedRequests.filter(notification => 
        !hiddenNotifications.includes(notification.id)
      );
      setRequests(filteredNotifications);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadChildProfileData = async () => {
    try {
      const result = await axios.get("http://localhost:8081/api/v1/user/get-child");
      setChildProfileData(result.data);
    } catch (error) {
      console.error("Error fetching child profile data:", error);
    }
  };

  const handleBellClick = () => {
    // Clear all notifications
    setRequests([]);
    // Clear hidden notifications
    setHiddenNotifications([]);
    // Clear read notifications
    setReadNotifications([]);
    localStorage.setItem("hiddenNotifications", JSON.stringify([]));
    localStorage.setItem("readNotifications", JSON.stringify([]));
    setClickCount(0);
  };


  const handleImageClick = (index) => {
    const notificationId = requests[index].id;
    const updatedReadNotifications = [...readNotifications, notificationId];
    setReadNotifications(updatedReadNotifications);
    localStorage.setItem("readNotifications", JSON.stringify(updatedReadNotifications));

    const updatedVisibleNotifications = requests.filter((_, i) => i !== index);
    setRequests(updatedVisibleNotifications);

    const remainingNotificationsCount = updatedVisibleNotifications.filter(notification => !readNotifications.includes(notification.id)).length;
    setClickCount(remainingNotificationsCount);
  };

  const filteredNotifications = requests.filter((request) => {
    if (request.ChildId !== undefined && request.ChildId !== null) {
      return childProfileData.some((child) => child.id === request.ChildId);
    } else if (request.childId !== undefined && request.childId !== null) {
      return childProfileData.some((child) => child.id === request.childId);
    } else {
      console.log("ChildId or childId is undefined or null for request:", request);
      return false;
    }
  });

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5" : "px-0 py-1"}`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""}`}>
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal">
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/parentDashboard/parent/profile">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
              title="Profile"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" alt="" />
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              title="Profile"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" alt="" />
            </IconButton>
          </Link>
          <IconButton variant="text" color="blue-gray" onClick={() => setOpenConfigurator(dispatch, true)}>
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" alt="" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                color="blue-gray"
                className="relative"
                onClick={handleBellClick}
              >
                <BellIcon className="h-5 w-5 text-blue-gray-500" alt="" />
                {clickCount > 0 && (
                  <>
                {filteredNotifications.filter(notification => !notification.message.startsWith("Your parent")).length > 0 && (
  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-block bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
    {clickCount}
  </span>
)}

                </>
              )}
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0" style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "10px" }}>
              <CardHeader color="transparent" floated={false} shadow={false}></CardHeader>
              <CardBody className="flex max-h-64 flex-col gap-4 overflow-y-auto p-3">
                <Link to="/parentDashboard/parent/notifications">
                  {filteredNotifications
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map(({ ChildName, message, image, taskname, id }, index) => (
                      <>
                        {!message.startsWith("Your parent") && (
                          <div className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50" key={id}>
                            <div className="flex">
                              <img className="h-10 w-10 rounded-full" src="/img/userc.png" alt="" />
                              <div className="ml-3">
                                <span className="font-medium text-black">{ChildName}</span>
                                <span className="text-black">{message}</span>
                                <div className="mt-1.5 flex">
                                  <img className="h-3 w-3" src="/img/task.png" alt="" />
                                  <span className="ml-1 text-xs text-black hover:underline">
                                    {taskname ? taskname : "Edit Profile"}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {!readNotifications.includes(id) && (
                              <div
                                className="ml-auto flex items-end rounded-full border p-1 hover:border-MyPurple-400"
                                onClick={() => handleImageClick(index)}
                              >
                                <img className="h-1.5 w-1.5 rounded-full" src="/img/purple.png" alt="" />
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ))}
                </Link>
              </CardBody>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

export default DashboardNavbar;
