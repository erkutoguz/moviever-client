/* eslint-disable react/prop-types */
import DeleteReviewModal from "../../components/common/DeleteReviewModal";

const ReviewList = ({ reviewList, updateReviews }) => {
  return (
    <table className="table-auto absolute overflow-scroll">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Id
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Owner
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Movie
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Review
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Like Count
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Created At
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {reviewList.map((r, index) => {
          return (
            <tr
              key={index}
              className="border-t hover:bg-commentBg duration-200"
            >
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {r.id}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {r.username}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {r.movieName}
              </td>
              <td className="px-6 py-4  whitespace-wrap text-sm font-medium text-textColor text-wrap">
                {r.review}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {r.likeCount}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {r.createdAt}
              </td>

              <td className=" px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                <DeleteReviewModal
                  updateReviews={updateReviews}
                  movieId={r.movieId}
                  reviewId={r.id}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReviewList;
