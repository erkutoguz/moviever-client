import { useLoaderData } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Divider, Image } from "@nextui-org/react";
import { useEffect } from "react";
import heartIcon from "../assets/icons/heart.svg";
import Comment from "../components/common/Comment";
function MovieDetail() {
  const movieDetails = useLoaderData();
  useEffect(() => {
    console.log(movieDetails);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full ">
      <Header />
      <section className="flex flex-col justify-center items-center lg:max-w-7xl">
        <div className="w-3/4 flex flex-col justify-center items-center lg:flex-row lg:items-start lg:max-w-1/2">
          <div className="description flex lg:max-w-[330px] flex-col gap-6 justify-center items-center w-full mt-8">
            <div className="picture w-full flex justify-center">
              <Image
                src={movieDetails.pictureUrl}
                isBlurred
                className=" z-0 brightness-75 h-full rounded-none lg:max-h-[420px] max-h-[475px]"
              />
            </div>
            <div className="title-categories w-full flex flex-col justify-between ">
              <div className="flex justify-between items-center">
                <p className="text-base ">{movieDetails.title}</p>
                <div className="categories flex gap-1">
                  {movieDetails.categories.map((c, i) => {
                    return (
                      <p
                        key={i}
                        className="hover:cursor-pointer border-b-1 p-1 text-sm"
                        onClick={() => console.log("clicked")}
                      >
                        {c.categoryName}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-0.5 items-center mt-2">
                <img
                  src={heartIcon}
                  className="w-6 hover:cursor-pointer"
                  alt="heart-icon"
                />
                <p>{movieDetails.likeCount}</p>
              </div>
            </div>
          </div>

          <div className="about w-full lg:mt-8 lg:px-4 mt-4">
            <p className="font-semibold text-dark text-sm">Description</p>
            <p className="w-full text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-2 lg:mt-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              dignissimos corporis consequatur dolorem iusto ullam rem sequi
              esse repudiandae? A in maiores corrupti dolorum quo itaque saepe
              minima adipisci non!
            </p>
            <Divider className="my-4 " />

            <div className="director flex gap-2">
              <p className="font-semibold text-dark text-sm ">Director</p>
              <p className="text-sm">{movieDetails.director}</p>
            </div>
            <Divider className="my-4" />
            <div className="releaseYear flex gap-2">
              <p className="font-semibold text-dark text-sm ">Release Year</p>
              <p className="text-sm">{movieDetails.releaseYear}</p>
            </div>
            <Divider className="my-4" />
            <div className="rating flex gap-2">
              <p className="font-semibold text-dark text-sm">Rating</p>
              <p className="text-sm">{movieDetails.rating}</p>
            </div>
          </div>
        </div>
        <Divider className="my-8" />
        <div className="comments w-full lg:w-3/4 lg:items-start flex flex-col justify-center items-center ">
          <p className="font-semibold text-dark text-sm mb-4">Comments</p>
          {movieDetails.reviews.length === 0 ? (
            <p className="">no comments yet</p>
          ) : (
            movieDetails.reviews.map((r, i) => {
              return (
                <Comment
                  key={i}
                  author={r.username}
                  likeCount={r.likeCount}
                  createdAt={r.createdAt}
                  pictureUrl={r.pictureUrl}
                  comment={r.comment}
                />
              );
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MovieDetail;
