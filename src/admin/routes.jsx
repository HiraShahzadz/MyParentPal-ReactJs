import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Home, Tables } from "@/admin/pages/dashboard";
import { SignIn, SignUp } from "@/admin/pages/auth";

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
        icon: <TableCellsIcon {...icon} />,
        name: "Feedback and Queries",
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
        icon: <ArrowLeftOnRectangleIcon {...icon} />,
        name: "Log out",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
