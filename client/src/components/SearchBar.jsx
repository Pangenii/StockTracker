import React from "react";

const SearchBar = () => {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 rounded-lg bg-[#1C2433] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
};

export default SearchBar;
