import React, { useState } from "react";
import { TagIcon } from "@heroicons/react/24/solid";

function MilstoneTags() {
  const [tagValue, setTagValue] = useState("");
  const [tags, setTags] = useState([]);

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };

  const deleteTags = (val) => {
    let reaminTags = tags.filter((t) => t !== val);
    setTags(reaminTags);
  };

  return (
    <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
      <div className="sm:col-span-full">
        <label
          htmlFor="username"
          className=" flex text-sm font-medium leading-6 text-gray-900"
        >
          <TagIcon className="m-1 h-5 w-5 text-MyPurple-400" />
          Tags
        </label>
        <div className="mt-2">
          <div className="flex flex-wrap rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE] sm:max-w-md">
            <button className="m-2 flex cursor-pointer rounded-xl border-transparent bg-MyPurple-400 p-1 pl-3 opacity-40  outline-transparent">
              Cooking
              <span className="hover ml-3 mr-1 h-6 w-6 rounded-full bg-gray-50 ">
                X
              </span>
            </button>
            {tags.map((item, index) => {
              return (
                <button
                  className="m-2 flex cursor-pointer rounded-xl border-transparent bg-MyPurple-400 bg-opacity-40 p-1 pl-3  outline-transparent"
                  key={index}
                >
                  {item}
                  <span
                    onClick={() => deleteTags(item)}
                    className="hover ml-3 mr-1 h-6 w-6 rounded-full bg-gray-50 hover:bg-gray-500 hover:text-white"
                  >
                    X
                  </span>
                </button>
              );
            })}
            <input
              type="text"
              name="task"
              id="task"
              value={tagValue}
              autoComplete="task"
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={addTags}
              className="ml-1 block flex-1  border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add skill tags"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MilstoneTags;
