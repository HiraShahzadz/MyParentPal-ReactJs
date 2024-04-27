import React, { useState } from 'react';
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ChatForm = () => {
    const [typedMessage, setTypedMessage] = useState('');
    const [showSendButton, setShowSendButton] = useState(false);

    const handleInputChange = (event) => {
        const message = event.target.value;
        setTypedMessage(message);
        setShowSendButton(message.trim().length > 0);
    };

  async function save(event) {
    event.preventDefault();

    if (!typedMessage ) {
      return toast.error("Please fill in the field");
    }

    try {
      await axios.post("http://localhost:8081/api/v1/task_submission/save", {
        typedMessage: typedMessage,
      });
      toast.success("Message Sent Successfully");
      console.log('Message sent:', typedMessage);
      setTypedMessage("");
     Load();
    }
    catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }

      toast.error("Failed to send message");
    }
  }


    return (
        <form onSubmit={save}>
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
                  onClick={save}
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
    );
};

export default ChatForm;
