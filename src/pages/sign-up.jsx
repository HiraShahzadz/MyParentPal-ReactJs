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

export function SignUp() {
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
            <Input variant="standard" label="Email" type="Email" size="lg" />
            <Input
              variant="standard"
              type="Password"
              label="Password"
              size="lg"
            />
            <Input
              variant="standard"
              type="password"
              label="Confirm Password"
              size="lg"
            />

            <div className="custom-checkbox">
              <input type="checkbox" id="IagreetheTermsandConditions" />
              <label htmlFor="IagreetheTermsandConditions">
                I agree the Terms and Conditions
              </label>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button fullWidth className="bg-MyPurple-400">
              Sign Up
            </Button>
            <br />
            <Button
              fullWidth
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
