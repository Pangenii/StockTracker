import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import TableCard from "../components/TableCard";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-center pt-20">
        <SearchBar setSearch={setSearch} />
        <TableCard search={search} />
      </div>
    </>
  );
};

export default Home;
