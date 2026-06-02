import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function InventoryRiskChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No inventory risk data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product_name" />
        <YAxis width={90} />
        <Tooltip />
        <Bar dataKey="average_quantity" fill="#123f1f" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default InventoryRiskChart;