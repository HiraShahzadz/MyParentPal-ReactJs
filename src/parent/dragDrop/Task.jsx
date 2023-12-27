import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDrag } from "react-dnd";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import axios from "axios";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import EditTask from "./EditTask"; // Import your EditTask component

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task removed", { icon: "💀" });
  };

  const [showModal, setShowModal] = useState(false);
  const [taskid, setId] = useState("");
  async function DeleteStudent(taskid) {
    await axios.delete("http://localhost:8080/api/v1/task/delete/" + taskid);
    toast("Task removed", { icon: "💀" });

    window.location.reload();
  }
  const [taskDetailsToShow, setTaskDetailsToShow] = useState(null); //taskdetailmodel
  const handleMoreInfoClick = (task) => {
    setTaskDetailsToShow(task);
  };

  const handleCloseTaskDetails = () => {
    setTaskDetailsToShow(null);
  };
  return (
    <div
      ref={drag}
      className={` relative mb-8 cursor-grab rounded-md p-4 shadow-md ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <div className="flex">
        <img className=" mr-2 mt-1 h-4 w-4 " src="/img/task.png" alt="" />
        <p className="text-black hover:underline">{task.taskname}</p>
        <div className="absolute right-1">
          <Menu placement="left-start">
            <MenuHandler>
              <IconButton size="sm" variant="text" color="blue-gray">
                <EllipsisVerticalIcon
                  strokeWidth={2}
                  fill="black"
                  stroke="black"
                  className="h-6 w-6"
                />
              </IconButton>
            </MenuHandler>
            <MenuList className="text-black">
              <MenuItem onClick={() => DeleteStudent(task._id)}>
                Delete
              </MenuItem>
              <div className="border-b border-gray-900 border-opacity-10"></div>
              <MenuItem
                onClick={() =>
                  handleMoreInfoClick({
                    id,
                    title,
                    image,
                    description: description.toLocaleDateString(),
                    reward,
                    details,
                  })
                }
              >
                Edit
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        {taskDetailsToShow && (
          <EditTask
            selectedTaskDetails={taskDetailsToShow}
            handleCloseTaskDetails={handleCloseTaskDetails}
          />
        )}
      </div>
      <div className="flex">
        <p className="ml-0 mt-7 text-xs text-black ">{task.taskdate}</p>
        <div className="absolute bottom-4 right-1">
          <img
            className="mr-2 mt-1 h-6 w-6 rounded-full"
            src="/img/userc.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Task;
