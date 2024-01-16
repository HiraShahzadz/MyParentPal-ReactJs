import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  ArrowDownTrayIcon,
  MusicalNoteIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredFile, setHoveredFile] = useState(null);

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

  return (
    <div className="">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className="grid gap-9 gap-x-6 gap-y-1 md:grid-cols-2 xl:grid-cols-3">
        {files.map((file) => renderFile(file))}
      </div>
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
              src={URL.createObjectURL(selectedFile)}
              type={selectedFile.type}
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
            src={URL.createObjectURL(selectedImage)}
            alt={selectedImage.name}
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
