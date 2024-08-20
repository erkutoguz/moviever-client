/* eslint-disable react/prop-types */
import {
  Link,
  LinkIcon,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useMemo } from "react";

const AdminPopularMoviesList = ({ movies }) => {
  const classNames = useMemo(
    () => ({
      wrapper: ["rounded-none", "bg-sidebarBg"],
      th: ["bg-sidebarBg"],
    }),
    []
  );
  return (
    <div className="bg-sidebarBg text-left">
      <p className="text-medium font-semibold text-textColor p-4">
        Most Viewed Movies
      </p>
      {
        <Table aria-label="popular-movies" classNames={classNames}>
          <TableHeader>
            <TableColumn className="text-textColor text-sm">
              Movie Name
            </TableColumn>
            <TableColumn className="text-textColor text-sm">
              View Count
            </TableColumn>
            <TableColumn className="text-textColor text-sm">
              Like Count
            </TableColumn>
            <TableColumn className="text-textColor text-sm">
              Release Year
            </TableColumn>
            <TableColumn className="text-textColor text-sm">
              Trailer
            </TableColumn>
          </TableHeader>
          <TableBody>
            {movies.map((m, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <Link href={`/movies/${m.id}`}>
                      <p className="text-textColor ">{m.title}</p>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <p className="text-textColor">{m.viewCount}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-textColor">{m.likeCount}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-textColor">{m.releaseYear}</p>
                  </TableCell>
                  <TableCell>
                    <a
                      className="text-textColor flex items-center"
                      href={m.trailerUrl}
                      target="_blank"
                    >
                      <LinkIcon />
                      {m.trailerUrl}
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      }
    </div>
  );
};

export default AdminPopularMoviesList;
