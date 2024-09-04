/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import useSearchMovie from "../../hooks/useSearchMovie";
import DropdownList from "./DrowpdownList";

const MovieSearchBar = () => {
  const [query, setQuery] = useState("");
  const { loading, movies } = useSearchMovie(query, "ALL");
  const [isOpen, setOpen] = useState(false);

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);
  const inputRef = useRef();

  useEffect(() => {
    if (query.length > 0) {
      inputRef.current.focus();
    }
  });

  return (
    <div>
      <input
        ref={inputRef}
        onFocus={() => setOpen(true)}
        type="text"
        className="py-2 pl-4 pr-4 text-textColor border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] sm:w-auto"
        placeholder="Search for movies..."
        value={query}
        onChange={handleSearch}
      />
      {!loading && (
        <DropdownList
          movies={movies}
          isOpen={isOpen}
          setOpen={setOpen}
          inputRef={inputRef}
        />
      )}
    </div>
  );
};

export default MovieSearchBar;
