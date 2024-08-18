/* eslint-disable react/prop-types */

import { Button } from "@nextui-org/react";
import DownloadIcon from "../../assets/icons/DownloadIcon";

const LogList = ({ logs, downloadLog }) => {
  return (
    <table className="table-auto absolute overflow-scroll">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            File Name
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => {
          return (
            <tr
              key={index}
              className="border-t hover:bg-commentBg duration-200"
            >
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {log}
              </td>

              <td className=" px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                <Button
                  className="bg-transparent"
                  onPress={() => {
                    downloadLog(log).then((res) => {
                      console.log(res);
                    });
                  }}
                  aria-label="download-log-button"
                >
                  <DownloadIcon />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default LogList;
