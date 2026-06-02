import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

function ForecastComparisonChart({ data = [] }) {
  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        No forecast comparison data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="model_name" />
        <YAxis width={90} />
        <Tooltip />
        <Legend />
        <Bar dataKey="accuracy" fill="#9dff00" />
        <Bar dataKey="confidence_score" fill="#123f1f" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ForecastComparisonChart;