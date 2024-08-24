/* eslint-disable react/prop-types */
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import StarIcon from "../../assets/icons/StarIcon";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <Card
      isPressable
      onPress={() => navigate(`/movies/${movie.id}`)}
      radius="none"
      className="w-[200px] h-[300px] rounded"
    >
      <CardBody className="overflow-visible p-0">
        <Image
          removeWrapper
          alt="Card background"
          className={"z-0 w-full brightness-75 h-full rounded-none object-fill"}
          src={movie.pictureUrl}
        />
      </CardBody>
      <CardFooter className="absolute z-10 bottom-1 flex-col !items-start">
        <div className="info flex items-center justify-center gap-1 ">
          <p className="text-sm text-white/90 uppercase ">{movie.rating}</p>
          <StarIcon className="text-[#eab308] w-5" />
        </div>
        <h4 className="text-white font-medium text-large w-full truncate hover:text-clip">
          {movie.title}
        </h4>
      </CardFooter>
    </Card>
  );
}

export default MovieCard;
