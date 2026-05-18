import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function RegionSalesChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-[#123f1f]">
        Region Sales Analytics
      </h2>

      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No region sales data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis width={90} />
            <Tooltip />
            <Bar dataKey="total_sales" fill="#7ed900" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default RegionSalesChart;