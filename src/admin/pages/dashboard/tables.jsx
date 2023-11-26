import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/admin/data";

export function Tables() {
  const [responses, setResponses] = useState({});

  const handleResponseChange = (authorName, event) => {
    const newText = event.target.value;
    setResponses((prevResponses) => ({
      ...prevResponses,
      [`${authorName}-${event.target.dataset.index}`]: newText,
    }));
  };

  const handleResponseSubmit = (authorName) => {
    const responseText = responses[authorName];
    console.log(`Response for ${authorName}: ${responseText}`);
  };

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          style={{ background: "white" }}
          className="mb-8 p-6"
        >
          <Typography variant="h6" style={{ color: "#B089BE" }}>
            Feedback and Queries
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["name", "query", "status", "date", "Response"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 px-5 py-3 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {authorsTableData.map(({ img, name, online, date }, key) => {
                const query = "Sample query text"; // Sample query text
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={img} alt={name} size="sm" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {query}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-normal text-blue-gray-500">
                        {query}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div
                        variant="gradient"
                        color={online ? "purple" : "blue-gray"}
                        value={online ? "responded" : "pending"}
                        className={`rounded-lg py-1 text-center text-[11px] font-medium ${
                          online
                            ? "bg-[#B089BE] text-[#ffffff]"
                            : "bg-gray-400 text-[#fff]"
                        }`}
                      >
                        {online ? "Responded" : "Pending"}
                      </div>
                    </td>
                    <td className={className} style={{ fontSize: "12px" }}>
                      {date}
                    </td>
                    <td className={className}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={responses[`${name}-${key}`] || ""}
                          onChange={(e) => handleResponseChange(name, e)}
                          placeholder="Type your response here..."
                          className="flex-1 text-xs"
                          data-index={key}
                        />
                        <button
                          onClick={() => handleResponseSubmit(name)}
                          className="ml-2 rounded-md bg-[#B089BE] px-3 py-1 text-white shadow-lg hover:bg-purple-400"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
