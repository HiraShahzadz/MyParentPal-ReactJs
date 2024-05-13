import React, { useState, useEffect } from "react";
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
import ReassignTasks from "./ReassignTasks";

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
  const handleReassignTaskClick = (task) => {
    setShowModal(task);
  };
  const [taskid, setId] = useState("");
  async function DeleteTask(taskid) {
    await axios.delete("http://localhost:8081/api/v1/task/delete/" + taskid);
    toast("Task removed", { icon: "💀" });

    window.location.reload();
  }
  const [taskDetailsToShow, setTaskDetailsToShow] = useState(null); //taskdetailmodel
  const handleMoreInfoClick = (task) => {
    setTaskDetailsToShow(task);
  };

  const handleCloseTaskDetails = () => {
    setTaskDetailsToShow(null);
    setShowModal(null);
  };
  const [childProfileData, setChildProfileData] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get(
      "http://localhost:8081/api/v1/user/get-child"
    );
    setChildProfileData(result.data);
    console.log(result.data);
  }

  return (
    <div
      ref={drag}
      className={` relative mb-4 cursor-grab rounded-md p-4 shadow-md ${
        isDragging ? "opacity-25" : "opacity-100"
      }`}
    >
      <div className="flex">
        <img className=" mr-2 mt-1 h-4 w-4 " src="/img/task.png" alt="" />
        <p
          className="text-black hover:underline"
          onClick={() =>
            handleMoreInfoClick({
              id: task.id,
              title: task.title,
              image: task.image,
              description: task.description,
              reward: task.points,
              details: task.details,
            })
          }
        >
          {task.taskname}
        </p>
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
              <MenuItem onClick={() => DeleteTask(task._id)}>Delete</MenuItem>
              <div className="border-b border-gray-900 border-opacity-10"></div>

              <MenuItem
                onClick={() =>
                  handleMoreInfoClick({
                    id: task.id,
                    title: task.title,
                    image: task.image,
                    description: task.description,
                    reward: task.points,
                    details: task.details,
                  })
                }
              >
                Edit
              </MenuItem>
              <div className="border-b border-gray-900 border-opacity-10"></div>
              <MenuItem
                onClick={() =>
                  handleReassignTaskClick({
                    id: task.id,
                    title: task.title,
                    image: task.image,
                    description: task.description,
                    reward: task.points,
                    details: task.details,
                  })
                }
              >
                Reassign
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        {taskDetailsToShow && (
          <EditTask
            task={task}
            selectedTaskDetails={taskDetailsToShow}
            handleCloseTaskDetails={handleCloseTaskDetails}
          />
        )}

        {showModal && (
          <ReassignTasks
            task={task}
            selectedTaskDetails={showModal}
            handleCloseTaskDetails={handleCloseTaskDetails}
          />
        )}
      </div>
      <div className="flex">
        <p className="mr-3 mt-7 text-xs text-black ">{task.taskdate}</p>
        {task.taskTypeIs === "Penalty" && (
          <div className="mt-6 rounded-full bg-[#f2d3ff]">
            <p className="pl-3 pr-3 text-sm text-black">{task.taskTypeIs}</p>
          </div>
        )}

        <div className="absolute bottom-4 right-1">
          {childProfileData.map(({ id, img, role }, index) => {
            // Assuming task is defined and childId is accessible
            if (id === task.childId) {
              return (
                <img
                  key={id} // Ensure each element in the array has a unique key
                  className="mr-2 mt-1 h-6 w-6 rounded-full object-cover"
                  src={img ? `data:image/jpeg;base64,${img}` : "/img/userc.png"}
                  alt=""
                />
              );
            } else {
              return null; // If the id doesn't match, return null
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default Task;
