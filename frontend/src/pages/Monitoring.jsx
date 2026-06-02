import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import PageLoader from "../components/loaders/PageLoader";
import ReusableTable from "../components/tables/ReusableTable";

function Monitoring() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      setLoading(true);

      const response = await API.get("/monitoring/logs");

      setLogs(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.log(
        "Monitoring Error:",
        error.response?.data || error.message
      );

      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const tableRows = logs.map((log) => [
    log.username || "Unknown",
    log.activity || "Activity",
    log.timestamp
      ? new Date(log.timestamp).toLocaleString()
      : "N/A",
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          System Monitoring
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Monitor user activities, system events, and audit logs.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white">
            Activity Logs
          </h2>

          <button
            onClick={loadLogs}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] font-bold px-6 py-3 rounded-xl"
          >
            Refresh Logs
          </button>
        </div>

        <ReusableTable
          headers={[
            "User",
            "Activity",
            "Timestamp",
          ]}
          rows={tableRows}
          emptyMessage="No logs available"
        />
      </div>
    </div>
  );
}

export default Monitoring;