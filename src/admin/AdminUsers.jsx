/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Pagination } from "@nextui-org/react";
import UserList from "./adminComponents/UserList";
import useSearchUser from "../hooks/useSearchUser";

const AdminUsers = () => {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const { loading, users, totalUsers, totalPages } = useSearchUser(query, page);

  const updateUsers = () => {
    window.location.reload();
  };

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

      <div className="relative min-h-[500px] w-[200px] sm:w-[400px] md:w-[600px] lg:max-w-[900px] lg:min-w-[800px] xl:min-w-[1100px]">
        <UserList users={users} updateUsers={updateUsers} />
        {users.length === 0 && (
          <div className="flex justify-center items-center mt-40 text-textColor">
            <p>User not found</p>
          </div>
        )}
      </div>

      {!loading && (
        <Pagination
          total={totalPages}
          initialPage={page + 1}
          className="mt-8"
          size="sm"
          onChange={(p) => {
            setPage(p - 1);
          }}
        />
      )}
    </div>
  );
};

export default AdminUsers;
