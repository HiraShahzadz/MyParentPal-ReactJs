import React from "react";
import { Button, Typography } from "@material-tailwind/react";

export function EditTask(props) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4 text-gray-800">
          Do you really want to delete this task?
        </p>
        <div className="flex justify-end">
          <Button
            onClick={() => props.onClose(false)}
            className="mr-2 mt-9 rounded-md bg-MyPurple-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
          >
            Yes
          </Button>
          <Button
            onClick={() => props.onClose(false)}
            className="mt-9 rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white"
          >
            No
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
