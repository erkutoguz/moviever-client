/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { Link } from "@nextui-org/react";
import { memo, useEffect, useRef } from "react";
import "./DropdownList.css";
import { useAppContext } from "../../context/appContext";

const DropdownList = memo(({ movies, isOpen, setOpen, inputRef }) => {
  const dropdownRef = useRef(null);
  const { theme } = useAppContext();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      {isOpen && (
        <ul
          className={`max-w-[55vw] sm:max-w-[50vw] md:max-w-[30vw] px-2 absolute mt-2 overflow-hidden z-50 bg-background border ${
            theme === "dark" ? "border-gray-700" : "border-gray-400"
          } rounded-md shadow-lg max-h-80 overflow-y-auto custom-scrollbar`}
          ref={dropdownRef}
        >
          {movies.map((movie, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                theme == "dark" ? "hover:bg-slate-700" : "hover:bg-slate-300"
              } px-4 py-2 duration-300`}
            >
              <div className="flex items-center gap-2">
                <Link
                  href={`/movies/${movie.movieId}`}
                  className="gap-4 truncate hover:text-clip text-textColor"
                >
                  <img
                    src={movie.posterUrl}
                    alt="movie-poster"
                    className="w-12 h-16 object-cover rounded"
                  />
                  {movie.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default DropdownList;
