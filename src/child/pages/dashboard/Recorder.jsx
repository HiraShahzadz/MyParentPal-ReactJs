import React, { useState, useEffect } from 'react';
import voiceIcon from '/img/voice.png'; // Import the image

const ChatForm = () => {
    const [typedMessage, setTypedMessage] = useState('');
    const [showSendButton, setShowSendButton] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedTime, setRecordedTime] = useState(0);

    const handleInputChange = (event) => {
        const message = event.target.value;
        setTypedMessage(message);
        setShowSendButton(message.trim().length > 0);
    };

    const handleSendMessage = (event) => {
        event.preventDefault();
        console.log('Message sent:', typedMessage);
        setTypedMessage('');
        setShowSendButton(false);
    };

    const startRecording = () => {
        setIsRecording(true);
        // Start recording logic here (e.g., using Web Audio API)
    };

    const stopRecording = () => {
        setIsRecording(false);
        // Stop recording logic here
    };

    useEffect(() => {
        if (isRecording) {
            // Update the recorded time every second
            const interval = setInterval(() => {
                setRecordedTime((prevTime) => prevTime + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isRecording]);

    const showRecordIcon = typedMessage.trim().length === 0;

    return (
        <form onSubmit={handleSendMessage}>
            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                {/* Microphone icon or Arrow icon based on typed message */}
                <textarea
                    id="chat"
                    rows="1"
                    value={typedMessage}
                    onChange={handleInputChange}
                    className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full resize-none dark:bg-gray-700 dark:border-purple-600 dark:placeholder-purple-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 focus:outline-none"
                    placeholder={isRecording ? `Recording: ${recordedTime}s` : 'Your message...'}
                ></textarea>

                {!showRecordIcon ? (
                    <button
                        type="submit"
                        className="inline-flex justify-center p-2 text-[#b089be] rounded-full cursor-pointer hover:bg-purple-50 dark:text-blue-500 dark:hover:bg-gray-600 ml-auto"
                    >
                        {/* Your arrow icon */}
                        <svg
                            className="w-5 h-5 rotate-90 rtl:-rotate-90"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20"
                        >
                            {/* Replace with your arrow icon */}
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            type="button"
                            className={`text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 ${isRecording ? 'w-10 h-10' : 'w-8 h-8'}`}
                            onClick={() => {
                                isRecording ? stopRecording() : startRecording();
                            }}
                        >
                            {/* Your record icon */}
                            <img
                                src={voiceIcon} // Use the imported image source
                                alt="Voice"
                                className="w-8 h-8" 
                            />
                            <span className="sr-only">Recorder</span>
                        </button>

                        {isRecording && (
                            <div className="absolute top-0 right-0 mt-3 mr-3 w-2 h-2 rounded-full bg-red-500"></div>
                        )}
                    </div>
                )}

                {/* Placeholder for emoji icon */}
                {!showRecordIcon && (
                    <button
                        type="button"
                        className="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                        {/* Your emoji icon */}
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            {/* Replace with your emoji icon */}
                            {/* ... */}
                        </svg>
                        <span className="sr-only">Add emoji</span>
                    </button>
                )}
            </div>
        </form>
    );
};

export default ChatForm;
