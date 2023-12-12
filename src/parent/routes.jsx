import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  RectangleGroupIcon,
  RectangleStackIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import { ParentHome, Tables, Notifications } from "@/parent/pages/dashboard";
import { SignIn, SignUp } from "@/parent/pages/auth";
import TaskCreation from "./dragDrop/TaskCreationForum/TaskCreation";
import MyChild from "./ChildProfiles/MyChild";
import { ParentProfile } from "./ParentProfile/parentProfile";
import { MyProfile } from "./ChildProfiles/Profile/profile";

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
        element: <ParentHome />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <ParentProfile />,
      },
      {
        icon: <RectangleGroupIcon {...icon} />,
        name: "create tasks",
        path: "/tasks",
        element: <TaskCreation />,
      },
      {
        icon: <UserIcon {...icon} />,
        name: "My Child",
        path: "/child",
        element: <MyChild />,
      },

      {
        icon: <BellIcon {...icon} />,
        name: "notifactions",
        path: "/notifactions",
        element: <Notifications />,
      },

      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
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
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
