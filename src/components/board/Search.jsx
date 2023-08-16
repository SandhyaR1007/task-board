import { useEffect, useState } from "react";
import { useTaskContext } from "../../context/TaskContext";

const Search = () => {
  const { updateSearchQuery } = useTaskContext();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let id = setTimeout(() => {
      updateSearchQuery(searchText);
    }, 300);
    return () => {
      clearTimeout(id);
    };
  }, [searchText]);
  return (
    <label>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="search"
        className="px-2 py-1 rounded-md border shadow-sm text-sm w-1/4 outline-none"
        placeholder="Search for task, assignee..."
      />
    </label>
  );
};

export default Search;
