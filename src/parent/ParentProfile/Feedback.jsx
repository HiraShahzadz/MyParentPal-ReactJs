import { Button } from "@material-tailwind/react";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { toast } from "react-hot-toast";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
function Feedback({ myProfile }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("Thanks for your feedback");
  };

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  async function save(event) {
    event.preventDefault();
    if (!name || !description) {
      return toast.error("Please fill in all fields");
    }
    try {
      await axios.post("http://localhost:8081/api/v1/feedback/save", {
        name: name,
        description: description,
        parentId: myProfile.id,
      });
      toast.success("Feedback Submitted Successfully" + myProfile.id);
      setName("");
      setDescription("");
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
      } else if (err.request) {
        console.error("Network Error:", err.request);
      } else {
        console.error("Other Error:", err.message);
      }
      toast.error("Feedback is not submitted");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="">
        <DndProvider backend={HTML5Backend}>
          <Toaster />
        </DndProvider>
        <div className="ml-2 pb-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE]">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    pattern="[A-Za-z ]+"
                    title="Please enter only letters"
                    autoComplete="task"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B089BE] sm:text-sm sm:leading-6"
                  placeholder="Write a few sentences about our website."
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <Button
            type="submit"
            onClick={save}
            className="mt-2 rounded-md bg-MyPurple-400 px-7 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Feedback;
