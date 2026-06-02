import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function SalesTrendChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No sales trend data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis width={90} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total_sales"
          stroke="#123f1f"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SalesTrendChart;