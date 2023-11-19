import React from "react";
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

function Task({ task, tasks, setTasks }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log(isDragging);

  const handleRemove = (id) => {
    const fTasks = tasks.filter((t) => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(fTasks));
    setTasks(fTasks);
    toast("Task removed", { icon: "💀" });
  };

  return (
    <div
      ref={drag}
      className={`relative mt-8 cursor-grab rounded-md p-4 shadow-md ${
        isDragging ? "opactiy-25" : "opactiy-100"
      }`}
    >
      <p>{task.name}</p>
      <div className="absolute bottom-3 right-1">
        <Menu placement="left-start">
          <MenuHandler>
            <IconButton size="sm" variant="text" color="blue-gray">
              <EllipsisVerticalIcon
                strokeWidth={3}
                fill="currenColor"
                className="h-6 w-6"
              />
            </IconButton>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => handleRemove(task.id)}>Delete</MenuItem>
            <div className="border-b-solid border-b border-b-gray-200"></div>
            <MenuItem>Edit</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Task;
