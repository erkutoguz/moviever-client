/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/appContext";
import DeleteUserModal from "./adminComponents/DeleteUserModal";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { fetchUsers, searchUsers } = useAppContext();
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const observer = useRef();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const updateUsers = (userId) => {
    setLoading(true);
    fetchUsers(page).then((res) => {
      const prevList = users.filter((u) => u.id !== userId);

      setUsers((prev) => {
        return [...res.data.users, ...prevList];
      });
      setHasMore(res.data.users.length > 0);
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   setLoading(true);

  //   fetchUsers(page).then((res) => {
  //     setUsers((prev) => {
  //       return [...prev, ...res.data.users];
  //     });
  //     setHasMore(res.data.users.length > 0);
  //     setLoading(false);
  //   });
  // }, [page]);

  useEffect(() => {
    setPage(0);
  }, [query]);

  useEffect(() => {
    setLoading(true);

    const trimmedQuery = query.trim();
    if (trimmedQuery.length !== 0) {
      searchUsers(query, page).then((res) => {
        setUsers((prev) => {
          if (page === 0) {
            return res.data.users;
          } else {
            return [...prev, ...res.data.users];
          }
        });
        setHasMore(res.data.users.length > 0);
        setLoading(false);
      });
    } else {
      fetchUsers(page).then((res) => {
        setUsers((prev) => {
          if (page === 0) {
            return res.data.users;
          } else {
            return [...prev, ...res.data.users];
          }
        });
        setHasMore(res.data.users.length > 0);
        setLoading(false);
      });
    }
  }, [page, query]);

  return (
    <div className="max-w-[250px] min-w-[200px] sm:max-w-[600px] sm:min-w-[600px] md:max-w-[750px] md:min-w-[750px] lg:max-w-full  mx-auto my-8">
      <p className="text-2xl font-semibold py-4 text-textColor">User List</p>
      <div className="search-user">
        <input
          type="text"
          className="py-2 mt-4 mb-8 pl-4 text-textColor border border-textColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[150px] sm:w-auto"
          placeholder="Search for users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        {!loading && users && (
          <table className=" min-w-full border-gray-200 lg:min-w-[1000px]">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
                  User Id
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
                  Username
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
                  Roles
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
                  Full Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                if (index === users.length - 1) {
                  return (
                    <tr
                      key={index}
                      ref={lastElementRef}
                      className="border-t hover:bg-commentBg duration-200"
                    >
                      <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-textColor">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-textColor">
                        {user.roles.map((r, i) => {
                          return <span key={i}>{r}</span>;
                        })}
                        {user.roles.length === 0 && <p>-</p>}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-textColor">
                        {user.firstName + " " + user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm">
                        <p
                          className={`${
                            user.enabled ? "bg-green-400" : "bg-red-500"
                          } px-2 py-1 w-[64px] text-center rounded-lg`}
                        >
                          {user.enabled ? "Active" : "Passive"}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm font-medium">
                        <DeleteUserModal
                          updateUsers={updateUsers}
                          userId={user.id}
                        />
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr
                      key={index}
                      className="border-t hover:bg-commentBg duration-200"
                    >
                      <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-textColor">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-textColor">
                        {user.roles.map((r, i) => {
                          return <span key={i}>{r}</span>;
                        })}
                        {user.roles.length === 0 && <p>-</p>}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm text-textColor">
                        {user.firstName + " " + user.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm ">
                        <p
                          className={`${
                            user.enabled
                              ? "bg-green-400 shadow-lime-500"
                              : "bg-red-500 shadow-pink-700"
                          } px-2 py-1 w-[64px] text-center rounded-lg shadow `}
                        >
                          {user.enabled ? "Active" : "Passive"}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-wrap text-sm font-medium">
                        <DeleteUserModal
                          updateUsers={updateUsers}
                          userId={user.id}
                        />
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
