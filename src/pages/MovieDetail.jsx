/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Divider, Image } from "@nextui-org/react";

import Comment from "../components/common/Comment";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import MakeComment from "../components/common/MakeComment";
import AddWatchlistModal from "../components/common/AddWatchlistModal";
import HeartIcon from "../assets/icons/HeartIcon";
import OutlinedHeartIcon from "../assets/icons/OutlinedHeartIcon";
import { capitalizeText } from "../utils/textFormatter";

function MovieDetail() {
  const { movieId } = useParams();
  const [likedReviews, setLikedMovies] = useState([]);
  const [movieDetails, setMoviesDetails] = useState({});
  const {
    fetchLikedReviews,
    fetchMovieDetailsWithMovieId,
    unlikeMovie,
    likeMovie,
    fetchMovieReviews,
  } = useAppContext();
  const [isUserLiked, setIsUserLiked] = useState(movieDetails.isUserLiked);
  const [likeCount, setLikeCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchMovieDetailsWithMovieId(movieId).then((res) => {
      setMoviesDetails(res.data);
      setIsUserLiked(res.data.isUserLiked);
      setLikeCount(res.data.likeCount);
    });
    fetchLikedReviews(movieId).then((res) => {
      setLikedMovies(res.data.reviewIds);
    });
    fetchMovieReviews(movieId)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toogleLike = () => {
    if (isUserLiked) {
      unlikeMovie(movieDetails.id).then((res) => {
        setIsUserLiked(!isUserLiked);
        setLikeCount(likeCount - 1);
      });
    } else {
      likeMovie(movieDetails.id).then((res) => {
        setIsUserLiked(!isUserLiked);
        setLikeCount(likeCount + 1);
      });
    }
  };

  const updateReviews = () => {
    fetchMovieReviews(movieId).then((res) => {
      setReviews(res.data);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full text-textColor ">
      <Header />
      {movieDetails && likedReviews && (
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
                <div className="flex justify-between items-center gap-4">
                  <p className="text-base ">{movieDetails.title}</p>
                  <div className="categories flex gap-1">
                    {movieDetails.categories &&
                      movieDetails.categories.map((c, i) => {
                        return (
                          <p
                            key={i}
                            className="hover:cursor-pointer hover:bg-makeCommentBg rounded-sm duration-300 border-b-1 p-2 text-sm"
                            onClick={() =>
                              navigate(`/movies/category/${c.categoryType}`)
                            }
                          >
                            {capitalizeText(c.categoryType)}
                          </p>
                        );
                      })}
                  </div>
                </div>
                <div className="flex gap-0.5 items-center mt-2">
                  {isUserLiked ? (
                    <HeartIcon
                      className={` w-6 cursor-pointer text-danger`}
                      onClick={toogleLike}
                    />
                  ) : (
                    <OutlinedHeartIcon
                      className="cursor-pointer w-6"
                      onClick={toogleLike}
                    />
                  )}

                  <p>{likeCount}</p>
                </div>
              </div>
            </div>

            <div className="about w-full lg:mt-8 lg:px-4 mt-4">
              <p className="font-semibold  text-sm">Description</p>
              <p className="w-full text-gray-700 dark:text-gray-300 text-sm leading-relaxed mt-2 lg:mt-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda dignissimos corporis consequatur dolorem iusto ullam
                rem sequi esse repudiandae? A in maiores corrupti dolorum quo
                itaque saepe minima adipisci non!
              </p>
              <Divider className="my-4 " />

              <div className="director flex gap-2">
                <p className="font-semibold  text-sm ">Director</p>
                <p className="text-sm">{movieDetails.director}</p>
              </div>
              <Divider className="my-4" />
              <div className="releaseYear flex gap-2">
                <p className="font-semibold  text-sm ">Release Year</p>
                <p className="text-sm">{movieDetails.releaseYear}</p>
              </div>
              <Divider className="my-4" />
              <div className="rating flex gap-2">
                <p className="font-semibold  text-sm">Rating</p>
                <p className="text-sm">{movieDetails.rating}</p>
              </div>
              <div className="add-watchlist my-4 ">
                <AddWatchlistModal movieId={movieId} />
              </div>
            </div>
          </div>
          <Divider className="my-8" />
          <div className="trailer-wrapper w-3/4 h-full">
            <p className="font-semibold  text-sm mb-4">Trailer</p>

            <ReactPlayer
              className="react-player"
              url={movieDetails.trailerUrl}
              width="100%"
              controls={true}
            />
          </div>
          <Divider className="my-8" />
          <div className="comments w-full lg:w-3/4 lg:items-start flex flex-col justify-center items-center ">
            <p className="font-semibold text-sm mb-4">Comments</p>
            {movieDetails && (
              <MakeComment
                movieId={movieDetails.id}
                updateReviews={updateReviews}
              />
            )}
            {reviews.length === 0 ? (
              <>
                <p className="">no comments yet</p>
              </>
            ) : (
              reviews &&
              reviews.map((r, i) => {
                return (
                  <Comment
                    key={i}
                    author={r.username}
                    likeCount={r.likeCount}
                    createdAt={r.createdAt}
                    pictureUrl={r.pictureUrl}
                    comment={r.comment}
                    reviewId={r.id}
                    movieId={movieId}
                    updateReviews={updateReviews}
                    liked={likedReviews.includes(r.id)}
                  />
                );
              })
            )}
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}

export default MovieDetail;
