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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import EditTask from "./EditTask"; // Import your EditTask component

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
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

  return (
    <div
      ref={drag}
      className={` relative mt-8 cursor-grab rounded-md p-4 shadow-md ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <div className="flex">
        <img className=" mr-2 mt-1 h-4 w-4 " src="/img/task.png" alt="" />
        <p className="text-black hover:underline">{task.name}</p>
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
              <MenuItem onClick={() => handleRemove(task.id)}>Delete</MenuItem>
              <div className="border-b border-gray-900 border-opacity-10"></div>
              <MenuItem onClick={() => setShowModal(true)}>Edit</MenuItem>
            </MenuList>
          </Menu>
        </div>

        {showModal && (
          <EditTask task={task} tasks={tasks} onClose={setShowModal} />
        )}
      </div>
      <div className="flex">
        <p className="ml-0 mt-7 text-xs text-black ">5-2-2023</p>
        <div className="absolute bottom-4 right-1">
          <img
            className="mr-2 mt-1 h-6 w-6 rounded-full"
            src="/img/men.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Task;
