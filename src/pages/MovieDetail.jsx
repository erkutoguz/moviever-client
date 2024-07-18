import { useLoaderData } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Divider, Image } from "@nextui-org/react";

function MovieDetail() {
  const movieDetails = useLoaderData();
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="description flex flex-col gap-6 justify-center items-center w-full mt-8">
        <div className="picture w-3/4">
          <Image
            src={movieDetails.pictureUrl}
            isBlurred
            className=" z-0 brightness-75 h-full rounded-none"
          />
        </div>
        <div className="title-categories w-3/4 flex justify-between">
          <p className="text-xl">{movieDetails.title}</p>
          <div className="categories flex gap-1">
            {movieDetails.categories.map((c, i) => {
              return <p key={i}>{c.categoryName}</p>;
            })}
          </div>
        </div>
        <p className="w-3/4 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          dignissimos corporis consequatur dolorem iusto ullam rem sequi esse
          repudiandae? A in maiores corrupti dolorum quo itaque saepe minima
          adipisci non!
        </p>
      </div>
      <Divider className="mt-8" />
      <div className="about w-3/4">
        <div className="director flex gap-2">
          <p className="font-semibold text-dark text-md">Director</p>
          <p>{movieDetails.director}</p>
        </div>
        <div className="releaseYear"></div>
        <div className="rating"></div>
      </div>
      <Footer />
    </div>
  );
}

export default MovieDetail;
