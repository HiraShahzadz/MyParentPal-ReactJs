import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  CardHeader,
  CardBody,
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Menu,
  MenuHandler,
  Button,
  MenuList,
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
} from "@/child/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [requests, setRequests] = useState([]);
  const [hiddenNotifications, setHiddenNotifications] = useState([]);
  const [childProfile, setChildProfile] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [readNotifications, setReadNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
    loadParentProfile();
    const storedHiddenNotifications = JSON.parse(
      localStorage.getItem("hiddenNotifications")
    );
    const storedReadNotifications = JSON.parse(
      localStorage.getItem("readNotifications")
    );
    if (storedHiddenNotifications) {
      setHiddenNotifications(storedHiddenNotifications);
    }
    if (storedReadNotifications) {
      setReadNotifications(storedReadNotifications);
    }
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, [childProfile]);

  useEffect(() => {
    localStorage.setItem(
      "hiddenNotifications",
      JSON.stringify(hiddenNotifications)
    );
    localStorage.setItem(
      "readNotifications",
      JSON.stringify(readNotifications)
    );
    const visibleNotifications = requests.filter(
      (notification) =>
        !readNotifications.includes(notification.id) &&
        notification.message.startsWith("Your parent") &&
        notification.childId === childProfile?.id
    );
  }, [hiddenNotifications, requests, childProfile, readNotifications]);

  useEffect(() => {
    // Calculate clickCount based on the number of unread notifications
    const unreadCount = requests.filter(
      (notification) =>
        !readNotifications.includes(notification.id) &&
        notification.message.startsWith("Your parent") &&
        notification.childId === myProfile?.id
    ).length;
    setClickCount(unreadCount);
  }, [requests, readNotifications]);

  const loadParentProfile = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/getChildId"
      );
      setChildProfile(result.data);
    } catch (error) {
      console.error("Error loading parentProfile:", error);
    }
  };

  const myProfile = childProfile
    ? childProfile.find((profile) => profile)
    : null;

  async function loadNotifications(filter = "") {
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

        // Filter out read notifications
        const unreadRequests = filteredRequests.filter(
          (request) => !readNotifications.includes(request.id)
        );

        setRequests(unreadRequests);
      } else {
        console.error("Invalid myProfile data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
    localStorage.setItem(
      "readNotifications",
      JSON.stringify(updatedReadNotifications)
    );

    // Remove the notification from the visible notifications
    const updatedVisibleNotifications = requests.filter((_, i) => i !== index);
    setRequests(updatedVisibleNotifications);

    // Update count based on the remaining visible notifications
    const remainingNotificationsCount = updatedVisibleNotifications.length;
    setClickCount(remainingNotificationsCount);
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
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
          <Link to="/childDashboard/profile">
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

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
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
                  <span className="absolute right-0 top-0 inline-block flex h-4 w-4 -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    {clickCount}
                  </span>
                )}
              </IconButton>
            </MenuHandler>
            <MenuList
              className="w-max border-0"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                paddingRight: "10px",
              }}
            >
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
              ></CardHeader>
              <CardBody className="flex max-h-64 flex-col gap-4 overflow-y-auto p-3">
                <Link to="/childDashboard/notifications">
                  {myProfile && (
                    <>
                      {requests
                        .filter((task) => task.childId === myProfile.id)
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map(
                          (
                            { ChildName, message, image, taskname, id },
                            index
                          ) => (
                            <div
                              className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
                              key={id}
                            >
                              <div className="flex">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="/img/userc.png"
                                  alt=""
                                />
                                <div className="ml-3">
                                  <span className="font-medium text-black">
                                    {ChildName}
                                  </span>
                                  <span className="text-black">{message}</span>
                                  <div className="mt-1.5 flex">
                                    <img
                                      className="h-3 w-3"
                                      src="/img/task.png"
                                      alt=""
                                    />
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
                </Link>
              </CardBody>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}
