/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar, Button } from "@nextui-org/react";
import { timeAgo } from "../../utils/dataFormatter";

import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import DeleteReviewModal from "./DeleteReviewModal";
import HeartIcon from "../../assets/icons/HeartIcon";
import OutlinedHeartIcon from "../../assets/icons/OutlinedHeartIcon";
function Comment({
  reviewId,
  author,
  createdAt,
  comment,
  pictureUrl,
  likeCount,
  liked,
  movieId,
  updateReviews,
}) {
  const [isLiked, setLiked] = useState(liked);
  const [likeCountState, setLikedCountState] = useState(likeCount);
  const { likeReview, unlikeReview, user } = useAppContext();

  const toogleLike = () => {
    if (isLiked) {
      unlikeReview(reviewId).then((res) => {
        setLiked(!isLiked);
        setLikedCountState(likeCountState - 1);
      });
    } else {
      likeReview(reviewId).then((res) => {
        setLiked(!isLiked);
        setLikedCountState(likeCountState + 1);
      });
    }
  };

  return (
    <div
      className={`w-full max-w-[600px] lg:max-w-full border border-dark p-8 bg-commentBg rounded-sm mb-4`}
    >
      <div className="profile flex items-center justify-between w-full">
        <div className="flex items-center">
          {pictureUrl === null ? (
            <Avatar
              name={author}
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              isBordered
            />
          ) : (
            <Avatar
              src={pictureUrl}
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              isBordered
            />
          )}
          <p className="ml-4 text-sm  text-btnColor truncate hover:text-clip">
            {author}
          </p>
        </div>
        <div className="">
          <p className="text-sm">{timeAgo(createdAt)} </p>
          {user === author && (
            <DeleteReviewModal
              reviewId={reviewId}
              movieId={movieId}
              updateReviews={updateReviews}
            />
          )}
        </div>
      </div>
      <div className="comment mt-4">
        <p className="text-sm ">{comment}</p>
        <div className="flex items-center gap-2 mt-2">
          {isLiked ? (
            <HeartIcon
              className={`text-danger w-6 cursor-pointer`}
              onClick={toogleLike}
            />
          ) : (
            <OutlinedHeartIcon
              className="cursor-pointer w-6"
              onClick={toogleLike}
            />
          )}

          <p>{likeCountState}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
