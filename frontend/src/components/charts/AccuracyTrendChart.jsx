import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function AccuracyTrendChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No accuracy trend data available
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
        <Legend />

        <Line
          type="monotone"
          dataKey="linear_regression"
          stroke="#123f1f"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="random_forest"
          stroke="#9dff00"
          strokeWidth={3}
        />

        <Line
          type="monotone"
          dataKey="gradient_boosting"
          stroke="#4caf50"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default AccuracyTrendChart;