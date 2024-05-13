import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { GoogleLogin } from "react-google-login";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import "./Checkbox.css";
import "./InputField.css";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const { email, name, picture } = credentialResponse;
        // Retrieve user's location
        let url = "http://ipinfo.io/json?token=070152f59e4288";
        let response = await fetch(url);
        let data = await response.json();
        console.log(data);
        // Post user data including location to backend
        const objectId = await axios.post(
          "http://localhost:8081/api/v1/user/save-parent-google",
          {
            email: email,
            role: role, // Assuming 'role' is defined elsewhere
            location: data.region,
          }
        );
        localStorage.setItem("email", email);
        navigate("/parentDashboard/parent/home/");
        console.log(`Welcome, ${name}!`);
        console.log(`Object Id is, ${objectId.data}!`);
      } catch (error) {
        console.log("Error in onSuccess:", error);
        toast.error("An error occurred during sign-in");
      }
    },
    onError: (error) => {
      console.log("Error in useGoogleOneTapLogin:", error);
      toast.error("An error occurred with Google One Tap");
    },
    googleAccountConfigs: {
      client_id:
        "654965562226-ujbv1vpns5sv89l08ueoq71u8pn7caq6.apps.googleusercontent.com",
    },
  });

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailRemembered");
    const storedPassword = localStorage.getItem("passwordRemembered");
    const storedRememberMe = localStorage.getItem("rememberMe");

    if (storedEmail && storedPassword && storedRememberMe === "true") {
      setEmail(storedEmail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  async function signin(event) {
    event.preventDefault();

    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setEmail("");
      setPassword("");
      return toast.error("Enter valid credentials");
    }

    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/user/signin",
        {
          email: email,
          password: password,
        }
      );

      const { message } = response.data;
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      if (message === "Parent Login successful") {
        navigate("/parentDashboard/parent/home/");
      } else if (message === "Child Login successful") {
        navigate("/childDashboard/home/");
        toast.success(message);
      } else if (message === "Admin Login successful") {
        navigate("/dashboard/home/");
        toast.success(message);
      }

      if (rememberMe) {
        localStorage.setItem("emailRemembered", email);
        localStorage.setItem("passwordRemembered", password);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("emailRemembered");
        localStorage.removeItem("passwordRemembered");
        localStorage.removeItem("rememberMe");
      }

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signin error:", error);

      if (error.response && error.response.status === 401) {
        toast.error("Wrong email or password");
        setEmail("");
        setPassword("");
      } else {
        toast.error("An error occurred during login");
      }
    }
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>

      <img
        src="https://wallpapers.com/images/hd/white-and-purple-m16ylro3bkdt9w0n.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader className="mb-4 grid h-20 place-items-center bg-MyPurple-400">
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 ">
            <div class="relative">
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
              />
              <label
                for="floating_filled"
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Email or Username
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer relative block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
              />
              <div
                className="eye-icon absolute right-2.5 top-7 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </div>
              <label
                htmlFor="password"
                className="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Password
              </label>
            </div>

            <div className="custom-checkbox">
              <input
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                type="checkbox"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              fullWidth
              className="bg-MyPurple-400 shadow-transparent hover:bg-purple-400 hover:shadow-transparent"
              onClick={signin}
            >
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  className="ml-1 font-bold text-MyPurple-400"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
