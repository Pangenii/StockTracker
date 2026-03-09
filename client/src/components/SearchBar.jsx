import React from "react";

const SearchBar = ({ setSearch }) => {
  return (
    <div className="w-full mt-12 max-w-md">
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        className="w-full px-4 py-2 rounded-lg bg-[#1C2433] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
  );
};

export default SearchBar;
