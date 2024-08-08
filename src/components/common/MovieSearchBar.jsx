/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { Dropdown, DropdownItem, DropdownMenu, Link } from "@nextui-org/react";

const MovieSearchBar = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const inputRef = useRef();

  const { searchMovies } = useAppContext();

  useEffect(() => {
    if (query.length > 0) {
      inputRef.current.focus();
    }
  });

  useEffect(() => {
    if (query.length > 0) {
      setLoading(true);
      searchMovies(query)
        .then((res) => {
          setSearchResult(res.data);
          console.log(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setSearchResult([]);
    }
  }, [query]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        className="py-2 pl-4 pr-4 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] sm:w-auto"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {!isLoading && searchResult && searchResult.length > 0 && (
        <Dropdown className="px-4 z-[99] absolute mt-2 w-full lg:relative">
          <DropdownMenu className="">
            {isLoading && <DropdownItem>Loading...</DropdownItem>}
            {searchResult.map((res, i) => {
              return (
                <DropdownItem key={i}>
                  <div className="flex flex-row gap-2">
                    <img
                      src={res.posterUrl}
                      alt="movie-poster"
                      className="w-8"
                    />
                    <Link
                      href={`/movies/${res.movieId}`}
                      onPress={() => setQuery("")}
                    >
                      {res.title}
                    </Link>
                  </div>
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default MovieSearchBar;
