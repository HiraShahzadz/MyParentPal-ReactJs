import { useLocation, Link } from "react-router-dom";
import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import NotificationData from "@/data/NotificationData";
import {
  Card,
  CardHeader,
  CardBody,
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
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
  const [hiddenImages, setHiddenImages] = useState([]);

  const handleImageClick = (index) => {
    // Set the index of the clicked image to the hiddenImages state
    setHiddenImages([...hiddenImages, index]);
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
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/dashboard/profile">
            <Button
            
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
              title="Profile"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </Button>
            <IconButton
              variant="text"
              color="blue-gray"
              className="grid xl:hidden"
              title="Profile"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
            </IconButton>
          </Link>

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <Cog6ToothIcon className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <CardHeader
                color="transparent"
                floated={false}
                shadow={false}
              >
              </CardHeader>
             
                <Link to="/dashboard/notifications">
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