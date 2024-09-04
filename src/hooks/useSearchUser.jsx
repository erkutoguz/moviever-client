/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import axios from "axios";

const useSearchUser = (query, page) => {
  const { appClient, fetchUsers } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setUsers([]);
  }, [query, page]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const trimmedQuery = query.trim();
    if (trimmedQuery.length === 0) {
      fetchUsers(page).then((res) => {
        setUsers(res.data.users);
        setLoading(false);
        setTotalUsers(res.data.totalItems);
        setTotalPages(res.data.totalPages);
      });
    }
    if (query != "") {
      appClient({
        method: "GET",
        url: `/api/v1/admin/users/search`,
        params: {
          q: query,
        },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          console.log(res.data);

          setUsers((prev) => {
            return [...new Set([...prev, ...res.data.users])];
          });
          setTotalUsers(res.data.totalItems);
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

  return { loading, users, error, totalUsers, totalPages };
};

export default useSearchUser;
