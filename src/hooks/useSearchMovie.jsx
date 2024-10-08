/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const useSearchMovie = (query, category) => {
  const { appClient } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      return;
    }
    if (query != "") {
      appClient({
        method: "GET",
        url: `api/v1/movies/search`,
        params: {
          q: query,
          category: category,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setMovies((prev) => {
            return [...new Set([...prev, ...res.data.movies])];
          });

          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
          console.log(e);
        });
      return () => cancel();
    }
  }, [query]);

  return { loading, movies, error };
};

export default useSearchMovie;
