/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import { Pagination } from "@nextui-org/react";
import UserList from "./adminComponents/UserList";

const AdminUsers = () => {
  const [initialData, setInitialData] = useState([]);
  const { fetchUsers, searchUsers } = useAppContext();
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const updateUsers = () => {
    fetchUsers(page).then((res) => {
      setUsers(res.data.users);
    });
  };

  useEffect(() => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length !== 0) {
      searchUsers(query, page).then((res) => {
        setInitialData(res.data);
        setUsers((prev) => {
          if (page === 0) {
            return res.data.users;
          } else {
            return [...prev, ...res.data.users];
          }
        });
      });
    } else {
      fetchUsers(page).then((res) => {
        setInitialData(res.data);
        setUsers(res.data.users);
      });
    }
  }, [page, query]);

  return (
    <div className="px-2 flex flex-col mx-auto">
      <p className="lg:text-2xl text-xl mt-8 font-semibold py-4 text-textColor">
        User List
      </p>

      <input
        type="text"
        className="py-2 mt-4 mb-8 pl-2 text-textColor border border-textColor rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[350px] sm:w-auto"
        placeholder="Search for users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="relative min-h-[500px] w-[200px] sm:w-[400px] md:w-[600px] lg:max-w-[900px] lg:min-w-[800px] xl:w-[900px] overflow-x-scroll">
        <UserList users={users} updateUsers={updateUsers} />
        {users.length === 0 && (
          <div className="flex justify-center items-center mt-40 text-textColor">
            <p>User not found</p>
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

export default AdminUsers;
