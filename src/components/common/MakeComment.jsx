/* eslint-disable react/prop-types */
import { Avatar, Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import SendIcon from "../../assets/icons/SendIcon";

function MakeComment({ movieId, updateReviews }) {
  const [review, setReview] = useState("");
  const { user, makeReview, userProfilePicture } = useAppContext();
  const [isReviewChanged, setReviewChanged] = useState(false);
  const [isReviewInvalid, setReviewInvalid] = useState(false);

  return (
    <div
      className={`w-full max-w-[600px] lg:max-w-full border border-dark p-8 bg-makeCommentBg rounded-sm mb-4`}
    >
      <div className="flex items-center">
        {userProfilePicture === "null" ? (
          <Avatar
            name={user}
            as="button"
            className="transition-transform"
            color="secondary"
            size="sm"
            isBordered
          />
        ) : (
          <Avatar
            src={userProfilePicture}
            as="button"
            className="transition-transform"
            color="secondary"
            size="sm"
            isBordered
          />
        )}
        <p className="ml-4 text-sm  text-btnColor truncate hover:text-clip">
          {user}
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        <Textarea
          placeholder="Enter your review"
          value={review}
          isInvalid={isReviewInvalid}
          onValueChange={(v) => {
            setReview(v);
            setReviewChanged(true);
          }}
          errorMessage="Invalid review"
          validate={(value) => {
            if (
              isReviewChanged &&
              (value === undefined ||
                value === "" ||
                value.trim() === "" ||
                value === null)
            ) {
              setReviewInvalid(true);
            } else if (value.length > 255) {
              setReviewInvalid(true);
            } else {
              setReviewInvalid(false);
            }
          }}
        />
        <div className="make-review h-[76px] flex justify-center items-center ">
          <Button
            className={`min-w-10 max-w-10 p-0 m-0 `}
            aria-label="send-button"
            onPress={async () => {
              if (!isReviewInvalid) {
                await makeReview(movieId, review);
                await updateReviews();
                await setReview("");
                await setReviewChanged(false);
              }
            }}
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MakeComment;
