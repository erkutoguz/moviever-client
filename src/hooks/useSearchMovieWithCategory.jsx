/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const useSearchMovieWithCategory = (query, categoryName, page) => {
  const { appClient, fetchAllMovies } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setMovies([]);
  }, [query, categoryName, page]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      fetchAllMovies(categoryName, page, 6).then((res) => {
        setMovies(res.data.movies);
        setLoading(false);
        setTotalPages(res.data.totalPages);
        setTotalMovies(res.data.totalItems);
      });
    }

    if (query != "") {
      appClient({
        method: "GET",
        url: `/api/v1/movies/search`,
        params: {
          q: query,
          category: categoryName,
          page: page,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setMovies((prev) => {
            return [...new Set([...prev, ...res.data.movies])];
          });
          setTotalMovies(res.data.totalItems);
          setTotalPages(res.data.totalPages);
          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
          console.log(e);
        });
      return () => cancel();
    }
  }, [query, page, categoryName]);

  return { loading, movies, error, totalMovies, totalPages };
};

export default useSearchMovieWithCategory;
