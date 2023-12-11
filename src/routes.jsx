import { Home, Profile, SignIn, SignUp } from "@/pages";
import {
  HomeIcon,
  ListBulletIcon,
  InformationCircleIcon,
  StarIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
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
    icon: ListBulletIcon,
    name: "features",
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
    icon: EnvelopeIcon,
    name: "contact us",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
];

export default routes;
