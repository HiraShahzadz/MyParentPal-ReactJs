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
  const [hiddenImages, setHiddenImages] = useState([]);
  const [requestrs, setrequestrs] = useState([]);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    Load(); // Load data initially
    const interval = setInterval(() => {
      Load(); // Fetch new notifications periodically
    }, 60000); // Fetch data every minute (adjust interval as needed)
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

  const handleBellClick = () => {
    setClickCount(clickCount + 1);
    // If click count reaches 2, reset notification count to 0
    if (clickCount === 1) {
      setrequestrs([]);
      // Reset click count
      setClickCount(0);
    }
  };
  

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
        }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${fixedNavbar ? "mt-1" : ""
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
            <Bars3Icon
              strokeWidth={3}
              className="h-6 w-6 text-blue-gray-500"
            />
          </IconButton>
          <Link to="/parentDashboard/parent/profile">
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
              title="Profile"
            >
              <UserCircleIcon
                className="h-5 w-5 text-blue-gray-500"
                alt=""
              />
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              title="Profile"
            >
              <UserCircleIcon
                className="h-5 w-5 text-blue-gray-500"
                alt=""
              />
            </IconButton>
          </Link>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon
              className="h-5 w-5 text-blue-gray-500"
              alt=""
            />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton
                variant="text"
                color="blue-gray"
                className="relative"
                onClick={handleBellClick} // Reset notification count to 0 on click
              >
                <BellIcon
                  onClick={handleBellClick}
                  className="h-5 w-5 text-blue-gray-500"
                  alt=""
                />
                {requestrs.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-block bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {requestrs.length}
                  </span>

                )}
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
              ></CardHeader>

              <Link to="/parentDashboard/parent/notifications">
                {requestrs.map(({ ChildName, message, image, taskname }, index) => (
                  <div
                    href=""
                    className="flex items-center rounded-md p-3 text-sm hover:bg-blue-gray-50"
                    key={index}
                  >
                    <div className="flex">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={image}
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
                ))}
              </Link>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
