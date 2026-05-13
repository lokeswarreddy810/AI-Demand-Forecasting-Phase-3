import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function SalesTrendChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-[#123f1f]">
        Monthly Sales Trends
      </h2>

      <ResponsiveContainer width="100%" height={420}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 40,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 14 }}
          />

          <YAxis
            tick={{ fontSize: 14 }}
            width={90}
            tickFormatter={(value) => `${value}`}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#39a000"
            strokeWidth={4}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesTrendChart;