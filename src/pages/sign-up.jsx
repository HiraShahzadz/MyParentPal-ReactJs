import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SignUp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [parentid, setId] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("parent");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate(); // Hook for navigation
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
            role: role,
            location: data.region,
          }
        );
        localStorage.setItem("email", email);
        navigate("/parentDashboard/parent/home/");
        console.log(`Welcome, ${name}!`);
        console.log(`Object Id is , ${objectId.data}!`);
      } catch (error) {
        console.log("Error in onSuccess:", error);
        // Handle error gracefully
        toast.error("An error occurred during sign-in");
      }
    },
    onError: (error) => {
      console.log("Error in useGoogleOneTapLogin:", error);
      // Handle error if there's an issue with One Tap login
      toast.error("An error occurred with Google One Tap");
    },
    googleAccountConfigs: {
      client_id:
        "654965562226-ujbv1vpns5sv89l08ueoq71u8pn7caq6.apps.googleusercontent.com",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  async function save(event) {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      return toast.error("Please fill in all fields");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmail("");
      return toast.error("Please enter a valid email address");
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(password)
    ) {
      setPassword("");
      setConfirmPassword("");
      return toast.error(
        "Password should be at least 8 characters long, contain at least one uppercase letter, and one special character"
      );
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should match");
      return;
    }
    if (!isChecked) {
      return toast.error("Please agree to the Terms and Conditions");
    }
    try {
      let url = "http://ipinfo.io/json?token=070152f59e4288";
      let response = await fetch(url);
      let data = await response.json();

      console.log(data);

      await axios.post("http://localhost:8081/api/v1/user/save-parent", {
        email: email,
        password: password,
        role: role,
        location: data.region,
      });
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      console.log("After Axios Request - Success");
      navigate("/parentDashboard/parent/home/");
      toast.success("Sign Up Successfully");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsChecked(false);
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }

      toast.error("Email already exists");
    }
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>

      <img
        img
        src="https://wallpapers.com/images/hd/white-and-purple-m16ylro3bkdt9w0n.jpg"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="container mx-auto p-4">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-20 place-items-center bg-MyPurple-400"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div class="relative">
              <input
                type="email"
                id="email"
                class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <label
                for="floating_filled"
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Email
              </label>
            </div>
            <div class="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <div
                className="eye-icon absolute right-2.5 top-7 cursor-pointer text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </div>

              <label
                for="floating_filled"
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Password
              </label>
            </div>
            <div class="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
              <div
                className="eye-icon absolute right-2.5 top-7 cursor-pointer text-gray-500"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
              </div>

              <label
                for="floating_filled"
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
              >
                Confirm Password
              </label>
            </div>
            <div className="custom-checkbox">
              <input
                className="h-4 w-4 border-gray-300 text-[#B089BE] focus:ring-[#B089BE]"
                type="checkbox"
                id="IagreetheTermsandConditions"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <label
                htmlFor="IagreetheTermsandConditions"
                className="cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                I agree the Terms and Conditions
                {showTooltip && (
                  <div className="bottom-30 h-15 absolute left-1/2 flex w-60 -translate-x-1/2 transform items-center justify-center rounded-md bg-gray-700 p-2 text-justify text-white shadow-md">
                    By checking this box, you acknowledge that your location may
                    be accessed.
                  </div>
                )}
              </label>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              fullWidth
              className="bg-MyPurple-400 shadow-transparent hover:bg-purple-400 hover:shadow-transparent"
              onClick={save}
            >
              Sign Up
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold text-MyPurple-400"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
