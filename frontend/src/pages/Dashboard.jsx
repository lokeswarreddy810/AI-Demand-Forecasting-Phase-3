import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

import StatCard from "../components/ui/StatCard";

import SalesTrendChart from "../components/charts/SalesTrendChart";
import TopProductsChart from "../components/charts/TopProductsChart";
import CategorySalesChart from "../components/charts/CategorySalesChart";
import RegionSalesChart from "../components/charts/RegionSalesChart";

function Dashboard() {

  const [summary, setSummary] = useState({});

  const [monthlySales, setMonthlySales] = useState([]);

  const [topProducts, setTopProducts] = useState([]);

  const [categorySales, setCategorySales] = useState([]);

  const [regionSales, setRegionSales] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    try {

      const summaryRes = await API.get(
        "/analytics/summary"
      );

      const monthlyRes = await API.get(
        "/analytics/monthly-sales"
      );

      const productRes = await API.get(
        "/analytics/top-products"
      );

      const categoryRes = await API.get(
        "/analytics/category-sales"
      );

      const regionRes = await API.get(
        "/analytics/region-sales"
      );

      setSummary(summaryRes.data);

      setMonthlySales(monthlyRes.data);

      setTopProducts(productRes.data);

      setCategorySales(categoryRes.data);

      setRegionSales(regionRes.data);

    } catch (error) {

      console.log(
        "Dashboard Error:",
        error.response?.data
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (

      <div className="text-2xl font-bold text-[#123f1f]">

        Loading Dashboard...

      </div>

    );
  }

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-[#123f1f]">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-3">
          Advanced AI Demand Forecast Analytics
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatCard
          title="Total Sales"
          value={`₹ ${summary.total_sales || 0}`}
          color="border-green-200 bg-white"
        />

        <StatCard
          title="Total Quantity"
          value={summary.total_quantity || 0}
          color="border-blue-200 bg-white"
        />

        <StatCard
          title="Products"
          value={summary.total_products || 0}
          color="border-yellow-200 bg-white"
        />

        <StatCard
          title="Forecast Accuracy"
          value={`${summary.forecast_accuracy || 0}%`}
          color="border-purple-200 bg-white"
        />

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <SalesTrendChart
          data={monthlySales}
        />

        <TopProductsChart
          data={topProducts}
        />

        <CategorySalesChart
          data={categorySales}
        />

        <RegionSalesChart
          data={regionSales}
        />

      </div>

    </div>

  );
}

export default Dashboard;