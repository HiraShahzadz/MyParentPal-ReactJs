import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  const handleSave = () => {
    setEditedDetails(
      { ...editedDetails, fileType: fileTypes.join(", ") },
      () => {
        handleSubmitTask(editedDetails);
        setIsEditing(false); // Switch back to non-editable mode after saving
        setSavedDetails(editedDetails); // Store the edited details upon save
      }
    );
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
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
          placeholder={placeholder}
          readOnly={!isEditing}
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
              disabled={!isEditing}
            />
            <span className="ml-2">Picture</span>
          </label>
          <label className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              value="Video"
              checked={fileTypes.includes("Video")}
              onChange={handleCheckboxChange}
              disabled={!isEditing}
            />
            <span className="ml-2">Video</span>
          </label>
          <label className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              value="Audio"
              checked={fileTypes.includes("Audio")}
              onChange={handleCheckboxChange}
              disabled={!isEditing}
            />
            <span className="ml-2">Audio</span>
          </label>
        </div>
        <input
          type="text"
          value={fileTypes.join(", ")}
          readOnly={true}
          className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
          disabled={!isEditing}
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
          {renderEditableField("time", "Select timer", "Timer")}
          <div className="mb-6">
            <label
              htmlFor="submissionDate"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Submission date
            </label>
            <DatePicker
              selected={editedDate}
              onChange={(date) => setEditedDate(date)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500"
              disabled={!isEditing}
            />
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
          {isEditing ? (
            <div className="mt-2 flex">
              <button onClick={handleSave} className="text-green-500">
                Save
              </button>
              <button onClick={handleCancel} className="ml-2 text-red-500">
                Cancel
              </button>
            </div>
          ) : (
            <button onClick={handleEdit} className="text-gray-500">
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditTask;
