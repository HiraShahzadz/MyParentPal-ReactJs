import { Home, SignIn, SignUp } from "@/pages";

import {
  HomeIcon,
  ChatBubbleLeftIcon,
  ListBulletIcon,
  InformationCircleIcon,
  StarIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { MaterialTailwindControllerProvider } from "@/admin/context";
import App from "@/admin/App";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export const routes = [
  {
    icon: HomeIcon,
    name: "home",
    path: "/home",
    element: <Home />,
  },

  {
    icon: ListBulletIcon,
    name: "features",
    path: "/home#features",
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
  {
    icon: ChatBubbleLeftIcon,
    name: "contact us",
    path: "/home#contact",
    element: <Home />,
  },
];

export default routes;
