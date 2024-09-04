/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback } from "react";
import DeleteMovieModal from "./DeleteMovieModal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { capitalizeText } from "../../utils/textFormatter";
import UpdateMovieModal from "./UpdateMovieModal";

const MovieList = ({ movies, updateMovies }) => {
  const columns = [
    { name: "Id", uid: movies[0] && movies[0].movieId ? "movieId" : "id" },
    { name: "Title", uid: "title" },
    { name: "Release Year", uid: "releaseYear" },
    { name: "Categories", uid: "categories" },
    { name: "Actions", uid: "actions" },
  ];
  const renderCell = useCallback((movie, columnKey) => {
    const cellValue = movie[columnKey];

    switch (columnKey) {
      case "id":
        return <p className=" text-textColor">{cellValue}</p>;
      case "movieId":
        return <p className=" text-textColor">{cellValue}</p>;
      case "title":
        return (
          <div className="flex flex-col capitalize">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );
      case "releaseYear":
        return (
          <div className="flex flex-col ">
            <p className="text-bold text-sm text-textColor">{cellValue}</p>
          </div>
        );
      case "categories":
        return (
          <div className="flex flex-col">
            {cellValue.map((c, i) => {
              return (
                <p
                  key={i}
                  className="text-bold text-sm capitalize text-textColor"
                >
                  {capitalizeText(c.categoryType)}
                </p>
              );
            })}
          </div>
        );

      case "actions":
        return (
          <div className="relative flex justify-center  items-center gap-2">
            <UpdateMovieModal movieId={movie.id} />
            <DeleteMovieModal movieId={movie.id} updateMovies={updateMovies} />
          </div>
        );
      default:
        return <p>-</p>;
    }
  }, []);

  return (
    <Table aria-label="movie-list">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={movies}>
        {(item) => (
          <TableRow key={item.id || item.movieId}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
    // <p>a</p>
  );
};

export default MovieList;
