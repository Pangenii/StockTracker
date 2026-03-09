import SearchBar from "./components/SearchBar";
import TableCard from "./components/TableCard";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <SearchBar />
        <TableCard />
      </div>
    </>
  );
}

export default App;
