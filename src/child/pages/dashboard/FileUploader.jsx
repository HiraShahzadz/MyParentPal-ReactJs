import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Typography } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import {
  ArrowDownTrayIcon,
  MusicalNoteIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const FileUploader = ({ taskId, filetype }) => {


  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // New state variable to track saving status
  const [isVisible, setIsVisible] = useState(true);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

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
  const [allowedTypes, setAllowedTypes] = useState([]);

  useEffect(() => {
    if (filetype && Array.isArray(filetype)) {
      setAllowedTypes(filetype);
    }
  }, [filetype]);

  const handleSubmit = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    if (!files.length) {
      return toast.error("Please add a file");
    }

    let isFileTypeValid = files.some((file) => {
      return allowedTypes.some((type) => {
        if (
          (type === "Picture" && (file.type === "image/jpeg" || file.type === "image/png")) ||
          (type === "Audio" && (file.type === "audio/mpeg" || file.type === "audio/mp3")) ||
          (type === "Video" && file.type === "video/mp4")
        ) {
          return true;
        }
        return false;
      });
    });

    if (!isFileTypeValid) {
      return toast.error("You have to upload "+ filetype + " to complete the task");
    }

    setIsSaving(true);

    try {
      const response = await axios.post(
        `http://localhost:8081/api/v1/task_submission/save?taskid=${taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Task saved successfully " + taskId);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsSaving(false);
      setIsVisible(false);
    }
  };




  const renderFile = (file) => {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    const isAudio = file.type.startsWith("audio/");

    return (
      <div className="file-container " key={file.name}>
        {isImage && (
          <>
            <div
              className="h-32 max-h-full w-52  max-w-full cursor-pointer rounded-t-lg transition-all delay-0 duration-300"
              onClick={() => openImage(file)}
            >
              <img
                className="h-32 w-52 rounded-t-lg object-cover "
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
            </div>
          </>
        )}
        {isVideo && (
          <>
            <div className=" h-32 max-h-full w-52 max-w-full cursor-pointer rounded-t-lg transition-all delay-0 duration-300">
              <video
                className="h-32 w-52 rounded-t-lg object-cover"
                width="320"
                height="240"
                controls
              >
                <source src={URL.createObjectURL(file)} type={file.type} />
                Your browser does not support the video tag.
              </video>
            </div>
          </>
        )}
        {isAudio && (
          <div
            className=" duration flex h-32 max-h-full w-52 max-w-full cursor-pointer items-center justify-center rounded-t-lg bg-gray-200 transition-all delay-0"
            onClick={() => openFile(file)}
          >
            <MusicalNoteIcon className="h-10 w-10 rounded-md bg-red-600 object-cover p-1.5 text-white" />
          </div>
        )}
        {!isImage && !isVideo && !isAudio && <p>{file.name}</p>}
        <div
          className="group relative mb-3 flex  max-h-full w-52 max-w-full rounded-b-lg bg-white p-2 shadow-md"
          onMouseEnter={() => handleMouseEnter(file)}
          onMouseLeave={handleMouseLeave}
        >
          <p className=" mb-2 mr-2 block w-40 overflow-hidden pt-0.5 text-sm text-gray-900 dark:text-white">
            {file.name}
          </p>
          <ArrowDownTrayIcon
            className="ml-auto h-5 w-5 flex-shrink-0 cursor-pointer rounded-sm text-MyPurple-400 shadow-sm hover:bg-gray-200 hover:shadow-md"
            stroke="currentColor"
            strokeWidth="1.2"
            onClick={() => downloadFile(file)}
          />
          {hoveredFile === file && (
            <div className="max-w-240 border-tl-none border-tr-none border-br-none border-bl-none absolute left-0 top-full ml-0 mt-0 box-border cursor-default break-all rounded-md bg-gray-800 p-2 pb-0 pl-0 pr-0 pt-0  text-xs leading-5 text-white shadow-md">
              <p className="p-1 text-sm text-white dark:text-white">
                {file.name}
              </p>
            </div>
          )}
        </div>

      </div>
    );
  };

  const downloadFile = (file) => {
    const url = URL.createObjectURL(new Blob([file]));
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCancel = () => {
    // Set visibility to false when cancel button is clicked
    setIsVisible(false);
    toast.error("Submission Cancelled!")
  };

  return (
    <div>
      <div className="">
        {isVisible && (
          <div>
            <Typography variant="h5" color="black" className=" ml-5 mb-3">
              Attach file here
            </Typography>
            <div
              {...getRootProps()}
              className="p-2  mb-3 w-full h-60 border-dashed border-4 border-gray-400 rounded-lg flex justify-center items-center cursor-pointer mt-5"
            >

              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}

            </div>
          </div>
        )}
        {isVisible && (
          <div className="grid gap-9 gap-x-6 gap-y-1 md:grid-cols-2 xl:grid-cols-3">
            {files.map((file) => renderFile(file))}
          </div>
        )}
        {!isSaving && isVisible && (
          <div className="flex justify-center items-center mt-2">
            <button
              className="mt-5 ml-5 text-white bg-[#b089be] hover:bg-purple-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mx-2 mb-2 sm:mb-0"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
            <button
              className="mt-5 ml-2 text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:hover:bg-gray-800 dark:focus:ring-red-900 sm:mx-2 mb-2 sm:mb-0"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div >
  );
};

export default FileUploader;