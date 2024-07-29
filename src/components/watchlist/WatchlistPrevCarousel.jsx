/* eslint-disable react/prop-types */
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import StarIcon from "../../assets/icons/StarIcon";

const WatchlistPrevCarousel = ({ slides }) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 relative transition-transform ease-out duration-700 max-w-[1000px]">
      {slides &&
        slides.map((s, i) => {
          return (
            <Card
              isPressable
              onPress={() => navigate(`/movies/${s.id}`)}
              radius="none"
              key={i}
              className="col-span-12 sm:col-span-4 max-w-[235px] h-[300px] backdrop-blur-xl flex-1 "
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  removeWrapper
                  alt="Card background"
                  className={"z-0 w-full brightness-75 h-full rounded-none"}
                  src={s.pictureUrl}
                />
              </CardBody>
              <CardFooter className="absolute z-10 bottom-1 flex-col !items-start">
                <div className="info flex items-center justify-center gap-1">
                  <p className="text-sm text-white/90 uppercase ">{s.rating}</p>
                  <StarIcon />
                </div>
                <h4 className="text-white font-medium text-large w-full truncate hover:text-clip">
                  {s.title}
                </h4>
              </CardFooter>
            </Card>
          );
        })}
    </div>
  );
};

export default WatchlistPrevCarousel;
