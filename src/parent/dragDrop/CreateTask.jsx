import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

function CreateTask({ tasks, setTasks }) {
  const [task, setTask] = useState({
    id: uuidv4(),
    name: "",
    status: "todo",
  });

  useEffect(() => {
    // Initialize tasks from localStorage or provide an empty array as initial value
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.name.length < 3) {
      return toast.error("A task must have more than 3 characters");
    }

    if (task.name.length > 100) {
      return toast.error("A task must not be more than 100 characters");
    }

    // Update tasks using the callback form to ensure proper state update
    setTasks((prevTasks) => {
      // Make sure prevTasks is always an array
      const updatedTasks = [...(prevTasks || []), task];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    toast.success("Task Created");

    // Reset the form after submission
    setTask({
      id: uuidv4(),
      name: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-slate-400 bg-slate-100 mr-4 h-12 w-64 rounded-md border-2 px-1"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <button className="h-12 rounded-md bg-cyan-500 px-4 text-white">
        Create
      </button>
    </form>
  );
}

export default CreateTask;
