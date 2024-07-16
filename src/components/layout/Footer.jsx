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
function Footer() {
  return (
    <div className="container flex flex-col lg:flex-row justify-center items-center lg:justify-around my-8">
      <div className="max-w-80 lg:min-w-60 flex flex-col justify-center gap-2 text-left my-8">
        <p className="text-brandColor font-bold text">Moviever</p>
        <p className="text-dark">© 2024 Moviever. All Rights Reserved.</p>
        <p className="font-light text-dark">
          Moviever is a platform specially designed for movie enthusiasts. Our
          goal is to enable you to easily find your favorite movies, create
          watch lists, and share your movie experiences with other users.
        </p>
        <div className="social flex gap-5">
          <Button as={Link} isIconOnly>
            <img
              src={instagramIcon}
              alt="instagram-icon"
              className="bg-white"
            />
          </Button>
          <Button as={Link} isIconOnly>
            <img src={linkedinIcon} alt="linkedin-icon" className="bg-white" />
          </Button>
          <Button as={Link} isIconOnly>
            <img src={twitterIcon} alt="twitter-icon" className="bg-white" />
          </Button>
        </div>
      </div>
      <div className="w-80 lg:w-60 xl:min-w-80 flex flex-col gap-2 text-left my-4">
        <Table removeWrapper className="text-dark">
          <TableHeader className="bg-none">
            <TableColumn>Popular Categories</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Action
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/" className="text-dark">
                  Romance
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Fantasy
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/" className="text-dark">
                  Horror
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Sci-Fi
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/" className="text-dark">
                  Drama
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Adventure
                </Link>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-80 lg:w-60 xl:min-w-80 flex flex-col  gap-2 text-left my-4">
        <Table removeWrapper className="text-dark">
          <TableHeader className="bg-none">
            <TableColumn>Popular Movies</TableColumn>
            <TableColumn></TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Transformers
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/" className="text-dark">
                  Harry Potter
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Lord Of The Rings
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/" className="text-dark">
                  Star Wars
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Avengers
                </Link>
              </TableCell>
              <TableCell>
                <Link href="/" className="text-dark">
                  Batman
                </Link>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Link href="/" className="text-dark">
                  Interstellar
                </Link>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Footer;
