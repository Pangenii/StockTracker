import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <div className="w-full max-w-md sm:max-w-lg">
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        className="w-full px-4 py-2 rounded-l-lg bg-[#1C2433] text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-gray-500"
      />
    </div>
  );
};

export default SearchBar;
