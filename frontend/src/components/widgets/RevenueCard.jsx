import KPICard from "./KPICard";

function RevenueCard({ value = 0 }) {
  return <KPICard title="Revenue" value={`₹ ${value}`} />;
}

export default RevenueCard;