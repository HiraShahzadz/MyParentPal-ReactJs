import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import Tags from "@/parent/Report/Tags";
import { SkillTasks } from "@/parent/Report/SkillTasks";
import ChildSelection from "@/parent/Report/ChildSelection";
import ProgressGraph from "@/parent/Report/ProgressGraph";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ChildReport() {
  const navigate = useNavigate();
  const [childProfileData, setChildProfileData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [Tasktag, setTasktag] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [taskCounts, setTaskCounts] = useState({
    Todo: 0,
    Completed: 0,
    Reviewed: 0,
    Rewarded: 0,
    Penalty: 0, // New state for penalty tasks
  });
  const [totalTasks, setTotalTasks] = useState(0);
  const [taskPercentages, setTaskPercentages] = useState({
    Todo: 0,
    Completed: 0,
    Reviewed: 0,
    Rewarded: 0,
    Penalty: 0,
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
    loadChildProfileData();
    loadTasks();
  }, []);

  useEffect(() => {
    updateFilteredTasks();
  }, [selectedChildId, Tasktag, tasksData]);

  useEffect(() => {
    updateTaskCounts();
  }, [filteredTasks]);

  useEffect(() => {
    calculateTotalTasks();
  }, [taskCounts]);

  useEffect(() => {
    calculateTaskPercentages();
  }, [taskCounts, totalTasks]);

  async function loadChildProfileData() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/get-child"
      );
      setChildProfileData(result.data);
    } catch (error) {
      console.error("Error loading child profile data:", error);
    }
  }

  async function loadTasks() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/task/getall"
      );
      setTasksData(result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  const updateFilteredTasks = () => {
    const filtered = tasksData.filter((task) => {
      if (selectedChildId !== null && Tasktag !== null) {
        return (
          task.childId === selectedChildId &&
          task.tasktag &&
          task.tasktag.includes(Tasktag)
        );
      } else if (selectedChildId !== null) {
        return task.childId === selectedChildId;
      } else if (Tasktag !== null) {
        return task.tasktag && task.tasktag.includes(Tasktag);
      } else {
        return true;
      }
    });

    setFilteredTasks(filtered);
  };

  const updateTaskCounts = () => {
    const counts = {
      Todo: 0,
      Completed: 0,
      Reviewed: 0,
      Rewarded: 0,
      Penalty: 0, // Initialize penalty count
    };

    filteredTasks.forEach((task) => {
      counts[task.status]++;
      if (task.taskTypeIs === "Penalty") {
        counts.Penalty++; // Increment penalty count
      }
    });

    setTaskCounts(counts);
  };

  const calculateTotalTasks = () => {
    const total = Object.values(taskCounts).reduce(
      (acc, count) => acc + count,
      0
    );
    setTotalTasks(total);
  };

  const calculateTaskPercentages = () => {
    if (totalTasks === 0) {
      setTaskPercentages({
        Todo: 0,
        Completed: 0,
        Reviewed: 0,
        Rewarded: 0,
        Penalty: 0,
      });
    } else {
      const percentages = {
        Todo: (taskCounts.Todo * 100) / totalTasks,
        Completed: (taskCounts.Completed * 100) / totalTasks,
        Reviewed: (taskCounts.Reviewed * 100) / totalTasks,
        Rewarded: (taskCounts.Rewarded * 100) / totalTasks,
        Penalty: (taskCounts.Penalty * 100) / totalTasks, // Calculate penalty percentage
      };
      setTaskPercentages(percentages);
    }
  };

  const filterTasksByChild = (childId) => {
    setSelectedChildId(childId);
  };

  return (
    <div className="mb-8 mt-9 flex flex-col gap-12">
      <Card>
        <div className=" ml-6 mr-6 ">
          <div className="mb-1 mt-6  w-full pr-10">
            <div className="text-left text-lg font-bold text-black">
              Child Progress Report
            </div>
          </div>
          <div className="mt-4 flex">
            <Tags
              childProfileData={childProfileData}
              setTasktag={setTasktag}
              selectedChildId={selectedChildId}
            />
            <div className="mb-2 ml-3">
              <ChildSelection
                childProfileData={childProfileData}
                setChildProfileData={setChildProfileData}
                filterTasks={filterTasksByChild}
              />
            </div>
          </div>

          <div className="border-b">
            <ProgressGraph
              todoCount={taskCounts.Todo}
              completedCount={taskCounts.Completed}
              reviewedCount={taskCounts.Reviewed}
              rewardedCount={taskCounts.Rewarded}
              PenalizedCount={taskCounts.Penalty}
              totalTasks={totalTasks}
              taskPercentages={{
                Todo: taskPercentages.Todo.toFixed(2),
                Completed: taskPercentages.Completed.toFixed(2),
                Reviewed: taskPercentages.Reviewed.toFixed(2),
                Rewarded: taskPercentages.Rewarded.toFixed(2),
                Penalty: taskPercentages.Penalty.toFixed(2), // Pass penalty percentage
              }}
            />
          </div>
        </div>

        <CardBody className="px-0 pb-2 pt-0">
          <div className="mb-8">
            <div className="mb-1 ml-5 mt-3 flex w-full items-center justify-between pl-3 pr-10">
              <div className="text-left text-lg font-bold text-black">
                Task Summary
              </div>
            </div>

            <SkillTasks
              childProfileData={childProfileData}
              tasksData={filteredTasks}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default ChildReport;
