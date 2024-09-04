/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Pagination } from "@nextui-org/react";
import SelectCategory from "./adminComponents/SelectCategory";
import MovieList from "./adminComponents/MovieList";
import useSearchMovieWithCategory from "../hooks/useSearchMovieWithCategory";

const AdminMovies = () => {
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("ALL");
  const [query, setQuery] = useState("");
  const { loading, movies, totalPages } = useSearchMovieWithCategory(
    query,
    category,
    page
  );

  const updateMovies = () => {
    window.location.reload();
  };

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
      <div className="relative min-h-[500px] w-[200px] sm:w-[400px] md:w-[400px] lg:max-w-[700px] lg:min-w-[600px] xl:min-w-[700px] ">
        <MovieList movies={movies} updateMovies={updateMovies} />
        {movies.length === 0 && (
          <div className="flex justify-center items-center mt-40 text-textColor">
            <p>Movie not found</p>
          </div>
        )}
      </div>

      {!loading && (
        <Pagination
          total={totalPages}
          initialPage={page + 1}
          size="sm"
          className="mt-8"
          onChange={(p) => {
            setPage(p - 1);
          }}
        />
      )}
    </div>
  );
};

export default AdminMovies;
