import React, { useState, useEffect } from "react";
import ProgressGraph from "./ProgressGraph";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

const ProgressReport = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [childProfile, setChildProfile] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [todoTasks, setTodoTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [reviewedTasks, setReviewedTasks] = useState(0);
  const [rewardedTasks, setRewardedTasks] = useState(0);
  const [penaltyTasks, setPenaltyTasks] = useState(0);

  const [taskPercentages, setTaskPercentages] = useState([0, 0, 0, 0, 0]);

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/getChildId"
      );
      setChildProfile(result.data);
      console.log("child profile:", result.data);
    } catch (error) {
      console.error("Error loading parentProfile:", error);
    }
  }

  useEffect(() => {
    if (childProfile.length > 0) {
      loadTasks();
    }
  }, [childProfile]);

  async function loadTasks() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/task/getall"
      );
      setTasksData(result.data);
      console.log("All tasks:", result.data);

      const myProfile = childProfile.find((profile) => profile);
      const filteredTasks = result.data.filter(
        (task) => task.childId === myProfile?.id
      );

      const totalTasksCount = filteredTasks.length;
      const todoTasksCount = filteredTasks.filter(
        (task) => task.status === "Todo"
      ).length;
      const completedTasksCount = filteredTasks.filter(
        (task) => task.status === "Completed"
      ).length;
      const reviewedTasksCount = filteredTasks.filter(
        (task) => task.status === "Reviewed"
      ).length;
      const rewardedTasksCount = filteredTasks.filter(
        (task) => task.status === "Rewarded"
      ).length;
      const penaltyTasksCount = filteredTasks.filter(
        (task) => task.taskTypeIs === "Penalty"
      ).length;

      setTotalTasks(totalTasksCount);
      setTodoTasks(todoTasksCount);
      setCompletedTasks(completedTasksCount);
      setReviewedTasks(reviewedTasksCount);
      setRewardedTasks(rewardedTasksCount);
      setPenaltyTasks(penaltyTasksCount);

      const getPercentage = (count) => {
        return totalTasksCount > 0
          ? ((count / totalTasksCount) * 100).toFixed(2)
          : 0;
      };

      const percentages = [
        getPercentage(todoTasksCount),
        getPercentage(completedTasksCount),
        getPercentage(reviewedTasksCount),
        getPercentage(rewardedTasksCount),
        getPercentage(penaltyTasksCount),
      ];

      setTaskPercentages(percentages);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  return (
    <div className="mt-4 rounded-lg bg-white p-5">
      <Typography variant="h5" color="blue-gray" className="ml-4 mt-5">
        Generate Report
      </Typography>
      <div className="m-8 ml-auto flex w-full flex-col gap-4 p-3 lg:max-w-[80%] lg:flex-row">
        <div className="mt-2 text-left shadow-none">
          <div className="flex flex-col space-y-4">
            <div className="flex-wrap justify-start space-x-2 space-y-2">
              {childProfile?.tags?.length > 0 ? (
                childProfile.tags.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() => handleSkillClick(skill)}
                    className={`rounded-md border px-3 py-2 ${
                      selectedSkill === skill
                        ? "bg-[#b089be] text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {skill}
                  </button>
                ))
              ) : (
                <div>
                  <a className="rounded-md border bg-gray-200 px-3 py-2 text-sm text-gray-600">
                    No tags available
                  </a>
                </div>
              )}
            </div>
            <div className="flex flex-wrap">
              {/* Left side div */}
              <div className="w-full p-4 md:w-1/2 lg:w-3/5">
                {/* Display progress report content */}
                <ProgressGraph
                  totalTasks={totalTasks}
                  todoTasks={todoTasks}
                  completedTasks={completedTasks}
                  reviewedTasks={reviewedTasks}
                  rewardedTasks={rewardedTasks}
                  penaltyTasks={penaltyTasks}
                  taskPercentages={taskPercentages}
                />
              </div>
              {/* Right side div for image */}
              <div className="flex w-full items-start justify-center rounded-lg pl-10 md:w-1/2 lg:w-2/5">
                <img src="/img/4.png" alt="Your Image" className="rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProgressReport;
