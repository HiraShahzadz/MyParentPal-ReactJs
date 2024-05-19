import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const ChatForm = ({ taskId }) => {
    
   
    const [typedMessage, setTypedMessage] = useState('');
    const [showSendButton, setShowSendButton] = useState(true);
    const [messageSent, setMessageSent] = useState(false);
    const [sentMessage, setSentMessage] = useState('');
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
      
        let promise2 = axios.post(url2, {
        });
      
        try {
          // Send both requests simultaneously using Promise.all()
           Promise.all([promise1, promise2]);
            toast.success("Message Sent Successfully");
            console.log('Message sent:', typedMessage);
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
    };

    return (
        <div>
            {submission.some(sub => sub.taskid === taskId && sub.typedMessage) ? (
                <div className="text-green-500">
                    <Typography variant="h5" color="black" className="ml-4 mt-8 mb-3">
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
                                        <span class="text-sm font-semibold text-gray-900 dark:text-white"> {myProfile.name}</span>
                                    </>
                                )}
                            </div>
                            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <div class="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
                                    <div class="me-2">
                                        <span class="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                                            {submission.find(sub => sub.taskid === taskId)?.typedMessage}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <span className="text-sm font-normal text-green-500 dark:text-green-400 flex items-center">
                                Sent
                                <svg
                                    className="ml-1 w-5 h-5"
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
                    <Typography variant="h6" color="black" className="ml-4 mt-5 mb-3">
                        Write your message here
                    </Typography>
                    <div className="flex items-center px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <textarea
                            id="chat"
                            rows="1"
                            value={typedMessage}
                            onChange={handleInputChange}
                            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full resize-none dark:bg-gray-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                            placeholder={'Your message...'}
                        ></textarea>

                        <button
                            type="submit"
                            className={`inline-flex justify-center p-2 text-[#b089be] rounded-full cursor-pointer hover:bg-purple-50 dark:text-blue-500 dark:hover:bg-gray-600 ml-auto ${showSendButton ? '' : 'hidden'}`}
                        >
                            <svg
                                className="w-5 h-5 rotate-90 rtl:-rotate-90"
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
