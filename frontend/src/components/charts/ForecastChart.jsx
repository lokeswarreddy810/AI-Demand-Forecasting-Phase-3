import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ForecastChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <h2 className="text-xl font-bold mb-5 text-[#123f1f]">
        AI Forecast Prediction
      </h2>

      {data.length === 0 ? (
        <div className="h-[360px] flex items-center justify-center border border-dashed border-green-300 rounded-xl text-gray-500">
          No forecast data available. Click Refresh Forecast after uploading dataset.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="forecast_date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="predicted_quantity"
              stroke="#39a000"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ForecastChart;