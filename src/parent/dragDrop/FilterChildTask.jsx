import React, { useState } from "react";

function FilterChildTask({
  childProfileData,
  setChildProfileData,
  filterTasks,
}) {
  const [selectedChild, setSelectedChild] = useState(null);

  const handleChildClick = (childId) => {
    if (selectedChild === childId) {
      // If the same child is clicked again, deselect it
      setSelectedChild(null);
      filterTasks(null);
    } else {
      // Otherwise, select the clicked child
      setSelectedChild(childId);
      filterTasks(childId);
    }
  };

  return (
    <div className="col-span-full ml-2 mt-2 flex items-center gap-x-1">
      {childProfileData.map(
        ({ id, img, role }) =>
          role === "child" && (
            <div key={id}>
              <img
                className={`h-10 w-10 cursor-pointer rounded-full object-cover hover:border-[#B089BE] ${
                  selectedChild === id
                    ? " border-2 border-MyPurple-400"
                    : "border-2 border-white "
                }`}
                src={img ? `data:image/jpeg;base64,${img}` : "/img/userc.png"}
                alt=""
                onClick={() => handleChildClick(id)}
              />
            </div>
          )
      )}
    </div>
  );
}

export default FilterChildTask;
