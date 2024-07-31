import { Button, Image, Link, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import smallHeroImage from "../../assets/images/hero-img.jpg";
import largeHeroImage from "../../assets/images/hero.jpg";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [isHeroLoaded, setHeroLoaded] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setHeroLoaded(true);
    }, 2000);
  }, []);
  return (
    <>
      <h2 className="my-8 lg:hidden px-6 md:px-24 text-xl text-btnColor font-bold text-wrap text-left md:text-center tracking-widest">
        Everything about movies, Review movies, like them save them to your
        watchlist!
      </h2>
      <div className="heroBtn w-full lg:hidden flex justify-center">
        <Button
          as={Link}
          aria-label="get-started-button"
          className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base top-0"
          onPress={() => {
            navigate("/sign-in");
          }}
        >
          Get Started
        </Button>
      </div>
      <Skeleton
        isLoaded={isHeroLoaded}
        className="my-4 flex justify-center items-center"
      >
        <Image
          className="w-full lg:hidden rounded-none max-h-[400px] sm:max-h-[600px] md:max-h-[800px]"
          alt="hero-section"
          src={smallHeroImage}
        />

        <Image
          className="w-full hidden relative lg:flex rounded-none max-h-[400px] sm:max-h-[600px] md:max-h-[800px]"
          alt="hero-section"
          src={largeHeroImage}
        />
        <h2 className="my-8 lg:flex absolute lg:top-10 xl:top-28 lg:left-32 lg:w-[450px] xl:w-[500px] lg:text-left z-30 hidden px-6 lg:px-0 md:px-24 text-xl lg:text-2xl text-btnColor lg:text-white font-bold text-wrap text-left md:text-center tracking-widest">
          Everything about movies, Review movies, like them save them to your
          watchlist!
        </h2>
        <div className="heroBtn absolute lg:top-60 xl:top-60 z-30 w-full lg:flex hidden justify-center">
          <Button
            as={Link}
            className="bg-btnColor w-36 md:w-48 font-normal text-white  rounded-none text-base top-0"
          >
            Get Started
          </Button>
        </div>
      </Skeleton>
    </>
  );
}

export default Hero;
