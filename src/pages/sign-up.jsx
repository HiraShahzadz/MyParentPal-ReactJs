import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
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
import { SimpleFooter } from "@/widgets/layout";

export function SignUp() {
  const [parentid, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8081/api/v1/parent/save", {
        email: email,
        password: password,
      });
      alert("Student Registation Successfully");

      setEmail("");
      setPassword("");
    } catch (err) {
      alert("User Registation Failed");
    }
  }

  return (
    <>
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
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Email
              </label>
            </div>
            <div class="relative">
              <input
                type="password"
                id="password"
                class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <label
                for="floating_filled"
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Password
              </label>
            </div>
            <div class="relative">
              <input
                type="password"
                id="floating_filled"
                class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
              />
              <label
                for="floating_filled"
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Confirm Password
              </label>
            </div>
            <div className="custom-checkbox">
              <input type="checkbox" id="IagreetheTermsandConditions" />
              <label htmlFor="IagreetheTermsandConditions">
                I agree the Terms and Conditions
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
            <br />
            <Button
              fullWidth
              className="shadow-transparent hover:shadow-transparent"
              style={{
                backgroundColor: "#FFFFFF",
                color: "#B089BE",
                border: "1px solid rgba(128, 128, 128, 0.5)",
                display: "flex",
                alignItems: "center", // Align items vertically in the center
                justifyContent: "center", // Center content horizontally
              }}
            >
              <img
                src="/src/widgets/layout/google.svg"
                alt="Google Icon"
                style={{
                  height: "20px", // Set a fixed height
                  width: "20px", // Set a fixed width
                  marginRight: "12px", // Add some spacing
                }}
              />
              Sign In with Google
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
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignUp;
