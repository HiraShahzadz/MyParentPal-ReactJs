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
            <Input
              variant="standard"
              type="email"
              label="Email or Username"
              size="lg"
              className="focus:border-none"
            />

            <Input
              variant="standard"
              type="password"
              label="Password"
              size="lg"
              className="focus:border-MyPurple-400" // Add this class for focus styles
            />

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
