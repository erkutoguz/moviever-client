/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import LogList from "./adminComponents/LogList";

const AdminErrorLogs = () => {
  const [page, setPage] = useState(0);
  const { fetchUserLogs, downloadLog } = useAppContext();
  const [logs, setLogs] = useState([]);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    fetchUserLogs(page, "error").then((res) => {
      setInitialData(res.data);
      setLogs(res.data.logs);
    });
  }, [page]);

  return (
    <div className="px-2 flex flex-col mx-auto">
      <p className="lg:text-2xl text-xl mt-8 font-semibold py-4 text-textColor">
        Error Logs
      </p>

      <div className="relative min-h-[500px] w-[200px] sm:w-[400px] md:w-[400px] lg:max-w-[500px] lg:min-w-[500px] xl:min-w-[500px] overflow-x-scroll xl:overflow-x-hidden">
        <LogList logs={logs} downloadLog={downloadLog} />
        {logs.length === 0 && (
          <div className="flex justify-center items-center mt-40 text-textColor">
            <p>No logs avaible</p>
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

export default AdminErrorLogs;
