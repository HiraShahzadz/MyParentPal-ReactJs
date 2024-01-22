import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CalenderInput from "../attributes/CalenderInput";
import TaskTime from "../attributes/TaskTime";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { toast } from "react-hot-toast";
const EditTask = ({ selectedTaskDetails, handleCloseTaskDetails }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    ...selectedTaskDetails,
  });
  const [editedDate, setEditedDate] = useState(
    new Date(selectedTaskDetails.description)
  );
  const defaultFileTypes = selectedTaskDetails.fileType
    ? selectedTaskDetails.fileType.split(",").map((item) => item.trim())
    : [];
  const [fileTypes, setFileTypes] = useState(defaultFileTypes);
  const [savedDetails, setSavedDetails] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const [taskdate, setTaskdate] = useState("");
  const [tasktime, setTasktime] = useState();
  const handleSave = () => {
    // Check if all required fields are filled
    if (
      !editedDetails.title ||
      !editedDetails.details ||
      !editedDetails.reward ||
      !taskdate ||
      !tasktime
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    const taskDate = new Date(taskdate);
    const currentDate = new Date();

    // Extract the date part without considering the time
    const taskDateWithoutTime = new Date(taskDate.toDateString());
    const currentDateWithoutTime = new Date(currentDate.toDateString());

    if (taskDateWithoutTime < currentDateWithoutTime) {
      return toast.error("Task submission date cannot be in the past ");
    }
    const selectedTime = new Date(taskdate + " " + tasktime);

    // Compare with the current time
    const currentTime = new Date();

    if (selectedTime <= currentTime) {
      return toast.error(
        "Task submission time cannot be in the past or present (1-24)"
      );
    }
    setEditedDetails(
      { ...editedDetails, fileType: fileTypes.join(", ") },
      () => {
        handleSubmitTask(editedDetails);
        setIsEditing(false); // Switch back to non-editable mode after saving
        setSavedDetails(editedDetails); // Store the edited details upon save
      }
    );
    toast.success("Task details edited");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedDetails({ ...selectedTaskDetails });
    setEditedDate(new Date(selectedTaskDetails.description));
    setFileTypes(defaultFileTypes);
  };

  const handleInputChange = (field, value) => {
    setEditedDetails({ ...editedDetails, [field]: value });
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedFileTypes = [...fileTypes];
    if (checked) {
      updatedFileTypes.push(value);
    } else {
      updatedFileTypes = updatedFileTypes.filter((type) => type !== value);
    }
    setFileTypes(updatedFileTypes);
  };

  const renderEditableField = (field, placeholder, label) => {
    return (
      <div className="mb-6">
        <DndProvider backend={HTML5Backend}>
          <Toaster />
        </DndProvider>
        <label
          htmlFor={field}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type="text"
          id={field}
          name={field}
          value={editedDetails[field]}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
          placeholder={placeholder}
          required
        />
      </div>
    );
  };

  const renderFileTypeField = () => {
    return (
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Submission File Type
        </label>
        <div>
          <label className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              value="Picture"
              checked={fileTypes.includes("Picture")}
              onChange={handleCheckboxChange}
              className="border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
            />
            <span className="ml-2">Picture</span>
          </label>
          <label className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              value="Video"
              checked={fileTypes.includes("Video")}
              onChange={handleCheckboxChange}
              className="border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
            />
            <span className="ml-2">Video</span>
          </label>
          <label className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              value="Audio"
              checked={fileTypes.includes("Audio")}
              onChange={handleCheckboxChange}
              className="border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
            />
            <span className="ml-2">Audio</span>
          </label>
        </div>
        <input
          type="text"
          value={fileTypes.join(", ")}
          readOnly={true}
          placeholder="File Type"
          className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
          disabled={!isEditing}
          required
        />
      </div>
    );
  };

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-[600px] rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end">
          <button
            className="focus:outline-none"
            onClick={handleCloseTaskDetails}
          >
            <FontAwesomeIcon icon={faTimes} className="text-lg text-gray-600" />
          </button>
        </div>

        <p variant="h5" className="center mb-4 text-justify text-sm text-black">
          {renderEditableField("title", "Enter Task Name", "Task Name")}
          {renderEditableField("details", "Enter Description", "Description")}
          {renderEditableField("reward", "Enter Reward", "Reward")}
          {renderFileTypeField()}
          <div className="flex">
            <div className="mt-3">
              <label
                htmlFor="about"
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Submission Date
              </label>
              <CalenderInput taskdate={taskdate} setTaskdate={setTaskdate} />
            </div>
            <div className="ml-10 mt-3">
              <label
                htmlFor="about"
                className="mb-2 block text-sm font-medium leading-6 text-gray-900"
              >
                Submission Time
              </label>
              <TaskTime tasktime={tasktime} setTasktime={setTasktime} />
            </div>
          </div>
        </p>

        {/* Display section for showing saved details */}
        {savedDetails && !isEditing && (
          <div className="mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Updated Details:</strong>
            </p>
            <ul className="text-gray-700 dark:text-gray-300">
              {Object.keys(savedDetails).map((key) => (
                <li key={key}>
                  <strong>{key}: </strong>
                  {savedDetails[key]}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end">
          <div className="mt-2 flex">
            <button
              type="submit"
              onClick={handleSave}
              className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
            >
              Save
            </button>
            <button
              onClick={handleCloseTaskDetails}
              className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
