import React, { useState, useEffect } from 'react';
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Typography } from "@material-tailwind/react";

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

        try {
            await axios.post(`http://localhost:8081/api/v1/task_submission/send?taskid=${taskId}`, {
                typedMessage: typedMessage,
            });
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
            {submission.length > 0  ? (
                <div className="text-green-500">
                     <Typography variant="h5" color="black" className="ml-4 mt-8 mb-3">
                Message you sent
                </Typography>
                    <div class="flex items-start gap-2.5">
                        <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                        <div class="flex flex-col gap-1">
                            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                            </div>
                            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <div class="flex items-start bg-gray-50 dark:bg-gray-600 rounded-xl p-2">
                                    <div class="me-2">
                                        <span class="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white pb-2">
                                            <svg fill="none" aria-hidden="true" class="w-5 h-5 flex-shrink-0" viewBox="0 0 20 21">
                                                <g clip-path="url(#clip0_3173_1381)">
                                                    <path fill="#E2E5E7" d="M5.024.5c-.688 0-1.25.563-1.25 1.25v17.5c0 .688.562 1.25 1.25 1.25h12.5c.687 0 1.25-.563 1.25-1.25V5.5l-5-5h-8.75z" />
                                                    <path fill="#B0B7BD" d="M15.024 5.5h3.75l-5-5v3.75c0 .688.562 1.25 1.25 1.25z" />
                                                    <path fill="#CAD1D8" d="M18.774 9.25l-3.75-3.75h3.75v3.75z" />
                                                    <path fill="#F15642" d="M16.274 16.75a.627.627 0 01-.625.625H1.899a.627.627 0 01-.625-.625V10.5c0-.344.281-.625.625-.625h13.75c.344 0 .625.281.625.625v6.25z" />
                                                    <path fill="#fff" d="M3.998 12.342c0-.165.13-.345.34-.345h1.154c.65 0 1.235.435 1.235 1.269 0 .79-.585 1.23-1.235 1.23h-.834v.66c0 .22-.14.344-.32.344a.337.337 0 01-.34-.344v-2.814zm.66.284v1.245h.834c.335 0 .6-.295.6-.605 0-.35-.265-.64-.6-.64h-.834zM7.706 15.5c-.165 0-.345-.09-.345-.31v-2.838c0-.18.18-.31.345-.31H8.85c2.284 0 2.234 3.458.045 3.458h-1.19zm.315-2.848v2.239h.83c1.349 0 1.409-2.24 0-2.24h-.83zM11.894 13.486h1.274c.18 0 .36.18.36.355 0 .165-.18.3-.36.3h-1.274v1.049c0 .175-.124.31-.3.31-.22 0-.354-.135-.354-.31v-2.839c0-.18.135-.31.355-.31h1.754c.22 0 .35.13.35.31 0 .16-.13.34-.35.34h-1.455v.795z" />
                                                    <path fill="#CAD1D8" d="M15.649 17.375H3.774V18h11.875a.627.627 0 00.625-.625v-.625a.627.627 0 01-.625.625z" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3173_1381">
                                                        <path fill="#fff" d="M0 0h20v20H0z" transform="translate(0 .5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            {submission.find(sub => sub.taskid === taskId)?.typedMessage}
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Sent</span>
                        </div>
                    </div>
                </div>
            ) : (
                <form onSubmit={save}>
                     <Typography variant="h5" color="black" className="ml-4 mt-8 mb-3">
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
