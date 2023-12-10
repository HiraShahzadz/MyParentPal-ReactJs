import React from "react";

function FilterChildTask() {
  const options = [
    { label: "Nida", image: "/img/Woman6.jpg" },
    { label: "Hira", image: "/img/women2.jpg" },
  ];

  return (
    <div className="col-span-full ml-2 mt-2 flex items-center gap-x-1">
      {options.map(({ image }) => (
        <img
          className="h-10 w-10 rounded-full border-2 border-white hover:border-[#B089BE]"
          src={image}
          alt=""
        />
      ))}
    </div>
  );
}

export default FilterChildTask;
