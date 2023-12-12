import { Home, Profile, SignIn, SignUp } from "@/pages";
import { MaterialTailwindControllerProvider as ParentControllerProvider } from "@/parent/context";
import {
  HomeIcon,
  InformationCircleIcon,
  StarIcon,
  UserCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import ParentApp from "./parent/ParentApp";

import { MaterialTailwindControllerProvider } from "@/admin/context";
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
        <App />
      </MaterialTailwindControllerProvider>
    ),
  },
  {
    icon: InformationCircleIcon,
    name: "about us",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    icon: StarIcon,
    name: "reviews",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    icon: DocumentTextIcon,
    name: "Docs",
    path: "/*",
    element: (
      <ParentControllerProvider>
        <ParentApp />
      </ParentControllerProvider>
    ),
  },
];

export default routes;
