import React from "react";

function FilterChildTask({
  childProfileData,
  setChildProfileData,
  filterTasks,
}) {
  const handleChildClick = (childId) => {
    filterTasks(childId);
  };

  return (
    <div className="col-span-full ml-2 mt-2 flex items-center gap-x-1">
      {childProfileData.map(
        ({ id, img, role }) =>
          role === "child" && (
            <img
              key={id}
              className="h-10 w-10 cursor-pointer rounded-full border-2 border-white object-cover hover:border-[#B089BE]"
              src={img ? `data:image/jpeg;base64,${img}` : "/img/userc.png"}
              alt=""
              onClick={() => handleChildClick(id)}
            />
          )
      )}
    </div>
  );
}

export default FilterChildTask;
