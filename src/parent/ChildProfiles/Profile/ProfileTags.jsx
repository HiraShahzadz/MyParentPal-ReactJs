import React, { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MilstoneTags from "./MilstoneTags";
function ProfileTags() {
  const status = [
    { label: "Skills" },
    { label: "House Holds" },
    { label: "Art & Craft" },
    { label: "Religious" },
    { label: "Cooking", image: "/img/blue.png", color: "blue-50" },
  ];
  const cheattags = [
    { label: "Jungle Tidy-up" },
    { label: "Brainpower Boosts" },
    { label: "Artistry Efficiency" },
  ];
  const [tags, setTags] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [newTag, setNewTag] = useState("");
  const showPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setNewTag(""); // Clear the input when closing the popup
  };

  const saveNewTag = () => {
    // You can handle saving the new tag logic here
    console.log("Saving new tag:", newTag);

    // For simplicity, let's close the popup after saving
    closePopup();
  };
  const deleteTags = (label) => {
    // Implement your tag deletion logic here
    console.log("Deleting tag:", label);
  };
  return (
    <div>
      <div className="ml-3.5 mr-3 mt-[-40px] rounded-lg border border-gray-200 p-7 shadow-lg">
        <div className="text-left text-lg font-bold text-black">
          Milstone Tags
        </div>
        <div className=" flex flex-wrap">
          {status.map(({ label }, index) => (
            <button className="m-2 flex cursor-pointer rounded-xl border-transparent bg-MyPurple-400 bg-opacity-40 p-2 pl-3  outline-transparent">
              {label}
              <span
                onClick={() => deleteTags(label)}
                className="hover ml-3 mr-1 h-6 w-6 rounded-full bg-gray-50 hover:bg-gray-500 hover:text-white"
              >
                X
              </span>
            </button>
          ))}
          <button
            onClick={showPopup}
            className="m-2 mr-2 flex cursor-pointer rounded-md border-transparent bg-MyPurple-400 p-1 px-2 py-2 pl-3 text-sm font-semibold normal-case text-white shadow-sm shadow-white outline-transparent hover:bg-purple-400  hover:shadow-white"
          >
            <span className=" text-white-600 ml-2 h-6 w-6 pt-0.5 ">Add</span>
            <span className=" ml-5 h-6 w-6 rounded-full bg-gray-50  pt-0.5 text-gray-600 hover:bg-gray-500 hover:text-white">
              +
            </span>
          </button>
        </div>

        <div className="text-left text-lg font-bold text-black">Cheat Tags</div>
        <div className=" flex flex-wrap">
          {cheattags.map(({ label }, index) => (
            <button className="m-2 flex cursor-pointer rounded-xl border-transparent bg-MyPurple-400 bg-opacity-40 p-1 pl-3  outline-transparent">
              {label}
              <span
                onClick={() => deleteTags(label)}
                className="hover ml-3 mr-1 h-6 w-6 rounded-full bg-gray-50 hover:bg-gray-500 hover:text-white"
              >
                X
              </span>
            </button>
          ))}
        </div>
      </div>
      {isPopupVisible && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="flex justify-end">
              <button className="focus:outline-none" onClick={closePopup}>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="rounded-sm px-1 py-0.5 text-lg text-gray-800 hover:bg-gray-400 hover:text-white"
                />
              </button>
            </div>
            <MilstoneTags tags={tags} setTags={setTags} />
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                onClick={saveNewTag}
                className="mr-2 rounded-md bg-MyPurple-400 px-4 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-purple-400 hover:shadow-white"
              >
                Save
              </button>
              <button
                onClick={closePopup}
                className="rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold normal-case text-white shadow-sm shadow-white hover:bg-gray-500 hover:shadow-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileTags;
