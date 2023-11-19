import React, { useEffect, useState } from "react";
import Section from "@/parent/dragDrop/Section";

function ListTasks({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);
  const [rewarded, setRewarded] = useState([]);

  useEffect(() => {
    const fTodos = tasks?.filter((task) => task.status === "todo");
    const fInProgress = tasks?.filter((task) => task.status === "inprogress");
    const fClosed = tasks?.filter((task) => task.status === "closed");
    const fRewarded = tasks?.filter((task) => task.status === "rewarded");

    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
    setRewarded(fRewarded);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed", "rewarded"];

  return (
    <div className="mb-12 grid gap-16 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-4">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
          rewarded={rewarded}
        />
      ))}
    </div>
  );
}

export default ListTasks;
