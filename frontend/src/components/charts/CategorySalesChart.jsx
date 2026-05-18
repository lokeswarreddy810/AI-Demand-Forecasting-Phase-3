import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function CategorySalesChart({ data }) {
  const colors = ["#7ed900", "#39a000", "#123f1f", "#a3e635", "#65a30d"];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-[#123f1f]">
        Category Sales Analytics
      </h2>

      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No category sales data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total_sales"
              nameKey="category"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategorySalesChart;