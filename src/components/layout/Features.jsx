import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import movieIcon from "../../assets/icons/movie.svg";
import reviewIcon from "../../assets/icons/review.svg";
import watchlistIcon from "../../assets/icons/watchlist.svg";
function Features() {
  return (
    <div className="container flex lg:flex-row flex-col py-8 gap-5 lg:gap-10 items-center justify-center md:my-20">
      <Card className="flex justify-center items-center text-center self-center max-w-80 min-h-56 pt-2 ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col">
          <Image
            alt="movie-icon"
            className="w-11 rounded-none"
            style={{
              filter:
                "invert(41%) sepia(89%) saturate(320%) hue-rotate(164deg) brightness(97%) contrast(85%)",
            }}
            src={movieIcon}
          />
        </CardHeader>
        <CardBody className="text-center">
          <h4 className="font-bold text-color">Discover New Movies</h4>
          <br />
          <p className="text-color">
            Explore a vast collection of movies across all genres. Find detailed
            information, watch trailers, and read reviews.
          </p>
        </CardBody>
      </Card>
      <Card className="flex justify-center items-center text-center self-center max-w-80 min-h-56 pt-2">
        <CardHeader className="pb-0 pt-2 px-4 flex-col">
          <Image
            alt="review-icon"
            className="w-11 rounded-none "
            src={reviewIcon}
            style={{
              filter:
                "invert(41%) sepia(89%) saturate(320%) hue-rotate(164deg) brightness(97%) contrast(85%)",
            }}
          />
        </CardHeader>
        <CardBody className="text-center">
          <h4 className="font-bold text-color">Share Your Reviews</h4>
          <br />
          <p className="text-color">
            Share your thoughts on movies you have watched. Rate and review to
            help others find great films.
          </p>
        </CardBody>
      </Card>
      <Card className="flex justify-center items-center text-center self-center max-w-80 min-h-56 pt-2">
        <CardHeader className="pb-0 pt-2 px-4 flex-col">
          <Image
            alt="watchlist-icon"
            className="w-11 rounded-none"
            src={watchlistIcon}
            style={{
              filter:
                "invert(41%) sepia(89%) saturate(320%) hue-rotate(164deg) brightness(97%) contrast(85%)",
            }}
          />
        </CardHeader>
        <CardBody className="text-center">
          <h4 className="font-bold text-color">Build Your Watchlist</h4>
          <br />
          <p className="text-color">
            Create and manage your own watchlist. Keep track of movies you want
            to watch and never miss a great film again.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default Features;
