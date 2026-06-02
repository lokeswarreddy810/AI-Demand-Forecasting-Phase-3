import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAlerts, markAlertRead } from "../services/notificationService";
import PageLoader from "../components/loaders/PageLoader";
import ReusableTable from "../components/tables/ReusableTable";

function Alerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = async () => {
    try {
      setLoading(true);

      const data = await getAlerts();

      setAlerts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Alerts Error:", error);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleRead = async (id) => {
    await markAlertRead(id);

    await loadAlerts();

    window.dispatchEvent(
      new CustomEvent("notification-updated")
    );
  };

  if (loading) {
    return <PageLoader />;
  }

  const tableRows = alerts.map((alert) => [
    alert.alert_type,
    alert.message,
    alert.is_read ? "Read" : "Unread",
    !alert.is_read ? (
      <button
        onClick={() => handleRead(alert.id)}
        className="bg-[#9dff00] text-[#032b11] px-4 py-2 rounded-lg font-bold"
      >
        Mark Read
      </button>
    ) : (
      <span className="text-gray-500 dark:text-gray-300">
        Completed
      </span>
    ),
  ]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Alerts & Notifications
        </h1>

        <div className="flex gap-4">
          <button
            onClick={loadAlerts}
            className="bg-[#9dff00] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Refresh
          </button>

          <button
            onClick={() => navigate("/alert-settings")}
            className="bg-[#123f1f] text-white px-6 py-3 rounded-xl"
          >
            Alert Settings
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <ReusableTable
          headers={["Type", "Message", "Status", "Action"]}
          rows={tableRows}
          emptyMessage="No alerts available"
        />
      </div>
    </div>
  );
}

export default Alerts;