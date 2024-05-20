import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDrop } from "react-dnd";
import Task from "@/parent/dragDrop/Task";
import Header from "@/parent/dragDrop/Header";
import { StatisticsCard } from "@/parent/widgets/cards";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

function Section({
  status,
  tasks,
  setTasks,
  todos,
  completed,
  reviewed,
  rewarded,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id), // Change the argument name
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let tasksToMap = todos;

  if (status === "Completed") {
    text = "Completed";
    tasksToMap = completed;
  }

  if (status === "Reviewed") {
    text = "Reviewed";
    tasksToMap = reviewed;
  }

  if (status === "Rewarded") {
    text = "Rewarded";
    tasksToMap = rewarded;
  }

  const addItemToSection = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8081/api/v1/task/edit/${id}`,
        { status }
      );

      if (response.status === 200) {
        setTasks((prev) => {
          const mTasks = prev.map((t) => {
            if (t._id === id) {
              return { ...t, status: status };
            }

            return t;
          });

          localStorage.setItem("tasks", JSON.stringify(mTasks));

          toast.success("Task status changed");

          return mTasks;
        });
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("An error occurred while updating task status");
    }
  };

  return (
    <Card
      ref={drop}
      className={`mt-4 rounded-md p-2 ${isOver ? "bg-blue-gray-200" : ""}`}
    >
      <div className=" pl-4 pr-4 pt-4 ">
        <Header
          className="h-fit w-fit"
          text={text}
          count={tasksToMap?.length}
        />
      </div>
      <CardBody className="max-h-96 overflow-y-auto p-4 pt-[-20px]">
        {tasksToMap.length === 0 && (
          <div className="mt-5 items-center justify-center">
            <p className="text-center text-sm">No task in this section</p>
            <div className="flex items-center justify-center">
              <FontAwesomeIcon icon={faExclamationCircle} />
            </div>
          </div>
        )}
        {tasksToMap?.length > 0 &&
          tasksToMap.map((task) => (
            <Task
              key={task._id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
      </CardBody>
    </Card>
  );
}

export default Section;
