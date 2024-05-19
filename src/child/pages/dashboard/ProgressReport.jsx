import React, { useState, useEffect } from "react";
import ProgressGraph from './ProgressGraph';
import { Typography } from "@material-tailwind/react";
import axios from "axios";

const ProgressReport = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [childProfile, setChildProfile] = useState([]);
    const [tasksData, setTasksData] = useState([]);

    const skillTags = ['Cooking', 'Gardening', 'Education', 'Crafts', 'Cleaning', 'Writing'];

    const handleSkillClick = (skill) => {
        setSelectedSkill(skill);
    };

    const filteredProgressReports = [
        { skill: 'Cooking', report: 'Progress report for Cooking' },
        { skill: 'Gardening', report: 'Progress report for Gardening' },
        { skill: 'Education', report: 'Progress report for Education' },
        { skill: 'Crafts', report: 'Progress report for Crafts' },
        { skill: 'Cleaning', report: 'Progress report for Cleaning' },
        { skill: 'Writing', report: 'Progress report for Writing' },
    ].filter(report => report.skill === selectedSkill);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const result = await axios.get("http://localhost:8081/api/v1/user/getChildId");
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
            const result = await axios.get("http://localhost:8081/api/v1/task/getall");
            setTasksData(result.data);
            console.log("All tasks:", result.data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    }

    const myProfile = childProfile.find(profile => profile);
    const filteredTasks = tasksData.filter(task => task.childId === myProfile?.id);
    console.log("mytask",filteredTasks);  
    return (
        <div className="p-3 bg-white mt-4 mb-8 flex flex-col lg:flex-row gap-4 rounded-lg">
            <Typography variant="h5" color="blue-gray" className="ml-4 mt-5 mb-8">
                Generate Report
            </Typography>
            <div className="pt-4 mt-10 w-full lg:max-w-[80%]">
                <div className="mt-2 shadow-none text-left">
                    <div className="flex flex-col space-y-4">
                        <div className="space-x-2 flex-wrap justify-start space-y-2">
                            {skillTags.map((skill, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSkillClick(skill)}
                                    className={`border px-3 py-1 rounded-md ${selectedSkill === skill ? 'bg-[#b089be] text-white' : 'bg-gray-200 text-gray-600'}`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap">
                            {/* Left side div */}
                            <div className="w-full md:w-1/2 lg:w-3/5 p-4">
                                {/* Display progress report content */}
                                <ProgressGraph />
                            </div>
                            {/* Right side div for image */}
                            <div className="w-full md:w-1/2 lg:w-2/5 pl-10 rounded-lg flex justify-center items-start">
                                <img
                                    src="/img/4.png"
                                    alt="Your Image"
                                    className="rounded-lg"

                                />
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressReport;
