import { Home, Profile, SignIn, SignUp } from "@/pages";

import {
  HomeIcon,
  InformationCircleIcon,
  StarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import ParentApp from "./parent/ParentApp";

import { MaterialTailwindControllerProvider as ParentProvider } from "@/parent/context";
import { MaterialTailwindControllerProvider as ChildProvider } from "@/child/context";

import App from "@/admin/App";
import { ParentDashboard } from "@/parent/layouts";
import { ChildDashboard } from "@/child/layouts";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },

  {
    icon: ArrowRightOnRectangleIcon,
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    icon: ArrowRightOnRectangleIcon,
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
];

export default routes;
