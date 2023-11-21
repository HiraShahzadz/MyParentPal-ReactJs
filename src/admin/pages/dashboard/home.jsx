import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
} from "@material-tailwind/react";
import {
  ClockIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/admin/widgets/cards";
import { StatisticsChart } from "@/admin/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  ordersOverviewData,
} from "@/admin/data";

// Sample user data
const userData = [
  { id: 1, email: "user1@example.com",  role: "Parent" },
  { id: 2, email: "user2@example.com", role: "Child" },
  { id: 3, email: "user3@example.com",  role: "Child" },
  { id: 4, email: "user4@example.com",  role: "Parent" },
  { id: 5, email: "user5@example.com", role: "Child" },
  // Add more user data as needed
];

const UserTable = () => (
  <div className="mb-6 md:mb-0 md:col-span-1">
    <Card>
      <CardHeader variant="gradient" style={{ background: "white"}} className="mb-8 p-6">
        <Typography variant="h6" style={{ color: '#B089BE' }}>
          User Report
        </Typography>
      </CardHeader>

      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Id", "Email", "Role"].map((el) => (
                <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                  <Typography variant="small" className="text-[12px] font-bold uppercase text-black">
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userData.map(({ id, email, password, role }) => (
              <tr key={id}>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                    {id}
                  </Typography>
                </td>
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
                    {email}
                  </Typography>
                </td>
               
                <td className="py-3 px-5 border-b border-blue-gray-50">
                  <Typography variant="small" className="text-xs font-medium text-blue-gray-600">
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

export function Home() {
  return (
    <div className="mt-12 ">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3 ">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white ",
            })}
          />
        ))}
      </div>
    
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
  {statisticsChartsData.map((props) => (
    <StatisticsChart
      key={props.title}
      {...props}
      footer={
        <Typography
          variant="small"
          className="flex items-center font-normal text-blue-gray-600"
        >
          <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
          &nbsp;{props.footer}
        </Typography>
      }
    />
  ))}
</div>


      <div className="mb-6 grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-1">
       
      </div>

      <div className="mb-12 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-1">
        <UserTable />
      </div>
    </div>
  );
}

export default Home;
