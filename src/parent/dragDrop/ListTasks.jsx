import React, { useEffect, useState } from "react";
import Section from "@/parent/dragDrop/Section";

function ListTasks({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [reviewed, setReviewed] = useState([]);
  const [rewarded, setRewarded] = useState([]);

  useEffect(() => {
    const fTodos = tasks?.filter((task) => task.status === "todo");
    const fCompleted = tasks?.filter((task) => task.status === "completed");
    const fReviewed = tasks?.filter((task) => task.status === "reviewed");
    const fRewarded = tasks?.filter((task) => task.status === "rewarded");

    setTodos(fTodos);
    setCompleted(fCompleted);
    setReviewed(fReviewed);
    setRewarded(fRewarded);
  }, [tasks]);

  const statuses = ["todo", "completed", "reviewed", "rewarded"];

  return (
    <div className="mb-12 grid gap-16 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          completed={completed}
          reviewed={reviewed}
          rewarded={rewarded}
        />
      ))}
    </div>
  );
}

export default ListTasks;
