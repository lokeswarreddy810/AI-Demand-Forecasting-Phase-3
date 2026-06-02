import { Bell } from "lucide-react";

function NotificationBell({ count = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative bg-[#f5fff0] dark:bg-[#2a2a2a] p-3 rounded-full"
    >
      <Bell className="text-[#123f1f] dark:text-white" size={22} />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </button>
  );
}

export default NotificationBell;