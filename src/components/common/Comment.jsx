/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from "@nextui-org/react";
import { timeAgo } from "../../utils/dataFormatter";
import heartIcon from "../../assets/icons/heart.svg";
import likedHeartIcon from "../../assets/icons/liked-heart.png";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
function Comment({
  reviewId,
  author,
  createdAt,
  comment,
  pictureUrl,
  likeCount,
  liked,
}) {
  useEffect(() => {
    console.log(liked);
    console.log(isLiked);
  }, []);
  const [isLiked, setLiked] = useState(liked);
  const { likeReview, unlikeReview } = useAppContext();
  const toogleLike = () => {
    if (isLiked) {
      unlikeReview(reviewId).then((res) => {
        setLiked(!isLiked);
      });
    } else {
      likeReview(reviewId).then((res) => {
        setLiked(!isLiked);
      });
    }
  };

  return (
    <div className="w-full max-w-[600px] lg:max-w-full border p-8 bg-slate-200 rounded-sm mb-4">
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
        <p className="text-sm">{timeAgo(createdAt)}</p>
      </div>
      <div className="comment mt-4">
        <p className="text-sm ">{comment}</p>
        <div className="flex items-center gap-2 mt-2" onClick={toogleLike}>
          {isLiked ? (
            <img
              src={heartIcon}
              className="w-6 hover:cursor-pointer"
              alt="heart-icon"
            />
          ) : (
            <img
              src={likedHeartIcon}
              className="w-6 hover:cursor-pointer"
              alt="heart-icon"
            />
          )}
          <p>{likeCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
