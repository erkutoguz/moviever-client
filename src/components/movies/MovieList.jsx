/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  return (
    <div className="flex flex-wrap max-w-[1000px] justify-center gap-2">
      {movies &&
        movies.map((m, i) => {
          return <MovieCard key={i} movie={m} />;
        })}
    </div>
  );
}

export default MovieList;
