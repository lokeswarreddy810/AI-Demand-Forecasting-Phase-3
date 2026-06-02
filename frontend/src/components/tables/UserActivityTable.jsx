import ReusableTable from "./ReusableTable";

function UserActivityTable({ data = [] }) {
  return (
    <ReusableTable
      headers={["Activity", "Created At"]}
      rows={data.map((item) => [
        item.activity,
        item.created_at ? new Date(item.created_at).toLocaleString() : "N/A",
      ])}
      emptyMessage="No user activity available"
    />
  );
}

export default UserActivityTable;