import KPICard from "./KPICard";

function InventoryCard({ value = "Low" }) {
  return <KPICard title="Inventory Risk" value={value} />;
}

export default InventoryCard;