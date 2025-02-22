import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/admin/context";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}
export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;
  const [stars, setStars] = React.useState(0);

  const sidenavColors = {
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    purple: "from-purple-300 to-purple-500",
  };

  React.useEffect(() => {
    const stars = fetch(
      "https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react"
    )
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pb-6 pt-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See our dashboard options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="px-6 py-4">
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark"}
              onClick={() => setSidenavType(dispatch, "dark")}
              className={
                sidenavType === "dark"
                  ? "bg-MyPurple-400 shadow-white hover:bg-purple-400 hover:shadow-white"
                  : "border border-MyPurple-400 bg-white text-MyPurple-400 shadow-white hover:bg-MyPurple-400 hover:text-white hover:shadow-white"
              }
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent"}
              onClick={() => setSidenavType(dispatch, "transparent")}
              className={
                sidenavType === "transparent"
                  ? "bg-MyPurple-400 shadow-white hover:bg-purple-400 hover:shadow-white"
                  : "border border-MyPurple-400 bg-white text-MyPurple-400 shadow-white hover:bg-MyPurple-400 hover:text-white hover:shadow-white"
              }
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white"}
              onClick={() => setSidenavType(dispatch, "white")}
              className={
                sidenavType === "white"
                  ? "bg-MyPurple-400 shadow-white hover:bg-purple-400 hover:shadow-white"
                  : "border border-MyPurple-400 bg-white text-MyPurple-400 shadow-white hover:bg-MyPurple-400 hover:text-white hover:shadow-white"
              }
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="#b089be">
              Navbar Fixed
            </Typography>
            <div className="">
              <Switch
                id="navbar-fixed"
                value={fixedNavbar}
                color="purple"
                onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
                className="border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                style={{
                  backgroundColor: fixedNavbar ? "#B089BE" : "",
                  color: fixedNavbar ? "#B089BE" : "",
                }}
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
