import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import * as HeroIcons from "@heroicons/react/24/solid";
import ProgressReport from "@/child/pages/dashboard/ProgressReport"; 
import SubmitTask from "./pages/dashboard/SubmitTask";// Check if the file path is correct
import { Home, Profile, Reward_Request, Notifications} from "@/child/pages/dashboard";
import { SignIn} from "@/child/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
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
        icon: <TableCellsIcon {...icon} />,
        name: "Reward Request",
        path: "/request",
        element: <Reward_Request />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },
      {
       
        icon: <TableCellsIcon {...icon} />,
        name: "Progress Report",
        path: "/ProgressReport",
        element: <ProgressReport/>,
      },
      {
       
        icon: <TableCellsIcon {...icon} />,
        name: "Submit Task",
        path: "/submitTask",
        element: <SubmitTask/>,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      
    ],
  },
];

export default routes;
