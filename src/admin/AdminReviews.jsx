/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReviewList from "./adminComponents/ReviewList";
import { useAppContext } from "../context/appContext";

const AdminReviews = () => {
  const { fetchReviews, searchReviews } = useAppContext();
  const [page, setPage] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [query, setQuery] = useState("");

  const updateReviews = () => {
    fetchReviews(page).then((res) => {
      setReviewList(res.data.reviews);
    });
  };

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length !== 0) {
      searchReviews(query, page).then((res) => {
        setInitialData(res.data);
        setReviewList((prev) => {
          if (page === 0) {
            return res.data.reviews;
          } else {
            return [...prev, ...res.data.reviews];
          }
        });
      });
    } else {
      fetchReviews(page).then((res) => {
        setInitialData(res.data);
        setReviewList(res.data.reviews);
      });
    }
  }, [page, query]);

  return (
    <div className="px-2 flex flex-col mx-auto">
      <p className="lg:text-2xl text-xl mt-8 font-semibold py-4 text-textColor">
        Reviews
      </p>
      <div className="flex items-center justify-between">
        <input
          type="text"
          className="py-2 mt-4 mb-8 pl-2 text-textColor border border-textColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[350px] sm:w-auto"
          placeholder="Search for reviews..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="relative min-h-[500px] w-[200px] sm:w-[400px] md:w-[400px] lg:max-w-[700px] lg:min-w-[600px] xl:min-w-[900px] overflow-x-scroll xl:overflow-x-hidden">
        <ReviewList updateReviews={updateReviews} reviewList={reviewList} />
        {reviewList.length === 0 && (
          <div className="flex justify-center items-center mt-40 text-textColor">
            <p>Review not found</p>
          </div>
        )}
      </div>
      <Pagination
        total={initialData.totalPages}
        initialPage={1}
        className="mt-8"
        onChange={(p) => {
          setPage(p - 1);
        }}
      />
    </div>
  );
};

export default AdminReviews;
