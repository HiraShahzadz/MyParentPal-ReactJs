import React from "react";
import { TagIcon } from "@heroicons/react/24/solid";

function CheatTags({ childtags, setChildtags }) {
  const addTags = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      setChildtags([...childtags, e.target.value]);
      e.target.value = "";
    }
  };

  const deleteTags = (val) => {
    const remainingTags = childtags.filter((t) => t !== val);
    setChildtags(remainingTags);
  };

  return (
    <div className="mt-4 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
      <div className="sm:col-span-full">
        <label
          htmlFor="username"
          className="flex text-sm font-medium leading-6 text-gray-900"
        >
          <TagIcon className="m-1 h-5 w-5 text-MyPurple-400" />
          Cheat Tags
        </label>
        <div className="mt-2">
          <div className=" flex flex-wrap rounded-md bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[#B089BE] ">
            <button className="m-2 flex cursor-pointer rounded-xl border-transparent bg-MyPurple-400 bg-opacity-40 p-1 pl-3 text-gray-500 outline-transparent">
              Jungle Tidy-Up
              <span className="hover ml-3 mr-1 h-6 w-6 rounded-full bg-gray-50 pt-0.5 ">
                X
              </span>
            </button>
            {childtags.map((item, index) => (
              <button
                className="m-2 flex cursor-pointer rounded-xl border-transparent bg-MyPurple-400 bg-opacity-40 p-1 pl-3  outline-transparent"
                key={index}
              >
                {item}
                <span
                  onClick={() => deleteTags(item)}
                  className="hover ml-3  mr-1 h-6 w-6 rounded-full bg-gray-50 pt-0.5 hover:bg-gray-500 hover:text-white"
                >
                  X
                </span>
              </button>
            ))}
            <input
              type="text"
              name="task"
              id="task"
              autoComplete="task"
              onKeyDown={addTags}
              className="ml-1 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add cheat tags"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheatTags;
