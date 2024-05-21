import React, { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const ChatForm = ({ taskId }) => {
  const [typedMessage, setTypedMessage] = useState("");
  const [showSendButton, setShowSendButton] = useState(true);
  const [messageSent, setMessageSent] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const [submission, setsubmission] = useState([]);

  useEffect(() => {
    Load();
  }, []);

  async function Load() {
    try {
      let url = "http://localhost:8081/api/v1/task_submission/getall";
      const all = await axios.get(url);
      setsubmission(all.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const [childProfile, setChildProfile] = useState([]);
  useEffect(() => {
    loadParentProfile();
  }, []);
  async function loadParentProfile() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/getChildId"
      );
      setChildProfile(result.data);
      console.log("child profile:", result.data);
    } catch (error) {
      console.error("Error loading parentProfile:", error);
    }
  }
  const myProfile = childProfile.find((profile) => profile);
  const handleInputChange = (event) => {
    const message = event.target.value;
    setTypedMessage(message);
    setShowSendButton(message.trim().length > 0);
  };

  const save = async (event) => {
    event.preventDefault();

    if (!typedMessage) {
      return toast.error("Please fill in the field");
    }
    let url1 = `http://localhost:8081/api/v1/task_submission/send?taskid=${taskId}`;
    let url2 = `http://localhost:8081/api/v1/notify/messageNotify?taskid=${taskId}`;

    let promise1 = axios.post(url1, {
      typedMessage: typedMessage,
    });

    let promise2 = axios.post(url2, {});

    try {
      // Send both requests simultaneously using Promise.all()
      Promise.all([promise1, promise2]);
      toast.success("Message Sent Successfully");
      console.log("Message sent:", typedMessage);
      setTypedMessage("");
      setMessageSent(true);
      setSentMessage(typedMessage); // Set the sent message
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }

      toast.error("Failed to send message");
    }
    update();
  };
  async function update(event) {
    try {
      await axios.put(`http://localhost:8081/api/v1/task/edit/${taskId}`, {
        status: "Completed",
      });

      // If the update is successful, display a success message
      toast.success("Task details edited");
      // Reload the page
      window.location.reload();
    } catch (error) {
      // If the update fails, display an error message
      toast.error("Failed to update task details");
      console.error("Error updating task details:", error);
    }
  }

  return (
    <div>
      {submission.some((sub) => sub.taskid === taskId && sub.typedMessage) ? (
        <div className="text-green-500">
          <Typography variant="h5" color="black" className="mb-3 ml-4 mt-8">
            Message you sent
          </Typography>
          <div class="mt-6 flex items-start gap-2.5">
            <div className="mt-1.5 flex">
              {myProfile && (
                <>
                  <img
                    className="mt-0.5 h-8 w-8 rounded-full object-cover"
                    src={
                      myProfile.img
                        ? `data:image/jpeg;base64,${myProfile.img}`
                        : "/img/user.png"
                    }
                    alt=""
                  />
                </>
              )}
            </div>
            <div class="flex flex-col gap-1">
              <div class="flex items-center space-x-2 rtl:space-x-reverse">
                {myProfile && (
                  <>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">
                      {" "}
                      {myProfile.name}
                    </span>
                  </>
                )}
              </div>
              <div class="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
                <div class="flex items-start rounded-xl bg-gray-50 p-2 dark:bg-gray-600">
                  <div class="me-2">
                    <span class="flex items-center gap-2 pb-2 text-sm font-medium text-gray-900 dark:text-white">
                      {
                        submission.find((sub) => sub.taskid === taskId)
                          ?.typedMessage
                      }
                    </span>
                  </div>
                </div>
              </div>
              <span className="flex items-center text-sm font-normal text-green-500 dark:text-green-400">
                Sent
                <svg
                  className="ml-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.293 4.293a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8 10.586l6.293-6.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={save}>
          <Typography variant="h6" color="black" className="mb-3 ml-4 mt-5">
            Write your message here
          </Typography>
          <div className="flex items-center rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-700">
            <textarea
              id="chat"
              rows="1"
              value={typedMessage}
              onChange={handleInputChange}
              className="mx-4 block block w-full w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-sm text-gray-900 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-purple-600 dark:bg-gray-700 dark:text-white dark:placeholder-purple-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              placeholder={"Your message..."}
            ></textarea>

            <button
              type="submit"
              className={`ml-auto inline-flex cursor-pointer justify-center rounded-full p-2 text-[#b089be] hover:bg-purple-50 dark:text-blue-500 dark:hover:bg-gray-600 ${
                showSendButton ? "" : "hidden"
              }`}
            >
              <svg
                className="h-5 w-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>

            <DndProvider backend={HTML5Backend}>
              <Toaster />
            </DndProvider>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatForm;
