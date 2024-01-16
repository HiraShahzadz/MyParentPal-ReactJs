import {
  HomeIcon,
  UserCircleIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  PlusCircleIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";

import {
  ParentHome,
  ChildReport,
  Notifications,
} from "@/parent/pages/dashboard";
import { SignIn, SignUp } from "@/parent/pages/auth";
import TaskCreation from "./dragDrop/TaskCreationForum/TaskCreation";
import MyChild from "./ChildProfiles/MyChild";
import { ParentProfile } from "./ParentProfile/parentProfile";
import { MyProfile } from "./ChildProfiles/Profile/profile";
import { TaskEvaluate } from "./EvaluateTask/TaskEvaluate";
import TaskRequests from "./requests/TaskRequests";

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
        icon: <UserGroupIcon {...icon} />,
        name: "My Child",
        path: "/child",
        element: <MyChild />,
      },
      {
        icon: <PlusCircleIcon {...icon} />,
        name: "create tasks",
        path: "/tasks",
        element: <TaskCreation />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "Evaluate Task",
        path: "/evaluation",
        element: <TaskEvaluate />,
      },

      {
        icon: <BellIcon {...icon} />,
        name: "Notifications",
        path: "/notifications",
        element: <Notifications />,
      },

      {
        icon: <UserPlusIcon {...icon} />,
        name: "Task Requests",
        path: "/requests",
        element: <TaskRequests />,
      },

      {
        icon: <ChartBarSquareIcon {...icon} />,
        name: "Child Report",
        path: "/report",
        element: <ChildReport />,
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
