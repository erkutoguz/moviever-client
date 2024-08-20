/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import { useCallback } from "react";

const LogList = ({ logs, downloadLog }) => {
  const columns = [
    { name: "Log Name", uid: "logName" },
    { name: "Download", uid: "actions" },
  ];

  const renderCell = useCallback((logs, columnKey) => {
    const cellValue = logs[columnKey];

    switch (columnKey) {
      case "logName":
        return <p className=" text-textColor">{cellValue}</p>;

      case "actions":
        return (
          <div className="relative flex justify-center   items-center gap-2">
            <Button
              className="bg-transparent"
              onPress={() => {
                downloadLog(logs.logName).then((res) => {});
              }}
              aria-label="download-log-button"
            >
              <DownloadIcon />
            </Button>
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
      <TableBody items={logs}>
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

export default LogList;
