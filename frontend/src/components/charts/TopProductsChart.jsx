import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TopProductsChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <h2 className="text-xl font-bold mb-5 text-[#123f1f]">
        Top Products
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>
          <XAxis dataKey="product_name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity" fill="#8ee000" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopProductsChart;