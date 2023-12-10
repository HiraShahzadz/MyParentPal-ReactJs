import { Home, Profile, SignIn, SignUp } from "@/pages";
import { MaterialTailwindControllerProvider } from "@/child/context";
import {
  HomeIcon,
  ListBulletIcon,
  InformationCircleIcon,
  StarIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { MaterialTailwindControllerProvider } from "@/parent/context";
import ParentApp from "@/parent/App";

import App from "@/child/App";

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
      <MaterialTailwindControllerProvider>
        <ParentApp />
      </MaterialTailwindControllerProvider>
    ),
  },
];

export default routes;
