import { Bell, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

function Navbar({ darkMode, setDarkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    try {
      const response = await API.get("/monitoring/logs");

      const latestLogs = (response.data || [])
        .slice(0, 5)
        .map((log) => ({
          message: log.activity,
          time: new Date(log.timestamp).toLocaleString(),
        }));

      setNotifications(latestLogs);
    } catch (error) {
      console.log("Notification Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <div className="h-20 bg-white dark:bg-[#1e1e1e] border-b border-green-200 dark:border-gray-700 flex items-center justify-between px-8 shadow-sm sticky top-0 z-40">
      <h1 className="text-2xl font-bold text-[#123f1f] dark:text-white">
        Advanced AI Demand Forecasting
      </h1>

      <div className="flex items-center gap-5 relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-3 rounded-full"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" size={22} />
          ) : (
            <Moon className="text-[#123f1f]" size={22} />
          )}
        </button>

        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative bg-[#f5fff0] dark:bg-[#2a2a2a] p-3 rounded-full"
        >
          <Bell className="text-[#123f1f] dark:text-white" size={22} />

          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute top-16 right-0 w-[350px] bg-white dark:bg-[#1e1e1e] border border-green-200 dark:border-gray-700 rounded-2xl shadow-xl p-5 z-50">
            <h2 className="text-xl font-bold text-[#123f1f] dark:text-white mb-4">
              Notifications
            </h2>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-gray-500 text-center py-6">
                  No notifications available
                </div>
              ) : (
                notifications.map((item, index) => (
                  <div key={index} className="border-b border-gray-100 py-3">
                    <p className="font-medium text-[#123f1f] dark:text-white">
                      {item.message}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.time}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;