import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

import ForecastChart from "../components/charts/ForecastChart";
import SalesTrendChart from "../components/charts/SalesTrendChart";
import TopProductsChart from "../components/charts/TopProductsChart";
import CategorySalesChart from "../components/charts/CategorySalesChart";
import RegionSalesChart from "../components/charts/RegionSalesChart";

function Forecast() {
  const [forecastData, setForecastData] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [regionSales, setRegionSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("auto");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const monthlyRes = await API.get("/analytics/monthly-sales");
      const productRes = await API.get("/analytics/top-products");
      const categoryRes = await API.get("/analytics/category-sales");
      const regionRes = await API.get("/analytics/region-sales");

      setMonthlySales(monthlyRes.data);
      setTopProducts(productRes.data);
      setCategorySales(categoryRes.data);
      setRegionSales(regionRes.data);
    } catch (error) {
      console.log("Forecast Analytics Error:", error.response?.data);
    }
  };

  const loadForecast = async () => {
    setLoading(true);

    try {
      const response = await API.get("/forecast/predict?days=7");

      setForecastData(response.data.forecast || []);
    } catch (error) {
      console.log("Forecast Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#123f1f]">
            AI Forecast Prediction
          </h1>

          <p className="text-gray-500 mt-2">
            Analyze future demand with forecasting and analytics insights
          </p>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border border-green-300 px-4 py-3 rounded-xl bg-white shadow-sm"
          >
            <option value="auto">Auto Select</option>
            <option value="linear">Linear Regression</option>
            <option value="random_forest">Random Forest</option>
          </select>

          <button
            onClick={loadForecast}
            className="bg-[#7ed900] hover:bg-[#6ac400] text-[#123f1f] font-bold px-6 py-3 rounded-xl shadow-md"
          >
            Refresh Forecast
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-green-200 p-6 mb-8">
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-xl font-semibold text-[#123f1f]">
              Loading Forecast...
            </div>
          </div>
        ) : (
          <ForecastChart data={forecastData} />
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-green-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] mb-6">
          Forecast Details
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-green-200 text-left">
              <th className="py-3">Product</th>
              <th className="py-3">Forecast Date</th>
              <th className="py-3">Predicted Quantity</th>
              <th className="py-3">Accuracy</th>
              <th className="py-3">Model</th>
            </tr>
          </thead>

          <tbody>
            {forecastData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No forecast data available
                </td>
              </tr>
            ) : (
              forecastData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4">{item.product_name}</td>
                  <td className="py-4">{item.forecast_date}</td>
                  <td className="py-4">{item.predicted_quantity}</td>
                  <td className="py-4">{item.accuracy}%</td>
                  <td className="py-4">{item.model_used}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <h2 className="text-3xl font-bold text-[#123f1f] mb-6">
        Forecast Analytics
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <SalesTrendChart data={monthlySales} />
        <TopProductsChart data={topProducts} />
        <CategorySalesChart data={categorySales} />
        <RegionSalesChart data={regionSales} />
      </div>
    </div>
  );
}

export default Forecast;