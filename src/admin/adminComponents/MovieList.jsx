/* eslint-disable no-unused-vars */
import { capitalizeText } from "../../utils/textFormatter";
import DeleteMovieModal from "./DeleteMovieModal";

/* eslint-disable react/prop-types */
const MovieList = ({ movies, updateMovies }) => {
  return (
    <table className="table-auto absolute overflow-scroll">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Id
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Title
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Release Year
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Category
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie, index) => {
          return (
            <tr
              key={index}
              className="border-t hover:bg-commentBg duration-200"
            >
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {movie.movieId || movie.id}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {movie.title}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {movie.releaseYear}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium flex flex-col text-textColor">
                {movie.categories.map((c, i) => {
                  return <span key={i}>{capitalizeText(c.categoryType)}</span>;
                })}
                {movie.categories.length === 0 && <p>-</p>}
              </td>

              <td className=" px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                <DeleteMovieModal
                  updateMovies={updateMovies}
                  movieId={movie.id || movie.movieId}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieList;
