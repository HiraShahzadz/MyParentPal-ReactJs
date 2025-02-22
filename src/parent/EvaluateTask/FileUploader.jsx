import React, { useState, useEffect } from "react";
import {
  ArrowDownTrayIcon,
  MusicalNoteIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";

const FileUploader = ({ taskId }) => {
  const [taskSubmissions, setTaskSubmissions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);

  useEffect(() => {
    loadTaskSubmissions();
  }, []);

  async function loadTaskSubmissions() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/task_submission/getall"
      );
      setTaskSubmissions(
        result.data.filter((submission) => submission.taskid === taskId)
      );
    } catch (error) {
      console.error("Error loading task submissions data:", error);
    }
  }

  const openImage = (file) => {
    setSelectedImage(file);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const openFile = (file) => {
    setSelectedFile(file);
  };

  const closeFile = () => {
    setSelectedFile(null);
  };

  const handleMouseEnter = (file) => {
    setHoveredFile(file);
  };

  const handleMouseLeave = () => {
    setHoveredFile(null);
  };

  const downloadFile = (base64Data, fileName) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/octet-stream" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="">
      {taskSubmissions.map((submission) => (
        <div key={submission.id}>
          {submission.typedMessage && (
            <div className="mb-3 mt-2">
              <h1 className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6">
                {submission.typedMessage}
              </h1>
            </div>
          )}

          {submission.files && submission.fileType.startsWith("image/") && (
            <div
              className="h-32 max-h-full w-52 max-w-full cursor-pointer rounded-t-lg transition-all delay-0 duration-300"
              onClick={() => openImage(submission.files)}
            >
              <img
                className="h-32 w-52 rounded-t-lg object-cover"
                src={`data:image/jpeg;base64,${submission.files}`}
                alt={submission.fileName}
              />
            </div>
          )}

          {submission.files && submission.fileType.startsWith("video/") && (
            <div className="h-32 max-h-full w-52 max-w-full cursor-pointer rounded-t-lg transition-all delay-0 duration-300">
              <video
                className="h-32 w-52 rounded-t-lg object-cover"
                width="320"
                height="240"
                controls
              >
                <source
                  src={`data:video/mp4;base64,${submission.files}`}
                  type={submission.fileType}
                />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {submission.files && submission.fileType.startsWith("audio/") && (
            <div
              className="duration flex h-32 max-h-full w-52 max-w-full cursor-pointer items-center justify-center rounded-t-lg bg-gray-200 transition-all delay-0"
              onClick={() => openFile(submission.files)}
            >
              <MusicalNoteIcon className="h-10 w-10 rounded-md bg-red-600 object-cover p-1.5 text-white" />
            </div>
          )}

          {submission.files && (
            <div
              className="group relative mb-3 flex max-h-full w-52 max-w-full rounded-b-lg bg-white p-2 shadow-md"
              onMouseEnter={() => handleMouseEnter(submission.files)}
              onMouseLeave={handleMouseLeave}
            >
              <p className="mb-2 mr-2 block w-40 overflow-hidden pt-0.5 text-sm text-gray-900 dark:text-white">
                {submission.fileName}
              </p>
              <ArrowDownTrayIcon
                className="ml-auto h-5 w-5 flex-shrink-0 cursor-pointer rounded-sm text-MyPurple-400 shadow-sm hover:bg-gray-200 hover:shadow-md"
                stroke="currentColor"
                strokeWidth="1.2"
                onClick={() =>
                  downloadFile(submission.files, submission.fileName)
                }
              />
              {hoveredFile === submission.files && (
                <div className="max-w-240 border-tl-none border-tr-none border-br-none border-bl-none absolute left-0 top-full ml-0 mt-0 box-border cursor-default break-all rounded-md bg-gray-800 p-2 pb-0 pl-0 pr-0 pt-0 text-xs leading-5 text-white shadow-md">
                  <p className="p-1 text-sm text-white dark:text-white">
                    {submission.fileName}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {selectedFile && (
        <div
          className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-75"
          onClick={closeFile}
        >
          <XMarkIcon
            onClick={closeFile}
            className="absolute right-0 top-0 m-4 h-7 w-7 cursor-pointer text-center text-xl text-white hover:bg-gray-600 hover:shadow-md"
          />
          <audio controls className="max-h-full max-w-full cursor-pointer">
            <source
              src={`data:audio/mpeg;base64,${selectedFile}`}
              type="audio/mpeg"
            />
            Your browser does not support the audio tag.
          </audio>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-75"
          onClick={closeImage}
        >
          <XMarkIcon
            onClick={closeImage}
            className="absolute right-0 top-0 m-4 h-7 w-7 cursor-pointer text-center text-xl text-white hover:bg-gray-600 hover:shadow-md"
          />
          <img
            className="max-h-full max-w-full cursor-pointer"
            src={`data:image/jpeg;base64,${selectedImage}`}
            alt={selectedImage}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
