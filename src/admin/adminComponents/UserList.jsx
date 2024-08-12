/* eslint-disable react/prop-types */

import { useEffect } from "react";
import DeleteIcon from "../../assets/icons/DeleteIcon";

const UserList = ({ users }) => {
  useEffect(() => {}, []);
  return (
    <div className="overflow-x-auto">
      <table className=" min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 ">
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
          {users.map((user, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
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
                <button className="text-indigo-600 hover:text-indigo-900">
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
