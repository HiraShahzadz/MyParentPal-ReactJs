import React, { useState, useEffect } from "react";
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
import axios from "axios";

function ReassignTasks({ task, selectedTaskDetails, handleCloseTaskDetails }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({
    title: task.taskname,
    details: task.taskdescription,
    reward: task.rewardname,
    fileType: task.taskfiletype,
    tags: task.tasktag,
    taststatus: "Todo",
    assignee: task.taskassignee,
    type: task.tasktype,
    myChildId: task.childId,
  });
  const [editedDate, setEditedDate] = useState(new Date(task.taskdate));
  const defaultFileTypes = task.taskfiletype
    ? task.taskfiletype.map((item) => item.trim())
    : [];
  const [fileTypes, setFileTypes] = useState(defaultFileTypes);
  const [savedDetails, setSavedDetails] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const [taskdate, setTaskdate] = useState(task.taskdate);
  const [tasktime, setTasktime] = useState(task.tasktime);
  async function reassign(event) {
    event.preventDefault();
    if (
      !editedDetails.title ||
      !editedDetails.details ||
      !editedDetails.reward
    ) {
      return toast.error("Please fill in all fields");
    }
    if (!taskdate) {
      return toast.error("Please select the submission date");
    }
    if (!tasktime) {
      return toast.error("Please select the submission time");
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

    try {
      if (
        editedDetails.title.length > 3 &&
        editedDetails.title.length < 15 &&
        editedDetails.details.length > 20 &&
        editedDetails.details.length < 200 &&
        editedDetails.reward.length > 3
      ) {
        let url1 = "http://localhost:8081/api/v1/task/reassign";
        let url2 = "http://localhost:8081/api/v1/notify/assigntaskNotification";

        let promise1 = axios.post(url1, {
          taskname: editedDetails.title,
          taskdescription: editedDetails.details,
          rewardname: editedDetails.reward,
          status: editedDetails.taststatus,
          taskdate: taskdate,
          tasktime: tasktime,
          tasktag: editedDetails.tags,
          taskfiletype: fileTypes,
          taskassignee: editedDetails.assignee,
          tasktype: editedDetails.type,
          childId: editedDetails.myChildId,
        });

        let promise2 = axios.post(url2, {
          taskname: editedDetails.title,
          childId: editedDetails.myChildId,
        });
        Promise.all([promise1, promise2]);
        toast.success("Task is re-assign successfully");
        // Update the saved details state with the edited details
        setSavedDetails({
          taskname: editedDetails.title,
          taskdescription: editedDetails.details,
          rewardname: editedDetails.reward,
          status: editedDetails.taststatus,
          taskdate: taskdate,
          tasktime: tasktime,
          tasktag: editedDetails.tags,
          taskassignee: editedDetails.assignee,
          tasktype: editedDetails.type,
          childId: editedDetails.myChildId,
          taskfiletype: fileTypes.join(", "),
        });
        // Switch back to non-editable mode after saving
        setIsEditing(false);
      } else if (editedDetails.title.length <= 3) {
        return toast.error("A task must have more than 3 characters");
      } else if (editedDetails.title.length >= 15) {
        return toast.error("A task must not be more than 15 characters");
      }
      if (editedDetails.details.length <= 20) {
        return toast.error(
          "Description should have a minimum of 20 characters"
        );
      }

      if (editedDetails.details >= 200) {
        return toast.error(
          "Description should have a maximum of 200 characters"
        );
      }
      if (editedDetails.reward.length <= 3) {
        return toast.error("Reward name should contain more then 3 characters");
      }
      window.location.reload();
    } catch (err) {
      return toast.error("Task is not reassign", err);
    }
  }

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
          <label className="mr-4 inline-flex items-center">
            <input
              type="checkbox"
              value="Text"
              checked={fileTypes.includes("Text")}
              onChange={handleCheckboxChange}
              className="border-gray-300 text-MyPurple-400 focus:ring-MyPurple-400"
            />
            <span className="ml-2">Text</span>
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

        <div className="flex justify-end">
          <div className="mt-2 flex">
            <button
              type="submit"
              onClick={reassign}
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
}

export default ReassignTasks;
