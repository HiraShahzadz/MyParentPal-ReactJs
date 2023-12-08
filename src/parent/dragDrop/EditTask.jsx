import React from "react";
import { Typography } from "@material-tailwind/react";

export function EditTask(props) {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <p className="mb-4 text-gray-800">
          This is your modal content. Replace it with what you want to display.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => props.onClose(false)}
            className="rounded-lg bg-purple-400 px-4 py-2 text-white hover:bg-purple-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
