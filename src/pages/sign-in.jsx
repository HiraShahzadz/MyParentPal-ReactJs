import { Link } from "react-router-dom";
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
import "./Checkbox.css";
import "./InputField.css";

export function SignIn() {
  return (
    <>
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
                id="floating_filled"
                class="peer block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-MyPurple-400 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-MyPurple-400"
                placeholder=" "
              />
              <label
                for="floating_filled"
                class="absolute start-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-blue-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-MyPurple-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
              >
                Email or Username
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
                Password
              </label>
            </div>

            <div className="custom-checkbox">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button fullWidth className="bg-MyPurple-400">
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
      <div className="container absolute bottom-6 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <SimpleFooter />
      </div>
    </>
  );
}

export default SignIn;
