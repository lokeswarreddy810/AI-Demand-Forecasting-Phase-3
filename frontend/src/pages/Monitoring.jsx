import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Monitoring() {
  const [logs, setLogs] = useState([]);

  const loadLogs = async () => {
    try {
      const response = await API.get("/monitoring/logs");
      setLogs(response.data || []);
    } catch (error) {
      console.log("Monitoring Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white mb-8">
        System Monitoring
      </h1>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200">
        <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white mb-8">
          Activity Logs
        </h2>

        <div className="overflow-x-auto max-h-[600px] overflow-y-auto rounded-xl border border-green-200">
          <table className="w-full min-w-[900px]">
            <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
              <tr className="border-b border-green-200 text-left">
                <th className="py-4 px-4">User</th>
                <th className="py-4 px-4">Activity</th>
                <th className="py-4 px-4">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500">
                    No logs available
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-100">
                    <td className="py-4 px-4">{log.username}</td>
                    <td className="py-4 px-4">{log.activity}</td>
                    <td className="py-4 px-4">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Monitoring;