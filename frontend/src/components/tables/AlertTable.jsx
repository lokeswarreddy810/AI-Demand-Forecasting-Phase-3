import ReusableTable from "./ReusableTable";

function AlertTable({ data = [] }) {
  return (
    <ReusableTable
      headers={["Type", "Message", "Status", "Created At"]}
      rows={data.map((item) => [
        item.alert_type,
        item.message,
        item.is_read ? "Read" : "Unread",
        item.created_at ? new Date(item.created_at).toLocaleString() : "N/A",
      ])}
      emptyMessage="No alerts available"
    />
  );
}

export default AlertTable;