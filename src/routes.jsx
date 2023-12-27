import { Home, Profile, SignIn, SignUp } from "@/pages";

import {
  HomeIcon,
  InformationCircleIcon,
  StarIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import ParentApp from "./parent/ParentApp";

import { MaterialTailwindControllerProvider } from "@/parent/context";
import App from "@/admin/App";
export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    icon: UserCircleIcon,
    name: "profile",
    path: "/*",
    element: (
      <MaterialTailwindControllerProvider>
        <ParentApp />
      </MaterialTailwindControllerProvider>
    ),
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
