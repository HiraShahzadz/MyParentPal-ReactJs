import React, { useState, useEffect } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/admin/widgets/cards";
import { StatisticsChart } from "@/admin/widgets/charts";
import { statisticsCardsData, statisticsChartsData } from "@/admin/data";
import { dailySalesChart } from "@/admin/data/statistics-charts-data";

export function Home() {
  const [userCounts, setUserCounts] = useState({
    totalUsers: 0,
    parentUsers: 0,
    childUsers: 0,
  });

  useEffect(() => {
    fetchUserCounts();
  }, []);

  const fetchUserCounts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/user/count-users"
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch user counts: ${response.status}`);
      }
      const data = await response.json();
      setUserCounts({
        totalUsers: data.totalUsers,
        parentUsers: data.parentUsers,
        childUsers: data.childUsers,
      });
    } catch (error) {
      console.error("Error fetching user counts:", error);
    }
  };

  const UserTable = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      fetchUserData();
    }, []);

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/api/v1/user/get-all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        const userDataWithId = data.map((user, index) => ({
          ...user,
          id: index + 1,
          age: user.role === "parent" ? "No Data" : calculateAge(user.dob),
        }));
        setUserData(userDataWithId);
        updateChartAgeGroups(userDataWithId); // Moved here to ensure userData is set
        updateChartLocationData(userDataWithId);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    const updateChartAgeGroups = (userData) => {
      try {
        const ageGroups = Array(9).fill(0);
        userData.forEach((user) => {
          const age = calculateAge(user.dob);
          if (age >= 1 && age <= 10) {
            ageGroups[0]++;
          } else if (age >= 12 && age <= 20) {
            ageGroups[1]++;
          } else if (age >= 21 && age <= 30) {
            ageGroups[2]++;
          } else if (age >= 31 && age <= 40) {
            ageGroups[3]++;
          } else if (age >= 41 && age <= 50) {
            ageGroups[4]++;
          } else if (age >= 51 && age <= 60) {
            ageGroups[5]++;
          } else if (age >= 61 && age <= 70) {
            ageGroups[6]++;
          } else if (age >= 71 && age <= 80) {
            ageGroups[7]++;
          } else if (age >= 81 && age <= 90) {
            ageGroups[8]++;
          }
        });
        const updatedChart = { ...dailySalesChart };
        updatedChart.series[0].data = ageGroups;
        statisticsChartsData[1].chart = updatedChart;
        // Remove window.dispatchEvent(new Event("resize"));
      } catch (error) {
        console.error("Error fetching age group data:", error);
      }
    };

    const updateChartLocationData = (userData) => {
      try {
        const locationGroups = Array(5).fill(0); // Assuming there are two regions: Punjab and KPK
        userData.forEach((user) => {
          if (user.location === "Punjab") {
            locationGroups[0]++;
          } else if (user.location === "Khyber Pakhtunkhwa") {
            locationGroups[1]++;
          } else if (user.location === "Sindh") {
            locationGroups[2]++;
          } else if (user.location === "Balochistan") {
            locationGroups[3]++;
          } else if (user.location === "Islamabad") {
            locationGroups[4]++;
          }
        });
        const updatedChart = { ...statisticsChartsData[0].chart };
        updatedChart.series[0].data = locationGroups;
        statisticsChartsData[0].chart = updatedChart;
        window.dispatchEvent(new Event("resize"));
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    return (
      <div className="mb-6 md:col-span-1 md:mb-0">
        <Card>
          <CardHeader
            variant="gradient"
            style={{ background: "white" }}
            className="mb-8 p-6"
          >
            <Typography variant="h6" style={{ color: "#000000" }}>
              User Report
            </Typography>
          </CardHeader>

          <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Id", "Email/Username", "Role"].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 px-5 py-3 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[12px] font-bold uppercase text-blue-gray-600"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {userData.map(({ id, email, role }) => (
                  <tr key={id}>
                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {id}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <Typography
                        variant="small"
                        className="text-xs font-medium text-blue-gray-600"
                      >
                        {role}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    );
  };

  return (
    <div className="mt-12 ">
      <div className="mb-12 grid gap-x-6 gap-y-10  md:grid-cols-2 xl:grid-cols-3">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }, index) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            value={
              index === 0
                ? userCounts.totalUsers
                : index === 1
                ? userCounts.parentUsers
                : index === 2
                ? userCounts.childUsers
                : ""
            }
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white bg-MyPurple-400",
            })}
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-2 ">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600 "
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-1"></div>

      <div className="mb-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 xl:grid-cols-1">
        <UserTable />
      </div>
    </div>
  );
}

export default Home;
