import {
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import twitterIcon from "../../assets/icons/twitter.svg";
import linkedinIcon from "../../assets/icons/linkedin.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import { useAppContext } from "../../context/appContext";
import { useEffect, useState } from "react";

function Footer() {
  const { isAuthenticated, fetchPopularMovies } = useAppContext();
  const [popularMovies, setPopularMovies] = useState([]);
  useEffect(() => {
    if (isAuthenticated) {
      fetchPopularMovies(0, 7).then((res) => {
        setPopularMovies(res.data.movies);
      });
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`flex flex-col lg:flex-row justify-center lg:justify-around my-8 gap-8 text-textColor`}
    >
      <div className="max-w-80 lg:min-w-60 flex flex-col justify-center gap-2 text-left my-8 pr-10">
        <p className="text-brandColor font-bold ">Moviever</p>
        <p>© 2024 Moviever. All Rights Reserved.</p>
        <p>
          Moviever is a platform specially designed for movie enthusiasts. Our
          goal is to enable you to easily find your favorite movies, create
          watch lists, and share your movie experiences with other users.
        </p>
        <div className="social flex gap-5">
          <Button
            as={Link}
            isIconOnly
            aria-label="instagram-button"
            href="https://www.instagram.com/thisiserkut/"
          >
            <img
              src={instagramIcon}
              alt="instagram-icon"
              className="bg-background"
            />
          </Button>
          <Button
            as={Link}
            isIconOnly
            href="https://www.linkedin.com/in/erkut-oğuz-82704420b"
            aria-label="linkedin-button"
          >
            <img
              src={linkedinIcon}
              alt="linkedin-icon"
              className="bg-background"
            />
          </Button>
          <Button as={Link} isIconOnly aria-label="twitter-button">
            <img
              src={twitterIcon}
              alt="twitter-icon"
              className="bg-background"
            />
          </Button>
        </div>
      </div>

      {isAuthenticated && (
        <>
          <div className="w-80 lg:w-60 xl:min-w-80 flex flex-col gap-2 text-left my-4">
            <Table removeWrapper className="text-color">
              <TableHeader className="bg-none">
                <TableColumn>Popular Categories</TableColumn>
                <TableColumn></TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Link
                      href="/movies/category/ACTION"
                      className="text-color"
                      aria-label="action"
                    >
                      Action
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/movies/category/ROMANCE"
                      className="text-color"
                      aria-label="romance"
                    >
                      Romance
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link
                      href="/movies/category/FANTASY"
                      className="text-color"
                      aria-label="fantasy"
                    >
                      Fantasy
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/movies/category/HORROR"
                      className="text-color"
                      aria-label="horror"
                    >
                      Horror
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link
                      href="/movies/category/SCIENCE_FICTION"
                      className="text-colork"
                      aria-label="sci-fi"
                    >
                      Sci-Fi
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      href="/movies/category/DRAMA"
                      className="text-color"
                      aria-label="drama"
                    >
                      Drama
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Link
                      href="/movies/category/ADVENTURE"
                      className="text-color"
                      aria-label="adventure"
                    >
                      Adventure
                    </Link>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="w-80 lg:w-60 xl:min-w-80 flex flex-col  gap-2 text-left my-4">
            {popularMovies.length > 7 && (
              <Table removeWrapper className="text-textColor">
                <TableHeader>
                  <TableColumn>Popular Movies</TableColumn>
                  <TableColumn></TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Link
                        href={`/movies/${popularMovies[0].id}`}
                        className="text-color"
                        aria-label={`popular-movies-${popularMovies[0].title}`}
                      >
                        {popularMovies[0].title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/movies/${popularMovies[1].id}`}
                        className="text-color"
                        aria-label={`popular-movies-${popularMovies[1].title}`}
                      >
                        {popularMovies[1].title}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Link
                        href={`/movies/${popularMovies[2].id}`}
                        className="text-color"
                        aria-label={`popular-movies-${popularMovies[2].title}`}
                      >
                        {popularMovies[2].title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/movies/${popularMovies[3].id}`}
                        className="text-color"
                        aria-label={`popular-movies-${popularMovies[3].title}`}
                      >
                        {popularMovies[3].title}
                      </Link>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Link
                        href={`/movies/${popularMovies[4].id}`}
                        className="text-color"
                        aria-label={`popular-movies-${popularMovies[4].title}`}
                      >
                        {popularMovies[4].title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/movies/${popularMovies[5].id}`}
                        className="text-color"
                        aria-label={`popular-movies-${popularMovies[5].title}`}
                      >
                        {popularMovies[5].title}
                      </Link>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Footer;
