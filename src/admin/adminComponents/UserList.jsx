/* eslint-disable react/prop-types */
import DeleteUserModal from "./DeleteUserModal";

const UserList = ({ users, updateUsers }) => {
  return (
    <table className="table-auto absolute overflow-scroll">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Id
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
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {user.roles.map((r, i) => {
                  return <span key={i}>{r}</span>;
                })}
                {user.roles.length === 0 && <p>-</p>}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {user.firstName + " " + user.lastName}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
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
              <td className=" px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                <DeleteUserModal updateUsers={updateUsers} userId={user.id} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
