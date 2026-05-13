import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import StatCard from "../components/StatCard";
import SalesTrendChart from "../components/charts/SalesTrendChart";
import TopProductsChart from "../components/charts/TopProductsChart";

function Dashboard() {
  const [summary, setSummary] = useState({});
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const summaryRes = await API.get("/analytics/summary");
      const monthlyRes = await API.get("/analytics/monthly-sales");
      const productRes = await API.get("/analytics/top-products");

      setSummary(summaryRes.data);
      setMonthlySales(monthlyRes.data);
      setTopProducts(productRes.data);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#123f1f]">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Sales" value={`₹ ${summary.total_sales || 0}`} />
        <StatCard title="Total Quantity" value={summary.total_quantity || 0} />
        <StatCard title="Total Products" value={summary.total_products || 0} />
        <StatCard title="Forecast Accuracy" value={summary.forecast_accuracy || "92%"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesTrendChart data={monthlySales} />
        <TopProductsChart data={topProducts} />
      </div>
    </>
  );
}

export default Dashboard;