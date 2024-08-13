/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Pagination } from "@nextui-org/react";
import MovieList from "./adminComponents/MovieList";
import SelectCategory from "./adminComponents/SelectCategory";

const AdminMovies = () => {
  const [initialData, setInitialData] = useState([]);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("ALL");
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const { searchMovies, fetchAllMovies } = useAppContext();

  const updateMovies = () => {
    fetchAllMovies(category, page, 6).then((res) => {
      setMovies(res.data.movies);
    });
  };

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length !== 0) {
      searchMovies(query, category, page).then((res) => {
        setInitialData(res.data);
        setMovies((prev) => {
          if (page === 0) {
            return res.data.movies;
          } else {
            return [...prev, ...res.data.movies];
          }
        });
      });
    } else {
      fetchAllMovies(category, page, 6).then((res) => {
        setInitialData(res.data);
        setMovies(res.data.movies);
      });
    }
  }, [page, query, category]);

  return (
    <div className="px-2 flex flex-col mx-auto">
      <p className="lg:text-2xl text-xl mt-8 font-semibold py-4 text-textColor">
        Movie List
      </p>

      <div className="flex items-center justify-between">
        <input
          type="text"
          className="py-2 mt-4 mb-8 pl-2 text-textColor border border-textColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[350px] sm:w-auto"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SelectCategory setCategory={setCategory} />
      </div>
      <div className="relative min-h-[500px] w-[200px] sm:w-[400px] md:w-[400px] lg:max-w-[700px] lg:min-w-[600px] xl:min-w-[700px] overflow-x-scroll xl:overflow-x-hidden">
        <MovieList movies={movies} updateMovies={updateMovies} />
        {/* {movies.length === 0 && (
          <div className="flex justify-center items-center mt-40 ">
            <p>Movie not found</p>
          </div>
        )} */}
      </div>

      <Pagination
        total={initialData.totalPages}
        initialPage={1}
        className="mt-8"
        onChange={(p) => {
          setPage(p - 1);
        }}
      />
    </div>
  );
};

export default AdminMovies;
