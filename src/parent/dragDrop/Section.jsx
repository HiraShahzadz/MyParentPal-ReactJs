import React from "react";
import toast from "react-hot-toast";
import { useDrop } from "react-dnd";
import Task from "@/parent/dragDrop/Task";
import Header from "@/parent/dragDrop/Header";
import { StatisticsCard } from "@/parent/widgets/cards";
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
  inProgress,
  closed,
  rewarded,
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  let text = "Todo";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    tasksToMap = inProgress;
  }

  if (status === "closed") {
    text = "Closed";
    tasksToMap = closed;
  }

  if (status === "rewarded") {
    text = "Rewarded";
    tasksToMap = rewarded;
  }

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }

        return t;
      });

      localStorage.setItem("tasks", JSON.stringify(mTasks));

      toast("Task status changed", { icon: "😯" });
      return mTasks;
    });
  };

  return (
    <Card
      ref={drop}
      className={`rounded-md p-2 ${isOver ? "bg-blue-gray-200" : ""}`}
    >
      <CardBody className="p-4">
        <Header text={text} count={tasksToMap?.length} />
        {tasksToMap?.length > 0 &&
          tasksToMap.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))}
      </CardBody>
    </Card>
  );
}

export default Section;
