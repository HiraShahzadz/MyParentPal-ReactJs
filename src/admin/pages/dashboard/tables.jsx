import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { toast } from "react-hot-toast";

export function Tables() {
  const navigate = useNavigate();
  const [hoveredFile, setHoveredFile] = useState(null);
  const [queries, setQueries] = useState([]);
  const handleMouseEnter = (query) => {
    setHoveredFile(query);
  };

  const handleMouseLeave = () => {
    setHoveredFile(null);
  };
  useEffect(() => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (!email && !password) {
      // Redirect to sign-in page if email or password is missing
      navigate("/sign-in");
    }
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/user/get-all-queries"
      );
      setQueries(response.data);
    } catch (error) {
      console.error("Error fetching queries:", error);
    }
  };

  const handleResponseChange = (index, event) => {
    const newText = event.target.value;
    const updatedQueries = [...queries];
    updatedQueries[index].response = newText;
    setQueries(updatedQueries);
  };

  const handleResponseSubmit = async (index) => {
    const query = queries[index];
    const responseText = query.response;
    if (!responseText) {
      return toast.error("Empty response cannot be submitted");
    }
    if (query.status === "responded") {
      return toast.error("Response already submitted for this query");
    }
    if (!responseText.trim()) {
      toast.error("Response cannot be empty");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8081/api/v1/user/send-mail",
        {
          toEmail: query.email,
          body: responseText,
        }
      );

      if (response.status === 200) {
        console.log("Email sent successfully");
      } else {
        console.error("Failed to send email");
        toast.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email");
    }

    try {
      // Send the request to update the query response
      await axios.put(
        `http://localhost:8081/api/v1/user/update-query-status/${query.id}`,
        responseText, // Send only the response text as a string
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );

      // Fetch updated queries data
      const updatedResponse = await axios.get(
        "http://localhost:8081/api/v1/user/get-all-queries"
      );

      setQueries(updatedResponse.data);
      console.log(`Response for query ID ${query.id}: ${responseText}`);
      toast.success(`Response email sent to ${query.name}`);
    } catch (error) {
      console.error("Error updating query response:", error);
      toast.error("Failed to update query response");
    }
  };

  return (
    <div className="mb-8 mt-12 flex flex-col gap-12">
      <DndProvider backend={HTML5Backend}>
        <Toaster />
      </DndProvider>
      <Card>
        <CardHeader
          variant="gradient"
          style={{ background: "white" }}
          className="mb-8 p-6"
        >
          <Typography variant="h6" style={{ color: "#B089BE" }}>
            Queries
          </Typography>
        </CardHeader>

        <CardBody className="overflow-x-scroll px-0 pb-2 pt-0">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Name
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Email
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Query
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Date
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Status
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-50 px-5 py-3 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                  >
                    Response
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {queries.map(
                (
                  { _id, name, email, query, date, status, response },
                  index
                ) => (
                  <tr key={_id}>
                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <Typography className="text-xs font-medium text-blue-gray-600">
                        {name}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <Typography className="text-xs font-medium text-blue-gray-600">
                        {email}
                      </Typography>
                    </td>
                    <td
                      className="group relative mb-3 w-52 max-w-full border-b "
                      onMouseEnter={() => handleMouseEnter(query)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Typography className="mb-2  mr-2 block h-4 w-40 overflow-hidden pt-0.5 text-xs font-medium text-blue-gray-600 dark:text-white">
                        {query}
                      </Typography>
                      {hoveredFile === query && (
                        <div className="max-w-240 border-tl-none border-tr-none border-br-none border-bl-none absolute left-0 top-full z-20 ml-0 mt-0 box-border cursor-default break-all rounded-md bg-gray-800 p-2 pb-0 pl-0 pr-0 pt-0 text-xs leading-5 text-white shadow-md">
                          <p className="p-1 text-sm text-white dark:text-white">
                            {query}
                          </p>
                        </div>
                      )}
                    </td>

                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <Typography className="text-xs font-medium text-blue-gray-600">
                        {date}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <div
                        className={`flex items-center justify-center rounded-lg py-1  text-[11px] font-medium ${
                          status === "responded"
                            ? "bg-[#B089BE] text-[#ffffff]"
                            : "bg-gray-400 text-[#fff]"
                        }`}
                        style={{ width: "95px", height: "23px" }}
                      >
                        {status === "responded" ? "Responded" : "Pending"}
                      </div>
                    </td>

                    <td className="border-b border-blue-gray-50 px-5 py-3">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="text"
                          value={response || ""}
                          onChange={(e) => handleResponseChange(index, e)}
                          placeholder="Type your response here..."
                          className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-xs text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          required
                        />
                        <button
                          onClick={() => handleResponseSubmit(index)}
                          className="ml-2 rounded-md bg-[#B089BE] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
