/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const useSearchReview = (query, page) => {
  const { appClient, fetchReviews } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setReviews([]);
  }, [query, page]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      fetchReviews(page).then((res) => {
        setReviews(res.data.reviews);
        setLoading(false);
        setTotalReviews(res.data.totalItems);
        setTotalPages(res.data.totalPages);
      });
    }
    if (query != "") {
      appClient({
        method: "GET",
        url: `/api/v1/admin/reviews/search`,
        params: {
          q: query,
          page: page,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setReviews((prev) => {
            return [...new Set([...prev, ...res.data.reviews])];
          });
          setTotalReviews(res.data.totalItems);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
      return () => cancel();
    }
  }, [query, page]);

  return { loading, reviews, error, totalReviews, totalPages };
};

export default useSearchReview;
