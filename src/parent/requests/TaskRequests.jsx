import React, { useEffect, useState } from "react";
import {
  Typography,
  Alert,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@material-tailwind/react";
import NotificationData from "@/parent/data/NotificationData";
import RespondNotificationsData from "@/parent/data/RespondNotificationsData";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import RequestDetails from "./RequestDetail";
export function TaskRequests() {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
  }, []);
  const [hiddenImages, setHiddenImages] = useState([]);

  const handleImageClick = (index) => {
    // Set the index of the clicked image to the hiddenImages state
    setHiddenImages([...hiddenImages, index]);
  };

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="mx-auto my-8 flex max-w-screen-lg flex-col gap-8">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>

      <Card>
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="m-0 p-4"
        >
          <Typography variant="h5" color="blue-gray">
            Task Requests History
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-3">
          {RespondNotificationsData.map(
            ({ time, name, description, image, task }, index) => (
              <div className="items-center rounded-md p-3 text-sm hover:bg-blue-gray-50 sm:flex">
                <div className="flex">
                  <img className="h-10 w-10 rounded-full" src={image} alt="" />
                  <div className="ml-3">
                    <span className="mr-1 font-medium text-black">{name}</span>
                    <span className="text-black">{description}</span>
                    <span className="text-neutral-400 ml-2 mt-2 text-gray-400">
                      {time}
                    </span>
                    <div className="mt-1.5 flex">
                      <img className="h-3 w-3" src="/img/task.png" alt="" />
                      <span className="ml-1 text-xs text-black hover:underline">
                        {task}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-12 mt-3 flex items-end sm:ml-auto">
                  <Button
                    onClick={() => setShowModal(true)}
                    className="mb-2 border border-MyPurple-400 bg-white px-3 py-2 text-sm font-semibold normal-case text-MyPurple-400 shadow-sm shadow-transparent hover:bg-MyPurple-400 hover:text-white hover:shadow-white md:rounded-md"
                  >
                    View Request
                  </Button>
                </div>
                {showModal && <RequestDetails onClose={setShowModal} />}
              </div>
            )
          )}
        </CardBody>
      </Card>
    </div>
  );
}
export default TaskRequests;
