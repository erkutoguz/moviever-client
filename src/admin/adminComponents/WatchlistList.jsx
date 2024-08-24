/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { useCallback } from "react";
import DeleteWatchlistModal from "../../components/common/DeleteWatchlistModal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

const WatchlistList = ({ watchlists, updateWatchlists }) => {
  const columns = [
    { name: "Id", uid: "id" },
    { name: "Owner", uid: "username" },
    { name: "Watchlist Name", uid: "watchlistName" },
    { name: "Actions", uid: "actions" },
  ];

  const renderCell = useCallback((watchlist, columnKey) => {
    const cellValue = watchlist[columnKey];

    switch (columnKey) {
      case "id":
        return <p className=" text-textColor">{cellValue}</p>;

      case "username":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );
      case "watchlistName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm  text-textColor">{cellValue}</p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex justify-center   items-center gap-2">
            <DeleteWatchlistModal
              updateWatchlists={updateWatchlists}
              watchlistId={watchlist.id}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <Table aria-label="watchlist">
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
      <TableBody items={watchlists}>
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

export default WatchlistList;
