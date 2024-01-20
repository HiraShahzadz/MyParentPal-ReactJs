import { Home, SignIn, SignUp } from "@/pages";

import {
  HomeIcon,
  ChatBubbleLeftIcon,
  ListBulletIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

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
