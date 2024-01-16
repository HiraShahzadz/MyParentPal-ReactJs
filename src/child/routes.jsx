import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  GiftIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import * as HeroIcons from "@heroicons/react/24/solid";
import ProgressReport from "@/child/pages/dashboard/ProgressReport";
import SubmitTask from "./pages/dashboard/SubmitTask"; // Check if the file path is correct
import {
  Home,
  Profile,
  Reward_Request,
  Notifications,
} from "@/child/pages/dashboard";
import { SignIn } from "@/child/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "childDashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <GiftIcon {...icon} />,
        name: "Reward Request",
        path: "/request",
        element: <Reward_Request />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Progress Report",
        path: "/ProgressReport",
        element: <ProgressReport />,
      },
      {
        icon: (
          <img
            src="/img/upload.png" // Replace this with your image path
            alt="Upload Icon"
            className="h-6 w-6" // Set appropriate width and height
          />
        ),
        name: "Submit Task",
        path: "/submitTask",
        element: <SubmitTask />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowLeftOnRectangleIcon {...icon} />,
        name: "Logout",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
