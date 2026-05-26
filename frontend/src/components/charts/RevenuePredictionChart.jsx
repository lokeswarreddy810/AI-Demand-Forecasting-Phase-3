import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function RevenuePredictionChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-[#123f1f]">
        Revenue Prediction Analytics
      </h2>

      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No revenue prediction data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="forecast_date" />
            <YAxis width={90} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="predicted_revenue"
              stroke="#123f1f"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default RevenuePredictionChart;