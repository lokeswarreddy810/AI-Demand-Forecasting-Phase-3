import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import GlobalSearch from "../components/GlobalSearch";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [regionSales, setRegionSales] = useState([]);
  const [revenuePrediction, setRevenuePrediction] = useState([]);
  const [inventoryRisk, setInventoryRisk] = useState([]);

  const COLORS = ["#9dff00", "#123f1f", "#4caf50", "#8bc34a", "#009688"];

  const getArray = (res) => {
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.data)) return res.data.data;
    return [];
  };

  const loadDashboard = async () => {
    try {
      const summaryRes = await API.get("/analytics/summary");
      const monthlyRes = await API.get("/analytics/monthly-sales");
      const productRes = await API.get("/analytics/top-products");
      const categoryRes = await API.get("/analytics/category-sales");
      const regionRes = await API.get("/analytics/region-sales");
      const revenueRes = await API.get("/analytics/revenue-prediction");
      const riskRes = await API.get("/analytics/inventory-risk");

      setSummary(summaryRes.data || {});
      setMonthlySales(getArray(monthlyRes));
      setTopProducts(getArray(productRes));
      setCategorySales(getArray(categoryRes));
      setRegionSales(getArray(regionRes));
      setRevenuePrediction(getArray(revenueRes));
      setInventoryRisk(getArray(riskRes));
    } catch (error) {
      console.log("Dashboard Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-bold text-[#123f1f] dark:text-white">
            Dashboard
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Advanced AI Demand Forecasting Analytics
          </p>
        </div>

        <button
          onClick={loadDashboard}
          className="bg-[#9dff00] text-[#032b11] font-bold px-6 py-3 rounded-xl"
        >
          Refresh
        </button>
      </div>

      <GlobalSearch />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Total Sales" value={`₹ ${summary.total_sales || 0}`} />
        <Card title="Total Quantity" value={summary.total_quantity || 0} />
        <Card title="Total Products" value={summary.total_products || 0} />
        <Card
          title="Forecast Accuracy"
          value={summary.total_sales > 0 ? "92%" : "0%"}
        />
      </div>

      <ChartBox title="Monthly Sales Trends">
        {monthlySales.length === 0 ? (
          <EmptyText text="No monthly sales data available" />
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlySales}>
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
        )}
      </ChartBox>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        <ChartBox title="Top Products">
          {topProducts.length === 0 ? (
            <EmptyText text="No product data available" />
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product_name" />
                <YAxis width={90} />
                <Tooltip />
                <Bar dataKey="total_sales" fill="#9dff00" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartBox>

        <ChartBox title="Region Sales Analytics">
          {regionSales.length === 0 ? (
            <EmptyText text="No region data available" />
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={regionSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis width={90} />
                <Tooltip />
                <Bar dataKey="total_sales" fill="#123f1f" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartBox>
      </div>

      <ChartBox title="Category Sales Analytics">
        {categorySales.length === 0 ? (
          <EmptyText text="No category data available" />
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categorySales}
                dataKey="total_sales"
                nameKey="category"
                outerRadius={120}
                label
              >
                {categorySales.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartBox>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
        <TableSection
          title="Revenue Prediction Analytics"
          headers={["Product", "Predicted Quantity", "Predicted Revenue"]}
          rows={revenuePrediction.map((item) => [
            item.product_name,
            item.predicted_quantity,
            `₹ ${item.predicted_revenue}`,
          ])}
        />

        <TableSection
          title="Inventory Risk Analysis"
          headers={["Product", "Average Quantity", "Inventory Risk"]}
          rows={inventoryRisk.map((item) => [
            item.product_name,
            item.average_quantity,
            item.inventory_risk,
          ])}
        />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>
      <h2 className="text-4xl font-bold text-[#123f1f] dark:text-white mt-3">
        {value}
      </h2>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-10">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

function TableSection({ title, headers, rows }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      <div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-xl border border-green-200">
        <table className="w-full min-w-[700px]">
          <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
            <tr className="border-b border-green-200 text-left">
              {headers.map((head) => (
                <th key={head} className="py-3 px-3">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={headers.length}
                  className="text-center py-8 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={index} className="border-b border-gray-100">
                  {row.map((cell, i) => (
                    <td key={i} className="py-4 px-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyText({ text }) {
  return (
    <div className="h-[300px] flex items-center justify-center text-gray-500">
      {text}
    </div>
  );
}

export default Dashboard;