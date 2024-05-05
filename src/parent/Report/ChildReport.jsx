import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import Tags from "@/parent/Report/Tags";
import { SkillTasks } from "@/parent/Report/SkillTasks";
import ChildSelection from "@/parent/Report/ChildSelection";
import ProgressGraph from "@/parent/Report/ProgressGraph";
import axios from "axios";
export function ChildReport() {
  const [childProfileData, setChildProfileData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tasksData, setTasksData] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [Tasktag, setTasktag] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    loadChildProfileData();
    loadTasks();
  }, []);

  async function loadChildProfileData() {
    try {
      const result = await axios.get(
        "http://localhost:8081/api/v1/user/get-child"
      );
      setChildProfileData(result.data);
      console.log("Child profile data:", result.data);
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
      console.log("All tasks:", result.data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }

  useEffect(() => {
    if (selectedChildId !== null && Tasktag !== null) {
      const filtered = tasksData.filter(
        (task) =>
          task.childId === selectedChildId &&
          task.tasktag &&
          task.tasktag.includes(Tasktag) &&
          isTaskChildIdInProfileData(task.childId)
      );
      setFilteredTasks(filtered);
    } else if (selectedChildId !== null) {
      const filtered = tasksData.filter(
        (task) =>
          task.childId === selectedChildId &&
          isTaskChildIdInProfileData(task.childId)
      );
      setFilteredTasks(filtered);
    } else if (Tasktag !== null) {
      const filtered = tasksData.filter(
        (task) =>
          task.tasktag &&
          task.tasktag.includes(Tasktag) &&
          isTaskChildIdInProfileData(task.childId)
      );
      setFilteredTasks(filtered);
    } else {
      const filtered = tasksData.filter((task) =>
        isTaskChildIdInProfileData(task.childId)
      );
      setFilteredTasks(filtered);
    }
  }, [selectedChildId, Tasktag, tasksData, childProfileData]);

  // Helper function to check if task's child ID exists in childProfileData
  const isTaskChildIdInProfileData = (taskId) => {
    return childProfileData.some((child) => child.id === taskId);
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
            <ProgressGraph />
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
