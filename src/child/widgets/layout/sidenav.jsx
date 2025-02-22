import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/child/context";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };
  const handleLogout = () => {
    // Clear email and password from localStorage
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    // Redirect to sign-in page
    navigate("/sign-in");
  };
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      }  fixed inset-0 z-50 my-1 ml-1 w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 px-8 py-6">
          <Avatar src={brandImg} size="sm" className="w-13 h-9 " />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4 flex h-5/6 flex-col gap-4 overflow-y-auto p-3  lg:max-h-full">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mb-2 mt-4">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography
                        color="inherit"
                        className="font-medium capitalize"
                      >
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}

            {title === "" && (
              <li>
                <Link
                  className="flex items-center gap-4 rounded-lg bg-transparent px-4 py-3 capitalize text-white hover:bg-white/10" // Apply bg-transparent class
                  onClick={handleLogout}
                  fullWidth
                  style={{
                    boxShadow: "none", // Set box shadow to none by default
                    transition: "box-shadow 0.2s", // Add transition for smooth effect
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.boxShadow = "none")
                  } // Remove box shadow on hover
                  onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")} // Restore box shadow after hover
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 text-white" />{" "}
                  {/* Ensure icon color is white */}
                  <Typography
                    color="inherit"
                    className="font-medium capitalize"
                  >
                    Logout
                  </Typography>
                </Link>
              </li>
            )}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-p.png",
  brandName: "MyParentPal",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
