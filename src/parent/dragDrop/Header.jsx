import React from "react";

function Header({ text, bg, count }) {
  return (
    <div
      className={`${bg} flex h-12 items-center rounded-md pl-4 text-sm uppercase text-white`}
    >
      {text}
      <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-white px-3 py-3  text-black">
        {count}
      </div>
    </div>
  );
}

export default Header;
