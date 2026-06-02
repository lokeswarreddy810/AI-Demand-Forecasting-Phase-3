import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, User } from "lucide-react";

import NotificationBell from "./notifications/NotificationBell";
import NotificationList from "./notifications/NotificationList";
import GlobalSearch from "./GlobalSearch";
import { getAlerts, markAlertRead } from "../services/notificationService";

function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    try {
      const data = await getAlerts();
      const alertList = Array.isArray(data) ? data : [];

      setNotifications(alertList);

      const unread = alertList.filter((item) => !item.is_read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.log("Notification Error:", error);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    const handleNotificationUpdate = () => {
      loadNotifications();
    };

    window.addEventListener("notification-updated", handleNotificationUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener(
        "notification-updated",
        handleNotificationUpdate
      );
    };
  }, []);

  const toggleNotifications = async () => {
    const nextOpen = !open;
    setOpen(nextOpen);

    if (nextOpen) {
      const unreadAlerts = notifications.filter((item) => !item.is_read);

      setUnreadCount(0);

      try {
        await Promise.all(unreadAlerts.map((item) => markAlertRead(item.id)));

        setNotifications((prev) =>
          prev.map((item) => ({
            ...item,
            is_read: true,
          }))
        );
      } catch (error) {
        console.log("Mark Read Error:", error);
      }
    }
  };

  useEffect(() => {
    let timer;

    if (open) {
      timer = setTimeout(() => {
        setOpen(false);
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [open]);

  const toggleDarkMode = () => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    } else {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    }

    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-[#1e1e1e] shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-40">
      <GlobalSearch />

      <div className="flex items-center gap-4">
        <div className="relative">
          <NotificationBell
            count={unreadCount}
            onClick={toggleNotifications}
          />

          {open && (
            <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-[#1e1e1e] shadow-xl rounded-xl p-4 border border-green-200 z-50">
              <NotificationList notifications={notifications} />
            </div>
          )}
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-[#f5fff0] dark:bg-[#2a2a2a]"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-[#123f1f]" />
          )}
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="p-3 rounded-full bg-[#9dff00] hover:bg-[#b7ff39] transition"
        >
          <User size={20} className="text-[#032b11]" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;