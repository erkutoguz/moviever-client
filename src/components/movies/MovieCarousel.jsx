/* eslint-disable react/prop-types */
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import StarIcon from "../../assets/icons/StarIcon";
import { useNavigate } from "react-router-dom";

const MovieCarousel = ({ slides }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCountToShow, setSlideCount] = useState();

  const getSlideCount = () => {
    const width = window.innerWidth;
    if (width >= 1280) return 6;
    if (width >= 768) return 3;
    return 2;
  };

  useEffect(() => {
    const width = window.innerWidth;
    if (width >= 768) setSlideCount(6);
    else if (width >= 420) setSlideCount(3);
    else setSlideCount(2);
  }, [currentSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide]);

  const nextSlide = () => {
    const slideCount = getSlideCount();
    if (slideCount === 2 && currentSlide + 2 < slides.length) {
      setCurrentSlide(currentSlide + 2);
    } else if (slideCount === 3 && currentSlide + 3 < slides.length) {
      setCurrentSlide(currentSlide + 3);
    } else if (slideCount === 6 && currentSlide + 6 < slides.length) {
      setCurrentSlide(currentSlide + 6);
    } else {
      setCurrentSlide(0);
    }
  };
  const prevSlide = () => {
    const slideCount = getSlideCount();
    if (slideCount === 2 && currentSlide - 2 >= 0) {
      setCurrentSlide(currentSlide - 2);
    } else if (slideCount === 3 && currentSlide - 3 >= 0) {
      setCurrentSlide(currentSlide - 3);
    } else if (slideCount === 6 && currentSlide - 6 >= 0) {
      setCurrentSlide(currentSlide - 6);
    } else {
      setCurrentSlide(slides.length - slideCount);
    }
  };

  return (
    <div className="flex justify-center self-center relative transition-transform ease-out duration-700 max-w-[1000px]">
      <Button
        onClick={prevSlide}
        aria-label="prev-button"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white min-w-10 min-h-10 rounded-full z-10"
      >
        &#9664;
      </Button>
      {slideCountToShow === 2 &&
        slides.slice(currentSlide, currentSlide + 2).map((s, i) => {
          return (
            <Card
              isPressable
              onPress={() => navigate(`/movies/${s.id}`)}
              radius="none"
              key={i}
              className="col-span-12 sm:col-span-4 h-[300px] backdrop-blur-xl flex-1 "
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
                  <StarIcon className="text-dark" />
                </div>
                <h4 className="text-white font-medium text-large w-full truncate hover:text-clip">
                  {s.title}
                </h4>
              </CardFooter>
            </Card>
          );
        })}
      {slideCountToShow === 3 &&
        slides.slice(currentSlide, currentSlide + 3).map((s, i) => {
          return (
            <Card
              isPressable
              onPress={() => navigate(`/movies/${s.id}`)}
              radius="none"
              key={i}
              className="col-span-12 sm:col-span-4 h-[300px] backdrop-blur-xl  flex-1"
            >
              <Image
                removeWrapper
                alt="Card background"
                className={"z-0 w-full brightness-75 h-full   rounded-none"}
                src={s.pictureUrl}
              />
              <CardFooter className="absolute z-10 bottom-1 flex-col !items-start">
                <div className="info flex items-center justify-center gap-1">
                  <p className="text-sm text-white/90 uppercase ">{s.rating}</p>
                  <StarIcon />
                </div>
                <h4 className="text-white font-medium text-large w-full truncate hover:text-clip ">
                  {s.title}
                </h4>
              </CardFooter>
            </Card>
          );
        })}
      {slideCountToShow === 6 &&
        slides.slice(currentSlide, currentSlide + 6).map((s, i) => {
          return (
            <Card
              radius="none"
              key={i}
              className="col-span-12  sm:col-span-4 h-[300px] backdrop-blur-xl  flex-1"
              isPressable
              onPress={() => navigate(`/movies/${s.id}`)}
            >
              <Image
                removeWrapper
                alt="Card background"
                className={"z-0 w-full brightness-75 h-full rounded-none"}
                src={s.pictureUrl}
              />
              <CardFooter className="absolute z-10 bottom-1 flex-col !items-start">
                <div className="info flex items-center justify-center gap-1">
                  <p className="text-sm text-white/90 uppercase ">{s.rating}</p>
                  <StarIcon className="text-[#eab308] w-5" />
                </div>
                <h4 className="text-white font-medium text-large w-full truncate hover:text-clip ">
                  {s.title}
                </h4>
              </CardFooter>
            </Card>
          );
        })}
      <Button
        onClick={nextSlide}
        aria-label="next-button"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white min-w-10 min-h-10 rounded-full z-10"
      >
        &#9654;
      </Button>
    </div>
  );
};

export default MovieCarousel;
