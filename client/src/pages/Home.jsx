import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import TableCard from "../components/TableCard";
import TrackButton from "../components/TrackButton";
import Navbar from "../components/Navbar";

const Home = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen w-full items-center pt-20">
        <div className="flex items-center justify-center w-3xl">
          <SearchBar setSearch={setSearch} />
          <TrackButton />
        </div>
        <TableCard search={search} />
      </div>
    </>
  );
};

export default Home;
