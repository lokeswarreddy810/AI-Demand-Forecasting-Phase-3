import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

function NotificationDropdown() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {

    try {

      const response = await API.get(
        "/notifications/"
      );

      setNotifications(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="relative">

      <button className="text-2xl">
        🔔
      </button>

      <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-2xl border border-green-200 p-4 z-50">

        <h2 className="font-bold text-lg mb-4 text-[#123f1f]">
          Notifications
        </h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500">
            No notifications
          </p>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className="border-b py-3"
            >
              <p className="font-semibold text-[#123f1f]">
                {item.message}
              </p>

              <p className="text-sm text-gray-400">
                {item.type}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default NotificationDropdown;