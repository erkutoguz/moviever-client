/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import { useCallback } from "react";
import UserPermissionsModal from "./UserPermissionsModal";
import DeleteUserModal from "./DeleteUserModal";

const UserList = ({ users, updateUsers }) => {
  const columns = [
    { name: "Id", uid: "id" },
    { name: "Username", uid: "username" },
    { name: "Email", uid: "email" },
    { name: "Roles", uid: "roles" },
    { name: "Status", uid: "enabled" },
    { name: "Full Name", uid: "fullName" },
    { name: "Actions", uid: "actions" },
  ];
  const statusColorMap = {
    true: "success",
    false: "danger",
  };
  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "id":
        return <p className=" text-textColor">{cellValue}</p>;
      case "username":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.pictureUrl }}
            name={cellValue}
            className=" text-textColor"
          >
            {user.username}
          </User>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );
      case "fullName":
        return (
          <div className="flex flex-col capitalize">
            <p className="text-bold text-sm text-textColor">{user.firstName}</p>
            <p className="text-bold text-sm  text-textColor">{user.lastName}</p>
          </div>
        );
      case "roles":
        return (
          <div className="flex flex-col">
            {cellValue.map((r, i) => {
              return (
                <p
                  key={i}
                  className="text-bold text-sm capitalize text-textColor"
                >
                  {r}
                </p>
              );
            })}
          </div>
        );
      case "enabled":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.enabled]}
            size="sm"
            variant="flat"
          >
            {cellValue ? "Active" : "Passive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center   items-center gap-2">
            <Tooltip content="Permissions">
              <UserPermissionsModal
                userId={user.id}
                status={user.enabled}
                updateUsers={updateUsers}
              />
            </Tooltip>
            <Tooltip content="Delete User">
              <DeleteUserModal updateUsers={updateUsers} userId={user.id} />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <Table aria-label="user-list">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserList;
