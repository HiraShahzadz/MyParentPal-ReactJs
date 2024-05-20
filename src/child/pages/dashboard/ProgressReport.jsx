import React, { useEffect, useState } from "react";
import ProgressGraph from "./ProgressGraph";
import { useNavigate } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import StatisticsChart from "@/child/widgets/charts/statistics-chart";
import { statisticsChartsData } from "@/child/data";
import { ClockIcon } from "@heroicons/react/24/solid";

const ProgressReport = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
  }, []);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const skillTags = [
    "Cooking",
    "Gardening",
    "Education",
    "Crafts",
    "Cleaning",
    "Writing",
  ];

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const filteredProgressReports = [
    // Replace this array with your actual progress reports
    // Include different progress reports based on different skills
    { skill: "Cooking", report: "Progress report for Cooking" },
    { skill: "Gardening", report: "Progress report for Gardening" },
    { skill: "Education", report: "Progress report for Education" },
    { skill: "Crafts", report: "Progress report for Crafts" },
    { skill: "Cleaning", report: "Progress report for Cleaning" },
    { skill: "Writing", report: "Progress report for Writing" },
  ].filter((report) => report.skill === selectedSkill);

  return (
    <div className="mb-8 mt-4 flex flex-col gap-4 rounded-lg bg-white p-3 lg:flex-row">
      <Typography variant="h5" color="blue-gray" className="mb-8 ml-4 mt-5">
        Generate Report
      </Typography>
      <div className="mt-10 w-full pt-4 lg:max-w-[80%]">
        <div className="mt-2 text-left shadow-none">
          <div className="flex flex-col space-y-4">
            <div className="flex-wrap justify-start space-x-2 space-y-2">
              {skillTags.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleSkillClick(skill)}
                  className={`rounded-md border px-3 py-1 ${
                    selectedSkill === skill
                      ? "bg-[#b089be] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap">
              {/* Left side div */}
              <div className="w-full p-4 md:w-1/2 lg:w-3/5">
                {/* Display progress report content */}
                <ProgressGraph />
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
