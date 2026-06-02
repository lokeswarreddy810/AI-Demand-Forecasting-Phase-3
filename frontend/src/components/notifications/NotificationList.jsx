function NotificationList({ notifications = [] }) {
  return (
    <div className="max-h-[400px] overflow-y-auto">
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          No notifications available
        </p>
      ) : (
        notifications.map((item, index) => (
          <div key={index} className="border-b border-gray-100 py-3">
            <p className="font-medium text-[#123f1f] dark:text-white">
              {item.message || item.activity || "Notification"}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              {item.created_at
                ? new Date(item.created_at).toLocaleString()
                : item.time || ""}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationList;